import React, { useState } from "react";
import "./VoiceEnhancement.css";

const VoiceEnhancement = () => {
    const [rawAudio, setRawAudio] = useState(null);
    const [modelName, setModelName] = useState("default_model");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setRawAudio(e.target.files[0]);
    };

    const handleModelChange = (e) => {
        setModelName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rawAudio) {
            alert("Please upload an audio file.");
            return;
        }

        const fakeData = {
            spectrogram_voice_noise: "https://via.placeholder.com/300x150.png?text=Spectrogram+Voice+Noise",
            audio_voice_noise: "https://via.placeholder.com/300x150.png?text=Audio+Voice+Noise",
            spectrogram_true_voice: "https://via.placeholder.com/300x150.png?text=Spectrogram+True+Voice",
            audio_true_voice: "https://via.placeholder.com/300x150.png?text=Audio+True+Voice",
            denoised_audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // File audio giả lập
        };

        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setResult(fakeData);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to process audio.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="voice-enhancement">
            <h1>Voice Enhancement</h1>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <label htmlFor="audio-upload">Upload Audio:</label>
                    <input
                        type="file"
                        id="audio-upload"
                        accept="audio/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="model-select">Select Model:</label>
                    <select id="model-select" value={modelName} onChange={handleModelChange}>
                        <option value="default_model">Default Model</option>
                        <option value="model_1">Model 1</option>
                        <option value="model_2">Model 2</option>
                        <option value="model_3">Model 3</option>
                    </select>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Submit"}
                </button>
            </form>

            {result && (
                <div className="results">
                    <h2>Results</h2>
                    <div className="section">
                        <h3>Input Audio</h3>
                        <audio controls src={URL.createObjectURL(rawAudio)} />
                        <img src={result.spectrogram_voice_noise} alt="Spectrogram Voice + Noise" />
                        <img src={result.audio_voice_noise} alt="Audio Voice + Noise" />
                    </div>
                    <div className="section">
                        <h3>Denoised Audio</h3>
                        <audio controls src={result.denoised_audio} />
                        <img src={result.spectrogram_true_voice} alt="Spectrogram True Voice" />
                        <img src={result.audio_true_voice} alt="Audio True Voice" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceEnhancement;
