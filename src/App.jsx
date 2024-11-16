import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import VoiceEnhancement from "./components/pages/voice-enhancement/VoiceEnhancement";

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/voice-enhancement" element={<VoiceEnhancement />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
