import React, { useState, useEffect } from "react";
import AvailabilityForm from "./components/AvailabilityForm";
import AvailabilityList from "./components/AvailabilityList";

function App() {
  const [availabilityData, setAvailabilityData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/availability") // או כאן כתובת Render
      .then(res => res.json())
      .then(data => setAvailabilityData(data))
      .catch(err => console.log("שגיאה בשרת:", err));
  }, []);

  return (
    <div style={{ padding: "20px", direction: "rtl", fontFamily: "Arial" }}>
      <h1>Shift Manager Demo</h1>
      <AvailabilityForm availabilityData={availabilityData} setAvailabilityData={setAvailabilityData} />
      <AvailabilityList availabilityData={availabilityData} />
    </div>
  );
}

export default App;
