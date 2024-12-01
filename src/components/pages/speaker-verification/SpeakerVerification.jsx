import React from "react";
import useSpeakerVerification from "../../../hooks/useSpeakerVerification";
import { models } from "../../../api/speakerVerification";
import "./SpeakerVerification.css";

const SpeakerVerification = () => {
    const {
        firstAudio,
        secondAudio,
        result,
        isLoading,
        modelType,
        handleFirstAudioChange,
        handleSecondAudioChange,
        handleModelChange,
        handleSubmit,
    } = useSpeakerVerification();

    return (
        <div className="speaker-verification">
            <h1>Speaker Verification</h1>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <label htmlFor="first-audio">First Speaker Audio:</label>
                    <input
                        type="file"
                        id="first-audio"
                        accept="audio/*"
                        onChange={handleFirstAudioChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="second-audio">Second Speaker Audio:</label>
                    <input
                        type="file"
                        id="second-audio"
                        accept="audio/*"
                        onChange={handleSecondAudioChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="model-select">Select Model:</label>
                    <select 
                        id="model-select" 
                        value={modelType} 
                        onChange={handleModelChange}
                    >
                        {models.map((model) => (
                            <option key={model.value} value={model.value}>
                                {model.displayName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Compare Speakers"}
                </button>
            </form>

            {result && (
                <div className="results">
                    <h2>Results</h2>
                    <div className="similarity-score">
                        <h3>Similarity Score: {(result.similarity_score * 100).toFixed(2)}%</h3>
                        <p>Processing Time: {result.duration.toFixed(2)}s</p>
                        <p>Model Used: {result.model_type}</p>
                    </div>
                    <div className="audio-comparison">
                        <div className="audio-section">
                            <h3>First Speaker</h3>
                            <div className="audio-player">
                                <p>Original Audio:</p>
                                <audio 
                                    controls 
                                    src={firstAudio ? URL.createObjectURL(firstAudio) : ""} 
                                />
                            </div>
                            <div className="audio-player">
                                <p>Audio after silence removal:</p>
                                <audio 
                                    controls 
                                    src={`data:audio/wav;base64,${result.first_clean_audio}`} 
                                />
                            </div>
                            <div className="spectrogram">
                                <p>Mel Spectrogram:</p>
                                <img 
                                    src={`data:image/png;base64,${result.first_mel_spectrogram}`}
                                    alt="First Speaker Mel Spectrogram"
                                />
                            </div>
                        </div>
                        <div className="audio-section">
                            <h3>Second Speaker</h3>
                            <div className="audio-player">
                                <p>Original Audio:</p>
                                <audio 
                                    controls 
                                    src={secondAudio ? URL.createObjectURL(secondAudio) : ""} 
                                />
                            </div>
                            <div className="audio-player">
                                <p>Audio after silence removal:</p>
                                <audio 
                                    controls 
                                    src={`data:audio/wav;base64,${result.second_clean_audio}`} 
                                />
                            </div>
                            <div className="spectrogram">
                                <p>Mel Spectrogram:</p>
                                <img 
                                    src={`data:image/png;base64,${result.second_mel_spectrogram}`}
                                    alt="Second Speaker Mel Spectrogram"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpeakerVerification; 