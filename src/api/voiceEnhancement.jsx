import { VOICE_ENHANCEMENT_API } from '../configs/endpoints';

export const models = [
    { displayName: "Unet", value: "unet" },
    { displayName: "Unet Plus Plus", value: "Unet_plusplus" },
    { displayName: "Modified Unet", value: "modified_unet" },
];

export const fetchVoiceEnhancement = async (formData, modelName) => {
    formData.append("model_name", modelName);

    const response = await fetch(VOICE_ENHANCEMENT_API.DENOISE, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process audio.");
    }

    return response.json();
};
