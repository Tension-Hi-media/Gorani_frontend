import { request, withoutTokenRequest, fastAPIrequest } from "./index";

// ✨✨api 요청 함수 만드는 예시!✨✨
export async function getTranslationResult(
  text,
  sourceLang = "en",
  targetLang = "ko"
) {
  try {
    const response = await withoutTokenRequest("POST", `/api/v1/translation`, {
      text,
      sourceLang,
      targetLang,
    });
    return response.data.translated_text;
  } catch (error) {
    console.error("Translation API Error:", error);
    throw error;
  }
}

// 용어집 생성 API 호출 함수
export async function createGlossary(glossary) {
  try {
    const response = await withoutTokenRequest(
      "POST",
      `/api/v1/translation/glossary`,
      glossary
    );
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
    const response = await withoutTokenRequest(
      "GET",
      `/api/v1/translation/glossary?userId=${userId}`
    );

    // `_id`를 `id`로 변환
    const glossaries = response.data.map((glossary) => ({
      ...glossary,
      id: glossary._id, // `_id`를 `id`로 복사
    }));

    return glossaries;
  } catch (error) {
    console.error("Failed to fetch glossaries:", error);
    throw error;
  }
}

export async function updateGlossary(id, glossary) {
  try {
    const response = await withoutTokenRequest(
      "PUT",
      `/api/v1/translation/glossary/${id}`,
      glossary
    );
    return response.data; // Axios로 응답 데이터 반환
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("API 에러 응답:", error.response.data);
    } else {
      console.error("네트워크 또는 기타 에러:", error.message);
    }
    throw error;
  }
}

// 용어집 삭제 API 호출 함수
export async function deleteGlossary(id) {
  try {
    const response = await withoutTokenRequest(
      "DELETE",
      `/api/v1/translation/glossary/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("용어집 삭제 실패:", error);
    throw error;
  }
}

// 단어쌍 추가 API 호출 함수
export async function addWordPair(glossaryId, wordPair) {
  try {
    const response = await withoutTokenRequest(
      "POST",
      `/api/v1/translation/glossary/${glossaryId}/word-pair`,
      wordPair
    );

    console.log("Server response:", response.data); // 서버 응답 확인
    return response.data; // `id`가 포함된 데이터 반환
  } catch (error) {
    console.error("단어쌍 추가 실패:", error);
    throw error;
  }
}

export const deleteWordPair = async (glossaryId, index) => {
  try {
    const response = await withoutTokenRequest(
      "DELETE",
      `/api/v1/translation/glossary/${glossaryId}/word-pair/${index}`
    );
    return response.data;
  } catch (error) {
    console.error("단어쌍 삭제 실패:", error);
    throw error;
  }
};

// 단어쌍 수정 API 호출 함수
export async function updateWordPair(glossaryId, wordPairId, updatedWordPair) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await request(
      "PUT",
      `/api/v1/translation/glossary/${glossaryId}/word-pair/${wordPairId}`,
      updatedWordPair,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰 포함
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error - Update Word Pair:", error);
    throw error;
  }
}
