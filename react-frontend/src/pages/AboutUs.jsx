import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import './AboutUs.css';
import Jakub from "../assets/jakub.jpg";
import Pohlad1Image from "../assets/camera_placeholder1.png";
import Pohlad2Image from "../assets/camera_placeholder2.png";
import Pohlad3Image from "../assets/camera_placeholder3.png";

const cameraContent = {
    "Pohľad 1": Pohlad1Image,
    "Pohľad 2": Pohlad2Image,
    "Pohľad 3": Pohlad3Image,
};

function AboutUs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCameraClick = (cameraName) => {
        setSelectedCamera(cameraName);
        navigate("/");
    };

    return (
        <div className="AboutUs">
            <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    onCameraClick={handleCameraClick}
                />
                <div className="content">
                    <div className="about-text">
                        <h3>Sme skupinka študentov, ktorá chce Technickej Univerzite v Košiciach
                            pomôcť aj takýmto spôsobom, že sa postaráme o monitorovanie parkovísk,
                            aby sme zabránili meškaniu študentov na rôzne
                            cvičenia či prednášky.</h3>
                    </div>
                    <div className="about-image">
                        <img src={Jakub} alt="Jakub" style={{ width: "100%", maxWidth: "300px" }} />
                    </div>
                    {selectedCamera ? (
                        <div>
                            <h2>{selectedCamera}</h2>
                            <img
                                src={cameraContent[selectedCamera]}
                                alt={selectedCamera}
                                style={{ width: "100%", maxWidth: "600px" }}
                            />
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AboutUs;