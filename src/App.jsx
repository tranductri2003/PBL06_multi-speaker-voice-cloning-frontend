import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import VoiceEnhancement from "./components/pages/voice-enhancement/VoiceEnhancement";

const VoiceCloningPage = () => <div>Voice Cloning Full Flow</div>;
const SpeakerVerificationPage = () => <div>Speaker Verification Page</div>;
const TextToSpeechPage = () => <div>Text-to-Speech Page</div>;
const VoiceEnhancementPage = () => <div>Voice Enhancement Page</div>;

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<VoiceCloningPage />} />
                    <Route path="/speaker-verification" element={<SpeakerVerificationPage />} />
                    <Route path="/text-to-speech" element={<TextToSpeechPage />} />
                    <Route path="/voice-enhancement" element={<VoiceEnhancement />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
