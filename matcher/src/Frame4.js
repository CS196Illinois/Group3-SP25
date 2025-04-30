import React, { useState } from "react";
import "./style4.css";

export const Frame4 = ({ goToFrame5 }) => {
  const [availability, setAvailability] = useState(["", ""]);

  function clickAbout() {
    alert("We are two CS124H students!");
  }

  function handleChange(idx, val) {
    const copy = [...availability];
    copy[idx] = val;
    setAvailability(copy);
  }

  function handleNext() {
    // Format the data to match our CSV structure with availability array
    const availabilityData = {
      availability: availability
    };
    
    console.log("Availability Data:", availabilityData);
    
    // Pass the data to the parent component and move to the next frame
    goToFrame5(availabilityData);
  }

  return (
    <div className="frame">
      <div className="div-2">
        <div className="rectangle" />
        <div className="overlap-group">
          <div className="form-fields">
            {availability.map((time, i) => (
              <div className="form-row" key={i}>
                <label>Availability {i + 1}:</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => handleChange(i, e.target.value)}
                  placeholder={`Enter time (e.g., Monday 4PM-5PM)`}
                />
              </div>
            ))}
          </div>
          <button
            className="button button-instance"
            onClick={handleNext}
          >
            <span className="button-2">Next</span>
          </button>
        </div>
        <div className="text-wrapper-2">Profile Creation</div>
        <button className="button-wrapper">
          <button onClick={clickAbout} className="button-3">About Us</button>
        </button>
      </div>
    </div>
  );
};