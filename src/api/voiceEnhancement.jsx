import { API_BASE_URL } from "../configs/constants";

export const enhanceVoice = async (audioFile) => {
    const formData = new FormData();
    formData.append("file", audioFile);

    const response = await fetch(`${API_BASE_URL}/enhance-voice`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Voice enhancement failed");
    }

    return response.json();
};
