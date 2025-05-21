
from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import pickle
import pandas as pd
from ultralytics import YOLO
import cvzone
import json
import os
import time

app = Flask(__name__)
CORS(app)

# Načítanie označených miest ##############################################
with open("doma_spots", "rb") as f:
    data = pickle.load(f)
    polylines, area_names = data['polylines'], data['area_names']
###########################################################################
# Načítanie tried
with open("coco.txt", "r") as f:
    class_list = f.read().split("\n")

json_file = "vehicle_counts.json"

if os.path.exists(json_file):
    try:
        with open(json_file, "r") as f:
            content = f.read().strip()
            data_log = json.loads(content) if content else []
    except json.JSONDecodeError:
        data_log = []
else:
    data_log = []

last_save_time = time.time()
save_interval = 5

# YOLO model
model = YOLO('yolov8s.pt',verbose=False)

# Stream z IP kamery (zmeniť podľa siete) #################################
stream_url = 'http://192.168.68.100:8080/video'
###########################################################################
cap = cv2.VideoCapture(stream_url)

def generate_frames():
    spot_memory = {i: 0 for i in range(len(polylines))}
    MEMORY_FRAMES = 3

    count = 0
    while True:
        success, frame = cap.read()
        if not success:
            continue

        frame = cv2.resize(frame, (1280, 720))
        frame_copy = frame.copy()


        if count % 3 == 0:
            results = model.predict(frame_copy, verbose=False)
            detections = pd.DataFrame(results[0].boxes.data).astype("float")

            car_centers = []
            for _, row in detections.iterrows():
                x1, y1, x2, y2 = int(row[0]), int(row[1]), int(row[2]), int(row[3])
                cls = int(row[5])
                class_name = class_list[cls]

                if "car" in class_name:
                    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                    car_centers.append((cx, cy))
        else:
            car_centers = []

        occupied = set()

        for i, polyline in enumerate(polylines):
            detected = False
            for cx, cy in car_centers:
                cv2.pointPolygonTest(polyline, (cx, cy), False)
                if cv2.pointPolygonTest(polyline, (cx, cy), False) >= 0:
                    detected = True
                    break

            if detected:
                spot_memory[i] = MEMORY_FRAMES
            else:
                spot_memory[i] = max(0, spot_memory[i] - 1)

            # Zobrazuj červený štvorec, ak ešte stále je v pamäti
            if spot_memory[i] > 0:

                cv2.polylines(frame, [polyline], True, (0, 0, 255), 2)
                occupied.add(i)
            else:
                cv2.polylines(frame, [polyline], True, (0, 255, 0), 2)

            cvzone.putTextRect(frame, f"{area_names[i]}", tuple(polyline[0]), 1, 1)

        total_spots = len(polylines)
        car_count = len(occupied)
        free_space = total_spots - car_count

        current_time = time.time()
        global last_save_time
        if current_time - last_save_time >= save_interval:
            timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

            log_entry = {
                "timestamp": timestamp,
                "car_count": car_count,
                "free_spaces": free_space
            }

            data_log.append(log_entry)

            # Zápis do súboru
            with open(json_file, "w") as f:
                json.dump(data_log, f, indent=4)

            last_save_time = current_time

        # cvzone.putTextRect(frame, f'CAR COUNTER: {car_count}', (50, 60), 2, 2)
        # cvzone.putTextRect(frame, f'FREE SPACES: {free_space}', (50, 100), 2, 2)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

        count += 1


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/latest_counts', methods=['GET'])
def get_latest_counts():
    try:
        with open("vehicle_counts.json", "r") as f:
            data = json.load(f)
            if data:
                latest = data[-1]  # posledný záznam
                return jsonify(latest)
            else:
                return jsonify({"car_count": 0, "free_spaces": 0})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
