import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/User/myPageModal.css";

const MyPageModal = ({ company, onClose }) => {
  // ✅ `localStorage`에서 사용자 정보 가져오기
  const parsedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const userId = parsedUserInfo?.id; // ✅ userId 가져오기
  const companyId = parsedUserInfo?.company?.companyId; // ✅ companyId 가져오기

  // ✅ 기존 회사 정보가 있으면 불러오기, 없으면 빈 값으로 초기화
  const [form, setForm] = useState({
    name: company?.name || "",
    registrationNumber: company?.registrationNumber || "",
    representativeName: company?.representativeName || "",
  });

  // ✅ 기업 정보 불러오기 (기존 데이터가 있을 경우)
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !companyId) return;

        const headers = { Authorization: `Bearer ${token}` };
        console.log("📢 기업 정보 조회 요청:", companyId);

        const response = await axios.get(`http://localhost:8080/api/v1/company/${companyId}`, { headers });

        if (response.status === 200 && response.data) {
          setForm({
            name: response.data.name || "",
            registrationNumber: response.data.registrationNumber || "",
            representativeName: response.data.representativeName || "",
          });
        }
      } catch (error) {
        console.error("❌ 기업 정보 불러오기 오류:", error);
      }
    };

    fetchCompanyInfo();
  }, [companyId]);

  // ✅ 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // ✅ 기업 정보 저장 (신규 기업 등록 & users 테이블 업데이트)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

      if (!form.name || !form.registrationNumber || !form.representativeName) {
        alert("모든 필드를 입력해야 합니다.");
        return;
      }

      // ✅ 새로운 기업 생성
      const companyResponse = await axios.post("http://localhost:8080/api/v1/company", form, { headers });
      const newCompanyId = companyResponse.data.companyId;

      console.log("✅ 기업 정보 저장 완료:", companyResponse.data);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("사용자 정보를 찾을 수 없습니다.");
        return;
      }

      // ✅ 사용자 테이블에 companyId 업데이트
      const updateCompanyResponse = await axios.post(
        "http://localhost:8080/api/v1/user/updateCompany",
        { userId: userInfo.id, companyId: newCompanyId },
        { headers }
      );

      console.log("✅ 사용자 company_id 업데이트 완료:", updateCompanyResponse.data);

      // ✅ `localStorage` 업데이트
      const updatedUserInfo = {
        ...userInfo,
        company: {
          companyId: newCompanyId,
          name: form.name,
          registrationNumber: form.registrationNumber,
          representativeName: form.representativeName,
        }
      };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

      alert("기업 정보가 저장되었습니다.");
      onClose(updatedUserInfo.company);
    } catch (error) {
      console.error("❌ 기업 정보 저장 또는 사용자 업데이트 중 오류 발생:", error);
      alert("기업 정보 저장 중 오류가 발생했습니다.");
    }
  };

  // ✅ 모달 닫기
  const handleCancel = () => {
    onClose(null);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>기업 정보 입력</h2>
        <div className="form-group">
          <label>기업명</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>사업자 등록번호</label>
          <input
            type="text"
            name="registrationNumber"
            value={form.registrationNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>대표자명</label>
          <input
            type="text"
            name="representativeName"
            value={form.representativeName}
            onChange={handleChange}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleSave} className="save-button">저장</button>
          <button onClick={handleCancel} className="cancel-button">취소</button>
        </div>
      </div>
    </div>
  );
};

export default MyPageModal;
