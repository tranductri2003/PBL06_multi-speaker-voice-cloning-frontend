import React, { useState } from "react";
import useTextToSpeech from "../../../hooks/useTextToSpeech";
import "./TextToSpeech.css";

const TextToSpeech = () => {
    const {
        audioFile,
        text,
        result,
        isLoading,
        handleFileChange,
        handleTextChange,
        handleSubmit,
    } = useTextToSpeech();

    const [language, setLanguage] = useState("en");

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="text-to-speech">
            <h1>Text to Speech</h1>
            <form onSubmit={(e) => handleSubmit(e, language)} className="upload-form">
                <div className="form-group">
                    <label htmlFor="audio-upload">Upload Audio (WAV, MP3, OGG):</label>
                    <input
                        type="file"
                        id="audio-upload"
                        accept=".wav,.mp3,.ogg"
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text-input">Enter Text:</label>
                    <textarea
                        id="text-input"
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Type your text here..."
                        rows="4"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="language-select">Select Language:</label>
                    <select id="language-select" value={language} onChange={handleLanguageChange}>
                        <option value="en">English</option>
                        <option value="vi">Vietnamese</option>
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
                        <h3>Output Audio</h3>
                        <audio controls src={`data:audio/wav;base64,${result.audio_base64}`} />
                    </div>
                    <div className="section">
                        <h3>Spectrogram</h3>
                        <img
                            src={`data:image/jpeg;base64,${result.spectrogram}`}
                            alt="Spectrogram"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextToSpeech;
