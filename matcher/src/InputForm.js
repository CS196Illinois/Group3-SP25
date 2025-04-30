import React, { useState } from "react";
import Papa from "papaparse";

function InputForm({ onAddStudent }) {
    const [student, setStudent] = useState({
      name: "",
      email: "",
      major: "",
      year: "",
      studyStyle: "",
    });
  
    const handleChange = (e) => {
      setStudent({ ...student, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      if (onAddStudent) onAddStudent(student); // Add to table
      const csv = Papa.unparse([student]);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "student_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <div>
        <h2>Student Info Form</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="text" name="major" placeholder="Major" onChange={handleChange} />
        <input type="text" name="year" placeholder="Year" onChange={handleChange} />
        <input type="text" name="studyStyle" placeholder="Study Style" onChange={handleChange} />
        <br />
        <button onClick={handleSubmit}>Submit and Download CSV</button>
      </div>
    );
  }  

export default InputForm;