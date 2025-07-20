// src/components/Footer.jsx
import React from "react";
import {
    FaLinkedin,
    FaEnvelope,
    // FaFilePdf,
    FaGithub,
    FaTwitter,
   // FaYoutube
  } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Seeds2TreesNFTs — Built with ❤️ for the planet.</p>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/kelly-coldren-804b1b2a/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
        <a href="mailto:seeds2treesnfts@gmail.com"><FaEnvelope /> Email</a>
       {/* <a href="/whitepaper.pdf" target="_blank" rel="noopener noreferrer"><FaFilePdf />Whitepaper</a> */}
        <a href="https://github.com/shrtpvteacher/Seeds2TreesNFTs" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub </a>
        <a href="https://x.com/shrtpvteacher" target="_blank" rel="noopener noreferrer"><FaTwitter /> X (Twitter) </a>
       {/* <a href="https://youtube.com/your-video-demo-link" target="_blank" rel="noopener noreferrer"><FaYoutube /> Demo Video</a>  */}
       <a href="https://kelly-coldren-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">Creater's Portolio Resume</a>
      </div>
    </footer>
  );
};

export default Footer;
