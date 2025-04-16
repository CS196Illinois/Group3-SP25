import React from "react";
import "./style4.css";
import { Button } from "./Button";  // if you're using a custom button component

export const Frame4 = ({ goToFrame5 }) => {
  function clickAbout() {
    alert("We are two CS124H students!");
  }

  return (
    <div className="frame">
      <div className="div-2">
        <div className="rectangle" />

        <div className="overlap-group">
          <p className="time-time-time">
            Time 1: <br />
            <br />
            Time 2: <br />
            <br />
            Time 3:
            <br /> <br />
            Time 4: <br />
            <br />
            Time 5:
          </p>

          <button className="button button-instance" onClick={goToFrame5}>
            <span className="button-2">Next</span>
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
// import { Button } from "./Button";
// import "./style4.css";

// function clickAbout() {
//     alert("We are two CS124H students!");
// }

// export const Frame = () => {
//     return (
//         <div className="frame">
//             <div className="div-2">
//                 <div className="rectangle" />

//                 <div className="overlap-group">
//                     <p className="time-time-time">
//                         Time 1: <br />
//                         <br />
//                         Time 2: <br />
//                         <br />
//                         Time 3:
//                         <br /> <br />
//                         Time 4: <br />
//                         <br />
//                         Time 5:
//                     </p>

//                     <button className="button button-instance">
//                         <span className="button-2">Next</span>
//                     </button>
//                 </div>

//                 <div className="text-wrapper-2">Profile Creation</div>

//                 <button className="button-wrapper">
//                     <button onClick={clickAbout} button className="button-3">About Us</button>
//                 </button>
//             </div>
//         </div>
//     );
// };
