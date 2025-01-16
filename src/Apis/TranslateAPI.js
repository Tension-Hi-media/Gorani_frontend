import { request, withoutTokenRequest, fastAPIrequest } from "./index";

// ✨✨api 요청 함수 만드는 예시!✨✨
export async function getTranslationResult(text, sourceLang = "en", targetLang = "ko") {
    try {
        const response = await withoutTokenRequest('POST',`/api/v1/translation`, {
            text,
            sourceLang,
            targetLang,
        });
        return response.data.translated_text;
    } catch (error) {
        console.error("Translation API Error:", error);
        throw error;
    }
// };sdasd