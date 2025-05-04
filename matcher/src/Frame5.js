import React, { useState } from "react";
import "./style5.css";

export const Frame5 = ({ goToFrame6 }) => {
  const [studyStyle, setStudyStyle] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [spot1, setSpot1] = useState("");
  const [spot2, setSpot2] = useState("");
  const [spot3, setSpot3] = useState("");

  function clickAbout() {
    alert("We are two CS124H students!");
  }

  function handleFinish() {
    // Format the data to match our CSV structure with preferences
    const studyPreferences = {
      studyStyle: studyStyle,
      groupSize: groupSize,
      studySpots: [spot1, spot2, spot3]
    };
    
    console.log("Study Preferences:", studyPreferences);
    
    // Pass the data to the parent component and move to the final frame
    goToFrame6(studyPreferences);
  }

  return (
    <div className="frame">
      <div className="div-2">
        <div className="rectangle" />
        <div className="text-wrapper-2">Profile Creation</div>
        
        <div className="overlap-group">
          <div className="form-fields">
            <div className="form-row">
              <label>Study Style:</label>
              <input 
                type="text"
                value={studyStyle} 
                onChange={(e) => setStudyStyle(e.target.value)} 
                placeholder="e.g., Quiet, Group, Visual"
              />
            </div>
            <div className="form-row">
              <label>Preferred Group Size:</label>
              <input 
                type="text"
                value={groupSize} 
                onChange={(e) => setGroupSize(e.target.value)} 
                placeholder="e.g., Small: 2-3, Medium: 4-5, Large:7-8 "
              />
            </div>
            <div className="form-row">
              <label>Study Spot 1:</label>
              <input 
                type="text"
                value={spot1} 
                onChange={(e) => setSpot1(e.target.value)} 
                placeholder="e.g., Main Library"
              />
            </div>
            <div className="form-row">
              <label>Study Spot 2:</label>
              <input 
                type="text"
                value={spot2} 
                onChange={(e) => setSpot2(e.target.value)} 
                placeholder="e.g., Grainger Engineering Library"
              />
            </div>
            <div className="form-row">
              <label>Study Spot 3:</label>
              <input 
                type="text"
                value={spot3} 
                onChange={(e) => setSpot3(e.target.value)} 
                placeholder="e.g., Siebel Center for CS"
              />
            </div>
          </div>

          <button className="button button-instance" onClick={handleFinish}>
            <div className="button-2">Finish</div>
          </button>
        </div>

        <button className="button-wrapper">
          <button onClick={clickAbout} className="button-3">About Us</button>
        </button>
      </div>
    </div>
  );
};