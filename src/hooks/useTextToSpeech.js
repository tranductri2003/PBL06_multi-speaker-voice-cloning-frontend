import { useState } from "react";
import { generateSpeech } from "../api/textToSpeech";

const useTextToSpeech = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["audio/wav", "audio/mp3", "audio/ogg"];
            if (!allowedTypes.includes(file.type)) {
                alert(`Please select a valid audio file (WAV, MP3, or OGG).`);
                e.target.value = "";
                return;
            }
            setAudioFile(file);
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!audioFile && !text) {
            alert("Please upload an audio file or enter some text.");
            return;
        }

        const formData = new FormData();
        if (audioFile) formData.append("audio", audioFile);
        if (text) formData.append("text", text);

        try {
            setIsLoading(true);
            const data = await generateSpeech(formData);
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to process the request. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        audioFile,
        text,
        result,
        isLoading,
        handleFileChange,
        handleTextChange,
        handleSubmit,
    };
};

export default useTextToSpeech;
