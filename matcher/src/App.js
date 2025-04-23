import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
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

  return (
    <div className="App">
      {currentFrame === "frame2" && <Frame2 goToFrame3={() => setCurrentFrame("frame3")} />}
      {currentFrame === "frame3" && <Frame3 goToFrame4={() => setCurrentFrame("frame4")} />}
      {currentFrame === "frame4" && <Frame4 goToFrame5={() => setCurrentFrame("frame5")} />}
      {currentFrame === "frame5" && <Frame5 goToFrame6={() => setCurrentFrame("frame6")} />}
    </div>
  );
}

export default App;