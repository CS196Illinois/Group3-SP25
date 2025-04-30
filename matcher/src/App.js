import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import Papa from "papaparse";
import InputForm from "./InputForm";
import Data from './StudyGroupMatch.Users.csv';
import { Frame2 } from "./Frame2";
import { Frame3 } from "./Frame3";
import { Frame4 } from "./Frame4";
import { Frame5 } from "./Frame5";



// function App() {
//   return (
//     <div className="App">
//       <Frame />
//     </div>
//   );
// }

// export default App;
function App() {
  const [currentFrame, setCurrentFrame] = useState("frame2");

  const [data,setData] = useState([]);

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
  
  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <InputForm onAddStudent={(student) => setData(prev => [...prev, student])} />
      <input type = "file" accept=".csv" onChange={handleFileUpload}/>
      {data.length ? ( 
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>Study Style</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.major}</td>
                <td>{row.studyStyle || row["preferences.studyStyle"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ): null}

      {currentFrame === "frame2" && <Frame2 goToFrame3={() => setCurrentFrame("frame3")} />}
      {currentFrame === "frame3" && <Frame3 goToFrame4={() => setCurrentFrame("frame4")} />}
      {currentFrame === "frame4" && <Frame4 goToFrame5={() => setCurrentFrame("frame5")} />}
      {currentFrame === "frame5" && <Frame5 goToFrame6={() => setCurrentFrame("frame6")} />}
    </div>
  );
}

export default App;