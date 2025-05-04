import React, { useState } from "react";

function InputForm({ onAddStudent }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    major: "",
    year: "",
    "preferences.studyStyle": "",
    "preferences.groupSize": "",
    "preferences.studyLocation": "",
    "classes[0]": "",
    "classes[1]": "",
    "classes[2]": "",
    "classes[3]": "",
    "classes[4]": "",
    "availability[0]": "",
    "availability[1]": "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (onAddStudent) onAddStudent(student);
  };

  return (
    <div>
      <h2>Create Your Profile</h2>
      {Object.keys(student).map((key, index) => (
        <input
          key={index}
          type="text"
          name={key}
          placeholder={key}
          value={student[key]}
          onChange={handleChange}
          style={{ margin: "5px", padding: "5px" }}
        />
      ))}
      <br />
      <button onClick={handleSubmit}>Submit Profile</button>
    </div>
  );
}

export default InputForm;
