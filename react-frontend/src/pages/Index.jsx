import './Index.css';
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";


// Import images from assets
import Pohlad1Image from "../assets/camera_placeholder1.png";
import Pohlad2Image from "../assets/camera_placeholder2.png";
import Pohlad3Image from "../assets/camera_placeholder3.png";
import Camera2DImage from "../assets/camera-2D.png"; // Import the 2D image

// Mapping of camera names to the corresponding images
const cameraContent = {
    "Pohľad 1": Pohlad1Image,
    "Pohľad 2": Pohlad2Image,
    "Pohľad 3": Pohlad3Image,
};

function Index() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [isLive, setIsLive] = useState(false); // Default to Live
    const [showFrames, setShowFrames] = useState(false); // Default to Frames OFF
    const [freeSpaces, setFreeSpaces] = useState(30); // Number of free spaces (just an example)
    const [occupiedSpaces, setOccupiedSpaces] = useState(20); // Number of occupied spaces (just an example)

    useEffect(() => {
        let interval;
        console.log("selectedCamera:", selectedCamera);
        console.log("isLive:", isLive);
        if (selectedCamera && isLive) {
            const fetchCounts = () => {
                fetch("http://localhost:5000/api/latest_counts")
                    .then((response) => response.json())
                    .then((data) => {
                        setFreeSpaces(data.free_spaces || 0);
                        setOccupiedSpaces(data.car_count || 0);
                    })
                    .catch((error) => console.error("Error fetching vehicle counts:", error));
            };
            fetchCounts();
            interval = setInterval(fetchCounts, 1000);

        }
        return () => {
            clearInterval(interval)
        };
    }, [selectedCamera, isLive]);  // Spustí sa pri výbere kamery alebo prepnutí do live

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCameraClick = (cameraName) => {
        setSelectedCamera(cameraName);
    };

    const toggleLiveMode = () => {
        setIsLive(prevState => !prevState);
    };

    const toggleFrames = () => {
        setShowFrames(prevState => !prevState);
    };

    const navigate = () => {
        alert("Redirecting to Google Maps...");
    };

    return (
        <div className="Index">
            <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
                {/* Sidebar Component */}
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    onCameraClick={handleCameraClick}
                />

                {/* Main Content */}
                <div className="content">
                    {selectedCamera ? (
                        <div className="camera-content">
                            <div className="camera-details">
                                <h2>{selectedCamera}</h2>
                                <div className="camera-image">
                                    {/* Display the image based on the isLive state */}
                                    {isLive ? (
                                        <img
                                            src="http://localhost:5000/video_feed"
                                            alt="Live Feed"
                                            className="camera-pohlad"
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    ) : (
                                        <img
                                            src={Camera2DImage}
                                            alt={selectedCamera}
                                            className="camera-pohlad"
                                        />
                                    )}

                                </div>
                            </div>

                            <div className="camera-controls">
                                {/* Live / 2D toggle */}
                                <div className="toggle-container">
                                    <span>2D</span>
                                    <label className="switch">
                                        <input type="checkbox" checked={isLive} onChange={toggleLiveMode} />
                                        <span className="slider round"></span>
                                    </label>
                                    <span>Live</span>
                                </div>

                                {/* Free and Occupied Spaces */}
                                <div className="spaces-info">
                                    <div className="space-count">
                                        <span style={{ color: "green" }}>Free: {freeSpaces}</span>
                                        <span style={{ color: "red" }}>Occupied: {occupiedSpaces}</span>
                                    </div>
                                </div>

                                {/* Frames Toggle */}
                                <div className="toggle-container">
                                    <span>Show Frames</span>
                                    <label className="switch">
                                        <input type="checkbox" checked={showFrames} onChange={toggleFrames} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                {/* Navigate Button */}
                                <button className="navigate-button" onClick={navigate}>Navigate</button>
                            </div>
                        </div>
                    ) : (
                        <h1>Welcome to TUKE parking!</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Index;