import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import Papa from "papaparse";
import InputForm from "./InputForm";
import Data from './StudyGroupMatch.Users.csv';
import FormFlow from "./FormFlow";

function App() {
  const [currentView, setCurrentView] = useState("main"); // "main" or "form"
  const [data, setData] = useState([]);
  
  // Handle CSV file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };
  
  // Fetch initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Data);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csvData = decoder.decode(result.value);
        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true
        }).data;
        setData(parsedData);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };
    fetchData();
  }, []);
  
  // Handle completed form submission
  const handleFormComplete = (newUserData) => {
    // Add the new user to our data array
    setData(prevData => [...prevData, transformUserData(newUserData)]);
    // Return to main view
    setCurrentView("main");
  };
  
  // Transform user data to flat format for display in the table
  const transformUserData = (userData) => {
    return {
      name: userData.name,
      major: userData.major,
      email: userData.email,
      year: userData.year,
      "preferences.studyStyle": userData.preferences.studyStyle
    };
  };
  
  return (
    <div className="App">
      {currentView === "main" ? (
        <div className="main-container">
          <h1>Study Group Matching System</h1>
          
          <div className="controls-section">
            <button 
              className="create-profile-btn"
              onClick={() => setCurrentView("form")}
            >
              Create New Profile
            </button>
            
            <div className="file-upload">
              <h3>Upload User Data</h3>
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload} 
                className="file-input"
              />
            </div>
          </div>
          
          <div className="data-section">
            <h2>Current Users ({data.length})</h2>
            {data.length > 0 ? (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Major</th>
                    <th>Year</th>
                    <th>Study Style</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.major}</td>
                      <td>{row.year}</td>
                      <td>{row["preferences.studyStyle"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found. Upload a CSV or create new profiles.</p>
            )}
          </div>
        </div>
      ) : (
        <FormFlow 
          returnToMain={() => setCurrentView("main")} 
          onCompleteForm={handleFormComplete}
        />
      )}
    </div>
  );
}

export default App;