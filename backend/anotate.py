import cv2
import numpy as np
import cvzone
import pickle


# cap = cv2.VideoCapture('video_test.mp4')
cap = cv2.imread('snimka_doma.png')
cap = cv2.resize(cap, (1280, 720))

drawing = False
area_names = []
try:
    with open("doma_spots", "rb") as f:
        data = pickle.load(f)
        polylines,area_names = data['polylines'],data['area_names']
except:
    polylines = []

points = []
current_name = " "

def draw_polygon(event, x, y, flags, param):
    global points,drawing
    drawing = True
    if event == cv2.EVENT_LBUTTONDOWN:
        points = [(x,y)]
    elif event == cv2.EVENT_RBUTTONDOWN:
        if drawing:
            points.append((x, y))
            print(f"Point added: {(x, y)}")
    # elif event == cv2.EVENT_MOUSEMOVE:
    #     if drawing:
    #         points.append((x,y))
    elif event == cv2.EVENT_LBUTTONUP:
        drawing = False
        if len(points) >= 3:
            points.append(points[0])
            current_name = input("Enter name of the parking area: ")
            if current_name:
                area_names.append(current_name)
            polylines.append(np.array(points, np.int32))
        else:
            print("You need at least 3 points to form a polygon.")

while True:
    # ret, frame = cap.read()
    # if not ret:
    #     cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    #     continue
    # frame = cv2.resize(frame, (1280, 720))

    frame = cap.copy()

    for i, polyline in enumerate (polylines):
        cv2.polylines(frame, [polyline], True, (0, 0, 255), 2)
        cvzone.putTextRect(frame,f'{area_names[i]}', tuple(polyline[0]), 1, 1,)

    cv2.imshow('VIDEO', frame)
    cv2.setMouseCallback('VIDEO', draw_polygon)
    Key = cv2.waitKey(20) & 0xFF
    if Key == ord('s'):
        with open("doma_spots","wb") as f:
            data = {'polylines': polylines, 'area_names': area_names}
            pickle.dump(data, f)
            print("Saved.")

    elif Key == ord('q'):
        break

# cap.release()
cv2.destroyAllWindows()