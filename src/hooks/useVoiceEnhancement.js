import { useState } from "react";
import { fetchVoiceEnhancement } from "../api/voiceEnhancement";
import { VOICE_ENHANCEMENT_DEFAULT_MODEL } from "../configs/constant";

const useVoiceEnhancement = () => {
    const [rawAudio, setRawAudio] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modelName, setModelName] = useState(VOICE_ENHANCEMENT_DEFAULT_MODEL);

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

        const formData = new FormData();
        formData.append("audio", rawAudio);

        try {
            setIsLoading(true);
            const data = await fetchVoiceEnhancement(formData, modelName);
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        rawAudio,
        result,
        isLoading,
        modelName,
        handleFileChange,
        handleModelChange,
        handleSubmit,
    };
};

export default useVoiceEnhancement;
