import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <footer className="footer-container">

                {/* <div className="social-links">
              <a href="#" className="social-link">
                인스타그램
              </a>
              <a href="#" className="social-link">
                블로그
              </a>
              <a href="#" className="social-link">
                카카오톡
              </a>
              <a href="#" className="social-link">
                유튜브
              </a>
            </div> */}

                <div className="footer-bottom clearfix">
                    <p className="copyright">© 2024 YUMMY CORP. ALL RIGHTS RESERVED.</p>
                </div>
            </footer >
        </div >
    );
};

export default Footer;