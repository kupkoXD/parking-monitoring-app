import React, { useState } from "react";
import "./Sidebar.css";

// Hardcoded parking lots with cameras
const parkingLots = [
    { name: "Hlavné parkovisko", cameras: ["Pohľad 1", "Pohľad 2", "Pohľad 3"] },
    { name: "PK6 parkovisko", cameras: ["Pohľad 1", "Pohľad 2"] },
    { name: "Štud. parkovisko", cameras: ["Pohľad 1", "Pohľad 2"] },
    { name: "Siemens parkovisko", cameras: ["Pohľad 1", "Pohľad 2"] }
];

const Sidebar = ({ isSidebarOpen, toggleSidebar, onCameraClick }) => {
    return (
        <div className={`Sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isSidebarOpen ? "Collapse" : "Expand"}
            </button>
            {parkingLots.map((lot, index) => (
                <ParkingLot key={index} lot={lot} onCameraClick={onCameraClick} isSidebarOpen={isSidebarOpen} />
            ))}
        </div>
    );
};

const ParkingLot = ({ lot, onCameraClick, isSidebarOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="ParkingLot">
            <div className="ParkingLotHeader" onClick={handleToggle}>
                <h3 className="text">{lot.name}</h3>
                <span className={`arrow ${isOpen ? "open" : ""}`}>&#8595;</span>
            </div>
            {isOpen && (
                <ul className="CameraList">
                    {lot.cameras.map((camera, index) => (
                        <li key={index} onClick={() => onCameraClick(camera)} className="text">
                            {camera}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Sidebar;