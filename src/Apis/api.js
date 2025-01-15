import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const translateText = async (text, sourceLang = "en", targetLang = "ko") => {
    try {
        const response = await axios.post(`${BASE_URL}/translate`, {
            text,
            sourceLang,
            targetLang,
        });
        return response.data.translated_text;
    } catch (error) {
        console.error("Translation API Error:", error);
        throw error;
    }
};
