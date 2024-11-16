import React from "react";
import useVoiceEnhancement from "../../../hooks/useVoiceEnhancement";
import { models } from "../../../api/voiceEnhancement";
import "./VoiceEnhancement.css";

const VoiceEnhancement = () => {
    const {
        rawAudio,
        result,
        isLoading,
        modelName,
        handleFileChange,
        handleModelChange,
        handleSubmit,
    } = useVoiceEnhancement();

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
                        {models.map((model) => (
                            <option key={model.value} value={model.value}>
                                {model.displayName}
                            </option>
                        ))}
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
                        <audio controls src={rawAudio ? URL.createObjectURL(rawAudio) : ""} />
                        <img
                            src={`data:image/jpeg;base64,${result.spectrogram_voice_noise}`}
                            alt="Spectrogram Voice + Noise"
                        />
                        <img
                            src={`data:image/png;base64,${result.wave_voice_noise}`}
                            alt="Waveform Voice + Noise"
                        />
                    </div>
                    <div className="section">
                        <h3>Predicted Noise</h3>
                        <img
                            src={`data:image/jpeg;base64,${result.spectrogram_predicted_noise}`}
                            alt="Spectrogram Predicted Noise"
                        />
                        <img
                            src={`data:image/png;base64,${result.wave_predicted_noise}`}
                            alt="Waveform Predicted Noise"
                        />
                    </div>
                    <div className="section">
                        <h3>Predicted Voice</h3>
                        <audio controls src={`data:audio/wav;base64,${result.audio_base64}`} />
                        <img
                            src={`data:image/jpeg;base64,${result.spectrogram_predicted_voice}`}
                            alt="Spectrogram Predicted Voice"
                        />
                        <img
                            src={`data:image/png;base64,${result.wave_predicted_voice}`}
                            alt="Waveform Predicted Voice"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceEnhancement;