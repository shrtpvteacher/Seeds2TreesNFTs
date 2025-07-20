import React from "react";
import "../styles/About.css"
import redwoodHero from "../assets/redwood-hero.png"; 


const About = () => {
    return (
      <div className="about-page">
        <img src={redwoodHero} alt="Redwood Tree" className="hero-image" />
        
  
        <div className="about-text-box">
          <h3>About Seeds2Trees</h3>
          <p>
            Seeds2Trees is a mission-driven NFT project that transparently tracks real-world tree planting through on-chain donations.
            Each NFT represents a contribution to reforestation, with metadata updated as trees are planted — including location and planting date.
            This collection isn't just art — it's a ledger of environmental action.</p>
          <p>
            Seeds2TreesNFTs is a smart contract blockchain-powered donation platform where every minted NFT
            represents a real-world tree. Each NFT begins as a placeholder, and over time,
            it transforms into a digital record of an actual planted tree — including its
            location and planting date and with the potential to change the image of the NFT with a real image of the 
            tree planted.
          </p>
          <p>
            This project provides transparent documentation of action taken in real life and  
            and can be used for tracking environmental impact. Whether you're an individual, organization,
            or future conservation partner, your donations help build a forest with roots
            in real life and permanence on-chain.
          </p>
          </div>

<div className="about-the-creator">
  <h3>About The Creator</h3>
  <p>
    I'm a full-stack developer with a passion for transparency, sustainability, and blockchain technology.
    </p>
    <p>
    I built Seeds2TreesNFTs to utilize the benefits of on chain transparent record tracking through decentralized blockchain technology"
    </p>
  <p>
    This project was inspired by my love for the redwood forest and my desire for transparency in tracking raised funds to the results of trees being planted.
    </p>
 
</div>
      </div>
    
    );
  };

export default About;