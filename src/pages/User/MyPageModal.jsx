import React, { useState } from "react";
import "../../assets/css/User/myPageModal.css";

const MyPageModal = ({ company, onClose }) => {
  const [form, setForm] = useState({
    name: company?.name || "",
    registrationNumber: company?.registrationNumber || "",
    representativeName: company?.representativeName || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onClose(form); // 변경된 기업 정보를 부모 컴포넌트로 전달
  };

  const handleCancel = () => {
    onClose(null); // 변경 없이 닫기
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
          <button onClick={handleSave} className="save-button">
            저장
          </button>
          <button onClick={handleCancel} className="cancel-button">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageModal;