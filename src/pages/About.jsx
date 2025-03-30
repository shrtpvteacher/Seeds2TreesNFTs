import React from "react";
import "../styles/About.css"
import redwoodHero from "../assets/redwood-hero.png"; 

const About = () => {
    return (
      <div className="about-page">
        <img src={redwoodHero} alt="Redwood Tree" className="hero-image" />
  
        <div className="about-text-box">
          <h2>About Seeds2TreesNFTs</h2>
          <p>
            Seeds2TreesNFTs is a blockchain-powered donation platform where every minted NFT
            represents a real-world tree. Each NFT begins as a placeholder, and over time,
            it transforms into a digital record of an actual planted tree — including its
            location and planting date.
          </p>
          <p>
            By merging transparency and sustainability, this project provides long-term
            tracking for environmental impact. Whether you're an individual, organization,
            or future conservation partner, your donations help build a forest with roots
            in real life and permanence on-chain.
          </p>
        </div>
        <hr className="about-divider" />

<div className="creator-section">
  <h3>About the Creator</h3>
  <p>
    I'm a full-stack developer with a passion for transparency, sustainability, and blockchain technology.
    I built Seeds2TreesNFTs to bridge digital donations with real-world tree planting — combining tech with positive impact.
    You can explore my other projects, apps, and tools on my developer portfolio site.
  </p>
  <a
    href="https://yourportfolio.com"
    target="_blank"
    rel="noopener noreferrer"
    className="creator-link"
  >
    🌐 Visit My Dev Portfolio
  </a>
</div>
      </div>
    );
  };

export default About;
  