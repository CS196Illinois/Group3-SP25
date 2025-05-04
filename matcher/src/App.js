import React, { useState, useEffect } from "react";
import './App.css';
import Papa from "papaparse";
import Data from './StudyGroupMatch.Users.csv';
import FormFlow from "./FormFlow";

function App() {
  const [currentView, setCurrentView] = useState("main");
  const [data, setData] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const [lastAddedUser, setLastAddedUser] = useState(null);

  
  const calculateMatchesForUser = (targetUser, allUsers) => {
    if (!targetUser || allUsers.length < 2) return [];
    
    return allUsers
      .filter(user => user.email !== targetUser.email)
      .map(user => {
        let score = 0;
        
        // 1. Class Matching (Most Important - 60% weight)
        const classMatches = [...Array(5)].reduce((count, _, i) => {
          const targetClass = targetUser[`classes[${i}]`];
          const userClass = user[`classes[${i}]`];
          return count + (targetClass && userClass && targetClass === userClass ? 1 : 0);
        }, 0);
        score += classMatches * 5; // 5 points per matching class
        
        // 2. Availability Matching (30% weight)
        const availabilityMatches = [...Array(2)].reduce((count, _, i) => {
          const targetAvail = targetUser[`availability[${i}]`];
          const userAvail = user[`availability[${i}]`];
          return count + (targetAvail && userAvail && targetAvail === userAvail ? 1 : 0);
        }, 0);
        score += availabilityMatches * 4; // 4 points per matching slot
        
        // 3. Preferences (Only if both have preferences)
        const hasPreferences = targetUser["preferences.studyStyle"] && user["preferences.studyStyle"];
        if (hasPreferences) {
          if (targetUser["preferences.studyStyle"] === user["preferences.studyStyle"]) score += 3;
          if (targetUser["preferences.groupSize"] === user["preferences.groupSize"]) score += 2;
          if (targetUser["preferences.studyLocation"] === user["preferences.studyLocation"]) score += 2;
        } else {
          score += 3; // Neutral score if preferences missing
        }
        
        // 4. Year and Major Similarity
        if (targetUser.year === user.year) score += 2;
        if (targetUser.major && user.major && 
            targetUser.major.split('+')[0].trim() === user.major.split('+')[0].trim()) {
          score += 2;
        }
        
        return {
          user,
          score: Math.min(score, 30), // New max score
          sharedClasses: [...Array(5)]
            .map((_, i) => 
              targetUser[`classes[${i}]`] && 
              targetUser[`classes[${i}]`] === user[`classes[${i}]`] ? 
              targetUser[`classes[${i}]`] : null
            )
            .filter(Boolean),
          matchingAvailability: [...Array(2)]
            .map((_, i) => 
              targetUser[`availability[${i}]`] === user[`availability[${i}]`] ?
              targetUser[`availability[${i}]`] : null
            )
            .filter(Boolean)
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length > 0) {
          setData(results.data);
          const lastUser = results.data[results.data.length - 1];
          setLastAddedUser(lastUser);
          setTopMatches(calculateMatchesForUser(lastUser, results.data));
        }
      },
    });
  };

  // Load initial data
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

  const handleFormComplete = (newUserData) => {
    const transformedData = {
      name: newUserData.name,
      major: newUserData.major,
      email: newUserData.email,
      year: newUserData.year,
      "preferences.studyStyle": newUserData["preferences.studyStyle"],
      "preferences.groupSize": newUserData["preferences.groupSize"],
      "preferences.studyLocation": newUserData["preferences.studyLocation"],
      ...Object.fromEntries(
        [...Array(5)].map((_, i) => [`classes[${i}]`, newUserData[`classes[${i}]`]])
      ),
      ...Object.fromEntries(
        [...Array(2)].map((_, i) => [`availability[${i}]`, newUserData[`availability[${i}]`]])
      )
    };
    
    const updatedData = [...data, transformedData];
    setData(updatedData);
    setLastAddedUser(transformedData);
    setTopMatches(calculateMatchesForUser(transformedData, updatedData));
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

          {/* Show matches only for the last added user */}
          {topMatches.length > 0 && lastAddedUser && (
            <div className="top-matches">
              <h2>Top 5 Matches for {lastAddedUser.name}</h2>
              <table className="matches-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Score (Max 17)</th>
                    <th>Shared Classes</th>
                    <th>Study Style</th>
                  </tr>
                </thead>
                <tbody>
                  {topMatches.map((match, index) => (
                    <tr key={index}>
                      <td>{match.user.name}</td>
                      <td>{match.user.email}</td>
                      <td>{match.score.toFixed(1)}</td>
                      <td>{match.sharedClasses.join(', ') || 'None'}</td>
                      <td>{match.user["preferences.studyStyle"]}</td>
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