import React from "react";
import "./style6.css";

export const Frame6 = ({ returnToMain }) => {
  function clickAbout() {
    alert("We are two CS124H students!");
  }

  return (
    <div className="frame">
      <div className="frame6-container">
        <h1 className="frame6-title">Your Study Matches</h1>
        
        <div className="matches-content">
          <div className="success-message">
            <h2>Profile Created Successfully!</h2>
            <p>Your profile information has been saved to our system.</p>
            <p>Here are your potential study group matches based on your preferences:</p>
          </div>
          
          <div className="matches-list">
            {/* This would be populated with actual matches from your algorithm */}
            <div className="match-card">
              <h3>Vili Dai</h3>
              <p><strong>Major:</strong> Information Science + Data Science</p>
              <p><strong>Classes:</strong> CS 124, STAT 107</p>
              <p><strong>Contact:</strong> jiaruid2@illinois.edu</p>
            </div>
            
            <div className="match-card">
              <h3>Hazel Lu</h3>
              <p><strong>Major:</strong> Statistics + Computer Science</p>
              <p><strong>Classes:</strong> CS 128, CS 107, MATH 241</p>
              <p><strong>Contact:</strong> hazellu2@illinois.edu</p>
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="back-to-main" onClick={returnToMain}>
            Return to Main Page
          </button>
          <button className="about-button" onClick={clickAbout}>
            About Us
          </button>
        </div>
      </div>
    </div>
  );
};