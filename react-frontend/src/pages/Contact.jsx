import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Contact.css";
import Pohlad1Image from "../assets/camera_placeholder1.png";
import Pohlad2Image from "../assets/camera_placeholder2.png";
import Pohlad3Image from "../assets/camera_placeholder3.png";

const cameraContent = {
    "Pohľad 1": Pohlad1Image,
    "Pohľad 2": Pohlad2Image,
    "Pohľad 3": Pohlad3Image,
};

const Contact = () => {
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
        <div className="Contact">
            <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onCameraClick={handleCameraClick} />
                <div className="content">
                    <h1>Technická Univerzita v Košiciach</h1>
                    <p><strong>Letná 1/9</strong></p>
                    <p><strong>042 00 Košice-Sever</strong></p>

                    {/* Google Map iframe */}
                    <div className="map-container">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2636.918909319901!2d21.238017715673623!3d48.734397579276116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ee0b2c6af80b5%3A0x2a6a12a30b114bf3!2sTechnick%C3%A1%20Univerzita%20v%20Ko%C5%A1iciach!5e0!3m2!1ssk!2ssk!4v1714567896543!5m2!1ssk!2ssk"
                            width="100%"
                            height="300"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <div className="contact-form">
                        <h2>Máte návrhy na zlepšenie alebo ste našli nejakú chybu?</h2>
                        <p>Neváhajte nás kontaktovať!</p>
                        <form>
                            <label htmlFor="email">E-Mail:</label>
                            <input type="email" id="email" placeholder="jankohrasko@example.com" />

                            <label htmlFor="text">Text:</label>
                            <textarea id="text" placeholder="..." rows="5"></textarea>

                            <div className="form-buttons">
                                <button type="button" className="upload-button">
                                    + Attach file
                                </button>
                                <button type="submit" className="submit-button">
                                    Send
                                </button>
                            </div>
                        </form>
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
};

export default Contact;