import React from "react";
import "./../../assets/css/all.css";
import "./../../assets/css/Common/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 왼쪽: 회사 정보 */}
        <div className="footer-section info">
          <h4>고라니 AI 번역</h4>
          <p>사업자 등록번호: 123-45-67890</p>
          <p>이메일: contact@gorani.world</p>
        </div>
      </div>

      {/* 하단 섹션: 저작권 표시 */}
      <div className="footer-bottom">
        <p>ⓒ 2025 WWW.GORANI.WORLD. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
