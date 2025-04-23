import React from "react";
import "./style3.css";
import { Button } from "./Button";  // if you're using a custom button component

export const Frame3 = ({ goToFrame4 }) => {
  function clickAbout() {
    alert("We are two CS124H students!");
  }

  return (
    <div className="frame">
      <div className="div-2">
        <div className="rectangle" />

        <div className="overlap-group">
          <p className="class-class">
            Class 1: <br />
            <br />
            Class 2: <br />
            <br />
            Class 3:
            <br /> <br />
            Class 4: <br />
            <br />
            Class 5:
          </p>

          <button className="button button-instance" onClick={goToFrame4}>
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
