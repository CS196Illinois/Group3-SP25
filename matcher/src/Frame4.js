import React, { useState } from "react";
import "./style4.css";

export const Frame4 = ({ goToFrame5 }) => {
  const [times, setTimes] = useState(["", "", "", "", ""]);

  function clickAbout() {
    alert("We are two CS124H students!");
  }

  function handleChange(idx, val) {
    const copy = [...times];
    copy[idx] = val;
    setTimes(copy);
  }

  function handleNext() {
    console.log("Times:", times);
    // send to your backend if needed:
    fetch("/api/save-times", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ times }),
    }).then(() => goToFrame5());
  }

  return (
    <div className="frame">
      <div className="div-2">
        <div className="rectangle" />

        <div className="overlap-group">
          <div className="form-fields">
            {times.map((t, i) => (
              <div className="form-row" key={i}>
                <label>Time {i + 1}:</label>
                <input
                  type="text"
                  value={t}
                  onChange={(e) => handleChange(i, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button
            className="button button-instance"
            onClick={handleNext}
          >
            <span className="button-2">Next</span>
          </button>
        </div>

        <div className="text-wrapper-2">Profile Creation</div>

        <button className="button-wrapper" onClick={clickAbout}>
          <span className="button-3">About Us</span>
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
