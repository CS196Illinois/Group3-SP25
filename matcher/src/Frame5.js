import React from "react";
import "./style.css";

export const Frame = () => {
    return (
        <div className="frame">
            <div className="div">
                <div className="rectangle" />

                <div className="overlap-group">
                    <p className="study-style-group">
                        Study Style: <br />
                        <br />
                        Group Size: <br />
                        <br />
                        Study Location 1:
                        <br /> <br />
                        Study Location 2: <br />
                        <br />
                        Study Location 3:
                    </p>

                    <button className="button">
                        <button className="text-wrapper">Finish</button>
                    </button>
                </div>

                <div className="text-wrapper-2">Profile Creation</div>

                <button className="button-wrapper">
                    <button className="button-2">About Us</button>
                </button>
            </div>
        </div>
    );
};
