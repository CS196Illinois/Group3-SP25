import React from "react";
import { Button } from "./Button";
import "./style.css";

export const Frame = () => {
    return (
        <div className="frame">
            <div className="div-2">
                <div className="rectangle" />

                <div className="overlap-group">
                    <p className="name-ID-major-year">
                        Name: <br />
                        <br />
                        ID: <br />
                        <br />
                        Major:
                        <br /> <br />
                        Year: <br />
                        <br />
                        Email:
                    </p>

                    <Button
                        buttonClassName="design-component-instance-node"
                        className="button-instance"
                        spanClassName="button-2"
                        text="Next"
                    />
                </div>

                <div className="text-wrapper-2">Profile Creation</div>

                <button className="button-wrapper">
                    <button className="button-3">About Us</button>
                </button>
            </div>
        </div>
    );
};

