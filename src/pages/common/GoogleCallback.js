// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const GoogleCallback = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const code = params.get("code");
//     const state = params.get("state");

//     const handleGoogleLogin = async () => {
//       if (code && state) {
//         try {
//           const response = await fetch(
//             `http://localhost:8080/auth/google/callback?code=${code}&state=${state}`,
//             {
//               method: "GET",
//               headers: { "Content-Type": "application/json" },
//               credentials: "include",
//             }
//           );

//           if (!response.ok) {
//             throw new Error(`서버 응답 에러: ${response.status} ${response.statusText}`);
//           }

//           // 응답이 JSON인지 확인
//           const contentType = response.headers.get("content-type");
//           if (contentType && contentType.includes("application/json")) {
//             const data = await response.json();
//             console.log("백엔드로부터 받은 데이터:", data);

//             if (data.token) {
//               localStorage.setItem("jwtToken", data.token);
//               alert("로그인 성공!");
//               navigate("/");  // 로그인 성공 후 홈으로 리디렉션
//             } else {
//               console.error("토큰이 응답에 없습니다.");
//               alert("로그인에 실패했습니다. 다시 시도해주세요.");
//             }
//           } else {
//             throw new Error("서버에서 JSON 형식이 아닌 응답을 반환했습니다.");
//           }
//         } catch (error) {
//           console.error("백엔드 요청 중 오류 발생:", error.message);
//           alert("로그인 요청 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         alert("OAuth 요청에 필요한 코드 또는 상태값이 누락되었습니다.");
//         setLoading(false);
//       }
//     };

//     handleGoogleLogin();
//   }, [location, navigate]);

//   return (
//     <div>
//       {loading ? <p>구글 로그인 처리 중입니다...</p> : <p>로그인이 완료되었습니다.</p>}
//     </div>
//   );
// };

// export default GoogleCallback;
