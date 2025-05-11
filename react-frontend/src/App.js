import './App.css';
import React, { useState } from "react";
import Index from "./pages/Index.jsx";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

function App() {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    //
    // const toggleSidebar = () => {
    //     setIsSidebarOpen(!isSidebarOpen);
    // };

    return (
        <div className="App">
            <Menu />
            {/*<div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>*/}
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
            {/*</div>*/}
            <Footer />
        </div>
    );
}

export default App;