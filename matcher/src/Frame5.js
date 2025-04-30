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
    const studyPreferences = {
      studyStyle,
      groupSize,
      studySpots: [spot1, spot2, spot3]
    };
    
    console.log("Study Preferences:", studyPreferences);
    fetch("/api/save-preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studyPreferences),
    }).then(() => goToFrame6());
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
              />
            </div>
            <div className="form-row">
              <label>Group Size:</label>
              <input 
                type="text"
                value={groupSize} 
                onChange={(e) => setGroupSize(e.target.value)} 
              />
            </div>
            <div className="form-row">
              <label>Study Spot 1:</label>
              <input 
                type="text"
                value={spot1} 
                onChange={(e) => setSpot1(e.target.value)} 
              />
            </div>
            <div className="form-row">
              <label>Study Spot 2:</label>
              <input 
                type="text"
                value={spot2} 
                onChange={(e) => setSpot2(e.target.value)} 
              />
            </div>
            <div className="form-row">
              <label>Study Spot 3:</label>
              <input 
                type="text"
                value={spot3} 
                onChange={(e) => setSpot3(e.target.value)} 
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

// import React from "react";
// import "./style5.css";

// function clickAbout() {
//     alert("We are two CS124H students!");
// }

// function clickFinish() {
//     alert("Matching in progress...");
// }

// export const Frame5 = () => {
//     return (
//         <div className="frame">
//             <div className="div">
//                 <div className="rectangle" />

//                 <div className="overlap-group">
//                     <p className="study-style-group">
//                         Study Style: <br />
//                         <br />
//                         Group Size: <br />
//                         <br />
//                         Study Location 1:
//                         <br /> <br />
//                         Study Location 2: <br />
//                         <br />
//                         Study Location 3:
//                     </p>

//                     <button className="button">
//                         <button onClick={clickFinish} button className="text-wrapper">Finish</button>
//                     </button>
//                 </div>

//                 <div className="text-wrapper-2">Profile Creation</div>

//                 <button className="button-wrapper">
//                     <button onClick={clickAbout} button className="button-2">About Us</button>
//                 </button>
//             </div>
//         </div>
//     );
// };
