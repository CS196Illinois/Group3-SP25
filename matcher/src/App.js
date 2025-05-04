import React, { useState, useEffect } from "react";
import './App.css';
import Papa from "papaparse";
import Data from './StudyGroupMatch.Users.csv';
import FormFlow from "./FormFlow";

function App() {
  const [currentView, setCurrentView] = useState("main");
  const [data, setData] = useState([]);
  const [topMatches, setTopMatches] = useState([]);

  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
        calculateTopMatches(results.data);
      },
    });
  };

  // Fetch initial data (unchanged)
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

  
  const calculateTopMatches = (userData) => {
    if (userData.length < 2) {
      setTopMatches([]);
      return;
    }

    const allPairs = [];
    
    
    for (let i = 0; i < userData.length; i++) {
      for (let j = i + 1; j < userData.length; j++) {
        const user1 = userData[i];
        const user2 = userData[j];
        
        let score = 0;
        if (user1.major === user2.major) score += 2;
        if (user1["preferences.studyStyle"] === user2["preferences.studyStyle"]) score += 3;
        
        allPairs.push({
          user1: user1.name,
          user2: user2.name,
          email1: user1.email,
          email2: user2.email,
          score
        });
      }
    }

    const top5 = allPairs
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    
    setTopMatches(top5);
  };

  const handleFormComplete = (newUserData) => {
    const transformedData = {
      name: newUserData.name,
      major: newUserData.major,
      email: newUserData.email,
      year: newUserData.year,
      "preferences.studyStyle": newUserData["preferences.studyStyle"]
    };
    
    const updatedData = [...data, transformedData];
    setData(updatedData);
    calculateTopMatches(updatedData);
    setCurrentView("main");
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

          {/* show top 5 matches */}
          {topMatches.length > 0 && (
            <div className="top-matches">
              <h2>Top 5 Matches</h2>
              <table className="matches-table">
                <thead>
                  <tr>
                    <th>User 1</th>
                    <th>User 2</th>
                    <th>Match Score</th>
                  </tr>
                </thead>
                <tbody>
                  {topMatches.map((match, index) => (
                    <tr key={index}>
                      <td>{match.user1} ({match.email1})</td>
                      <td>{match.user2} ({match.email2})</td>
                      <td>{match.score.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          
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
          onComplete={handleFormComplete}
          returnToMain={() => setCurrentView("main")}
        />
      )}
    </div>
  );
}

export default App;