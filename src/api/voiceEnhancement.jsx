export const API_ENDPOINT = "http://192.168.88.136:8000/api/speech_enhancement/denoise";

export const models = [
    { displayName: "Unet", value: "unet" },
    { displayName: "Unet Plus Plus", value: "Unet_plusplus" },
    { displayName: "Modified Unet", value: "modified_unet" },
];

export const fetchVoiceEnhancement = async (formData, modelName) => {
    const response = await fetch(`${API_ENDPOINT}?model_name=${modelName}`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to process audio.");
    }

    return response.json();
};
