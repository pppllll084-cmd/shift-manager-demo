import React from "react";

function AvailabilityList({ availabilityData }) {
  return (
    <div>
      <h2>זמינות עובדים</h2>
      {availabilityData.map(item => (
        <div key={item.employee} style={{ padding: "5px", borderBottom: "1px solid #ccc" }}>
          {item.employee}: {item.status === "available" ? "זמין" : "לא זמין"}
        </div>
      ))}
    </div>
  );
}

export default AvailabilityList;
