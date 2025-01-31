import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const KakaoCallback = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // URL에서 인증 코드 확인
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        console.log("URL에서 가져온 code:", code);  // 코드가 잘 나오나 확인

        if (code) {
            fetch(`http://3.38.113.109:8080/auth/kakao/callback?code=${code}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then(response => {
                    console.log("가긴함?")
                    if (!response.ok) {
                        throw new Error("서버 응답에 실패했습니다.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("백엔드로부터 받은 데이터:", data);
                    if (data.token) {
                        localStorage.setItem("jwtToken", data.token);
                        alert("로그인 성공!");
                        window.location.href = "/";
                    } else {
                        console.error("토큰을 받지 못했습니다.");
                        alert("로그인에 실패했습니다.");
                    }
                })
                .catch(err => {
                    console.error("백엔드 요청 실패:", err);
                    alert("네트워크 오류가 발생했습니다.");
                })
                .finally(() => setLoading(false));
        } else {
            alert("코드 또는 상태값이 없습니다.");
            setLoading(false);
        }
    }, [location]);
    // URL에 code 파라미터가 있으면 로그인 처리 중 화면을 보여줌

    return (
        <div>
            {loading ? <p>카카오 로그인 처리 중...</p> : <p>로그인이 완료되었습니다.</p>}
        </div>
    );
}

export default KakaoCallback;