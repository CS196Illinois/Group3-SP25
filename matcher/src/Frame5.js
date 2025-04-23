import React from "react";
import "./style5.css";
import { Button } from "./Button";  // if you're using a custom button component

export const Frame5 = ({ goToFrame6 }) => {
  function clickAbout() {
    alert("We are two CS124H students!");
  }

  return (
    <div className="frame">
      <div className="div-2">
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

          <button className="button button-instance" onClick={goToFrame6}>
            <span className="button-2">Finish</span>
          </button>
        </div>

        <div className="text-wrapper-2">Profile Creation</div>

        <button className="button-wrapper">
          <button onClick={clickAbout} className="button-3">About Us</button>
        </button>
      </div>
    </div>
  );
};

// import React from "react";
// import "./style5.css";

// function clickAbout() {
//     alert("We are two CS124H students!");
// }

// function clickFinish() {
//     alert("Matching in progress...");
// }

// export const Frame5 = () => {
//     return (
//         <div className="frame">
//             <div className="div">
//                 <div className="rectangle" />

//                 <div className="overlap-group">
//                     <p className="study-style-group">
//                         Study Style: <br />
//                         <br />
//                         Group Size: <br />
//                         <br />
//                         Study Location 1:
//                         <br /> <br />
//                         Study Location 2: <br />
//                         <br />
//                         Study Location 3:
//                     </p>

//                     <button className="button">
//                         <button onClick={clickFinish} button className="text-wrapper">Finish</button>
//                     </button>
//                 </div>

//                 <div className="text-wrapper-2">Profile Creation</div>

//                 <button className="button-wrapper">
//                     <button onClick={clickAbout} button className="button-2">About Us</button>
//                 </button>
//             </div>
//         </div>
//     );
// };
