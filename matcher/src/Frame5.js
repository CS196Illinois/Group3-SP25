import React from "react";
import "./style5.css";

function clickAbout() {
  alert("We are two CS124H students!");
}

function clickFinish() {
  alert("Matching in progress...");
}

export const Frame5 = () => {
  return (
    <div className="frame">
      <div className="div">
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

          <button className="button text-wrapper" onClick={clickFinish}>
            Finish
          </button>
        </div>

        <div className="text-wrapper-2">Profile Creation</div>

        <button className="button-2" onClick={clickAbout}>
          About Us
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
