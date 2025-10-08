import React, { useState } from "react";

const API_URL = "http://127.0.0.1:5000"; // החלף כאן ל-Render כשמעלים לשרת

function AvailabilityForm({ availabilityData, setAvailabilityData }) {
  const [employee, setEmployee] = useState("shalev");
  const [status, setStatus] = useState("available");

  const handleSubmit = () => {
    const existingIndex = availabilityData.findIndex(e => e.employee === employee);
    let newData = [...availabilityData];

    if (existingIndex >= 0) {
      newData[existingIndex].status = status;
    } else {
      newData.push({ employee, status });
    }

    setAvailabilityData(newData);

    fetch(`${API_URL}/availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employee, status })
    })
      .then(res => res.json())
      .then(data => console.log("Server response:", data))
      .catch(err => console.log("שגיאה בשרת:", err));
  };

  return (
    <div>
      <h2>הזן זמינות</h2>
      <label>שם עובד: </label>
      <select value={employee} onChange={e => setEmployee(e.target.value)}>
        <option value="shalev">Shalev</option>
        <option value="ariel">Ariel</option>
        <option value="ori">Ori</option>
        <option value="roaa">Roaa</option>
      </select>
      <br />
      <label>זמין? </label>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="available">זמין</option>
        <option value="unavailable">לא זמין</option>
      </select>
      <br />
      <button onClick={handleSubmit}>שלח זמינות</button>
    </div>
  );
}

export default AvailabilityForm;
