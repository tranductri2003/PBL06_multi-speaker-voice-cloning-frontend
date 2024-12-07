import { useState } from "react";
import { compareSpeakers } from "../api/speakerVerification";

const useSpeakerVerification = () => {
    const [firstAudio, setFirstAudio] = useState(null);
    const [secondAudio, setSecondAudio] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modelType, setModelType] = useState("lstm");

    const handleFirstAudioChange = (e) => {
        setFirstAudio(e.target.files[0]);
    };

    const handleSecondAudioChange = (e) => {
        setSecondAudio(e.target.files[0]);
    };

    const handleModelChange = (e) => {
        setModelType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstAudio || !secondAudio) {
            alert("Please upload both audio files.");
            return;
        }

        const formData = new FormData();
        formData.append("first_audio", firstAudio);
        formData.append("second_audio", secondAudio);

        try {
            setIsLoading(true);
            const data = await compareSpeakers(formData, modelType);
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        firstAudio,
        secondAudio,
        result,
        isLoading,
        modelType,
        handleFirstAudioChange,
        handleSecondAudioChange,
        handleModelChange,
        handleSubmit,
    };
};

export default useSpeakerVerification; 