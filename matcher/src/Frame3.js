import React, { useState } from "react";
import "./style3.css";

export const Frame3 = ({ goToFrame4 }) => {
  const [classes, setClasses] = useState(["", "", "", "", ""]);

  function clickAbout() {
    alert("We are two CS124H students!");
  }

  function handleChange(index, value) {
    const updated = [...classes];
    updated[index] = value;
    setClasses(updated);
  }

  function handleNext() {
    console.log("Classes:", classes);

    fetch("/api/save-classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classes }),
    }).then(() => goToFrame4());
  }

  return (
    <div className="frame">
      <div className="div-2">
        <div className="rectangle" />

        <div className="overlap-group">
          <div className="form-fields">
            {classes.map((cls, idx) => (
              <div className="form-row" key={idx}>
                <label>Class {idx + 1}:</label>
                <input
                  value={cls}
                  onChange={(e) => handleChange(idx, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button className="button button-instance" onClick={handleNext}>
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

