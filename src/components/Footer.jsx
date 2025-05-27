import React from "react";
import "./Footer.css";
import { FiGithub } from "react-icons/fi";

const Footer = () => (
    <footer className="footer">
        <div className="footer-content center-content">
            <a
                href="https://github.com/ldsc212"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiGithub size={20} /> GitHub
                </span>
            </a>
        </div>
    </footer>
);

export default Footer;
