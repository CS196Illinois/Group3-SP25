import React from "react";
import "./style.css";

export const Frame = () => {
  return (
    <div className="frame">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="overlap">
            <div className="text-wrapper">Find Your Study Group!</div>

            <button className="button">
              <button className="div">Get Started</button>
            </button>
          </div>

          <div className="text-wrapper-2">Study Group Matcher</div>

          <button className="button-wrapper">
            <button className="button-2">About Us</button>
          </button>

          <button className="div-wrapper">
            <button className="button-2">Sign In</button>
          </button>
        </div>
      </div>
    </div>
  );
};
