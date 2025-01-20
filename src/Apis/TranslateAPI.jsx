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
};

// 용어집 생성 API 호출 함수
export async function createGlossary(glossary) {
    try {
        const response = await withoutTokenRequest("POST", `/api/v1/translation/glossary`, glossary);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("API 에러 응답:", error.response.data);
        } else {
            console.error("네트워크 또는 기타 에러:", error.message);
        }
        throw error;
    }
}

export async function fetchAllGlossaries(userId) {
    try {
      // 쿼리 파라미터로 userId를 전송. 예) /api/v1/translation/glossary?userId=1
      const response = await withoutTokenRequest(
        "GET",
        `/api/v1/translation/glossary?userId=${userId}`
      );
      // response 자체가 axios 응답 객체이므로, 최종 데이터는 response.data
      return response.data;
    } catch (error) {
      console.error("Failed to fetch glossaries:", error);
      throw error;
    }
  }