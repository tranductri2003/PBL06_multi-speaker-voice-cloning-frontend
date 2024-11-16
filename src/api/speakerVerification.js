import { API_BASE_URL } from "../configs/constants";

export const verifySpeaker = async (audioFile) => {
    const formData = new FormData();
    formData.append("file", audioFile);

    const response = await fetch(`${API_BASE_URL}/verify-speaker`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Speaker verification failed");
    }

    return response.json();
};
