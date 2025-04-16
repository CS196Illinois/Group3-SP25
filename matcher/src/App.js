import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import { Frame4 } from "./Frame4";
import { Frame5 } from "./Frame5";    // add this new import

// function App() {
//   return (
//     <div className="App">
//       <Frame />
//     </div>
//   );
// }

// export default App;
function App() {
  const [currentFrame, setCurrentFrame] = useState("frame4");

  return (
    <div className="App">
      {currentFrame === "frame4" && <Frame4 goToFrame5={() => setCurrentFrame("frame5")} />}
      {currentFrame === "frame5" && <Frame5 />}
    </div>
  );
}

export default App;