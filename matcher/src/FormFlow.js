import React, { useState } from "react";
import Papa from "papaparse";
import { Frame2 } from "./Frame2";
import { Frame3 } from "./Frame3";
import { Frame4 } from "./Frame4";
import { Frame5 } from "./Frame5";
import { Frame6 } from "./Frame6";
import Data from './StudyGroupMatch.Users.csv';
import "./FormFlow.css";

const FormFlow = ({ returnToMain, onCompleteForm }) => {
  const [currentFrame, setCurrentFrame] = useState("frame2");
  const [userData, setUserData] = useState({
    _id: generateUserId(), // Generate a unique MongoDB-like ID 
    name: "",
    email: "",
    major: "",
    year: "",
    classes: ["", "", "", "", ""],
    availability: ["", ""],
    preferences: {
      studyStyle: "",
      groupSize: "",
      studySpots: ["", "", ""]
    }
  });

  // Function to generate a MongoDB-like ID (24 hex characters)
  function generateUserId() {
    const hexChars = '0123456789abcdef';
    let id = '';
    for (let i = 0; i < 24; i++) {
      id += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
    }
    return id;
  }

  // Function to receive and save data from Frame2
  const handleFrame2Submit = (frame2Data) => {
    setUserData(prevData => ({
      ...prevData,
      name: frame2Data.name,
      email: frame2Data.email,
      major: frame2Data.major,
      year: frame2Data.year
    }));
    setCurrentFrame("frame3");
  };

  // Function to receive and save data from Frame3
  const handleFrame3Submit = (frame3Data) => {
    // Update classes information
    setUserData(prevData => ({
      ...prevData,
      classes: frame3Data.classes || prevData.classes
    }));
    setCurrentFrame("frame4");
  };

  // Function to receive and save data from Frame4
  const handleFrame4Submit = (frame4Data) => {
    // Update availability information
    setUserData(prevData => ({
      ...prevData,
      availability: frame4Data.availability || prevData.availability
    }));
    setCurrentFrame("frame5");
  };

  // Function to receive and save data from Frame5
  const handleFrame5Submit = (frame5Data) => {
    // Update study preferences
    setUserData(prevData => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        studyStyle: frame5Data.studyStyle || "",
        groupSize: frame5Data.groupSize || "",
        studySpots: frame5Data.studySpots || ["", "", ""]
      }
    }));
    
    // After collecting all data, append to CSV
    appendToExistingCSV();
    
    // Go to the results frame
    setCurrentFrame("frame6");
  };

  // Function to read existing CSV, append new data, and save
  const appendToExistingCSV = async () => {
    try {
      // Read the existing CSV file
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      
      // Parse the existing CSV data
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
      });
      
      // Format our new user data to match the CSV structure
      const newRow = {
        "_id": userData._id,
        "name": userData.name,
        "email": userData.email,
        "major": userData.major,
        "year": userData.year,
        "classes[0]": userData.classes[0] || "",
        "classes[1]": userData.classes[1] || "",
        "classes[2]": userData.classes[2] || "",
        "classes[3]": userData.classes[3] || "",
        "classes[4]": userData.classes[4] || "",
        "availability[0]": userData.availability[0] || "",
        "availability[1]": userData.availability[1] || "",
        "preferences.studyStyle": userData.preferences.studyStyle || ""
      };
      
      // Add the new row to the existing data
      const updatedData = [...parsedData.data, newRow];
      
      // Convert back to CSV
      const updatedCsv = Papa.unparse(updatedData);
      
      // Create a Blob and download the updated CSV
      const blob = new Blob([updatedCsv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", "StudyGroupMatch.Users.csv");
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Pass data back to main component
      onCompleteForm(userData);
      
    } catch (error) {
      console.error("Error appending to CSV:", error);
      alert("There was an error saving your data. Please try again.");
    }
  };

  return (
    <div className="form-flow-container">
      {currentFrame !== "frame6" && (
        <button className="back-to-main" onClick={returnToMain}>
          ← Back to Main Page
        </button>
      )}
      
      {currentFrame === "frame2" && (
        <Frame2 
          goToFrame3={(frame2Data) => handleFrame2Submit(frame2Data)} 
        />
      )}
      
      {currentFrame === "frame3" && (
        <Frame3 
          goToFrame4={(frame3Data) => handleFrame3Submit(frame3Data)} 
        />
      )}
      
      {currentFrame === "frame4" && (
        <Frame4 
          goToFrame5={(frame4Data) => handleFrame4Submit(frame4Data)} 
        />
      )}
      
      {currentFrame === "frame5" && (
        <Frame5 
          goToFrame6={(frame5Data) => handleFrame5Submit(frame5Data)} 
        />
      )}
      
      {currentFrame === "frame6" && (
        <Frame6 
          returnToMain={returnToMain} 
        />
      )}
      
      {currentFrame !== "frame6" && (
        <div className="form-progress">
          <div className={`progress-step ${currentFrame === "frame2" ? "active" : currentFrame !== "frame2" ? "completed" : ""}`}>
            Step 1: Profile
          </div>
          <div className={`progress-step ${currentFrame === "frame3" ? "active" : currentFrame !== "frame2" && currentFrame !== "frame3" ? "completed" : ""}`}>
            Step 2: Classes
          </div>
          <div className={`progress-step ${currentFrame === "frame4" ? "active" : currentFrame === "frame5" || currentFrame === "frame6" ? "completed" : ""}`}>
            Step 3: Availability
          </div>
          <div className={`progress-step ${currentFrame === "frame5" ? "active" : currentFrame === "frame6" ? "completed" : ""}`}>
            Step 4: Preferences
          </div>
        </div>
      )}
    </div>
  );
};

export default FormFlow;