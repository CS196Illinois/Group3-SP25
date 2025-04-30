import React, { useState } from "react";
import "./style2.css";

export const Frame2 = ({ goToFrame3 }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");

  function clickAbout() {
    alert("We are two CS124H students!");
  }

  function handleNext() {
    // Create the user data object
    const userData = { name, id, major, year, email };
    console.log("Submitting user data:", userData);
    
    // Pass the data to the parent component and move to the next frame
    goToFrame3(userData);
  }

  return (
    <div className="frame">
      <div className="div-2">
        <div className="rectangle" />
        <div className="overlap-group">
          <div className="form-fields">
            <div className="form-row">
              <label>Name:</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-row">
              <label>ID:</label>
              <input value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Major:</label>
              <input value={major} onChange={(e) => setMajor(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Year:</label>
              <input value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Email:</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
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