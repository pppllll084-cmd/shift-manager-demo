import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("employee");
  const [loggedIn, setLoggedIn] = useState(false);
  const [availability, setAvailability] = useState([]);

  const backendURL = "https://YOUR_RENDER_BACKEND_URL"; // החלף עם ה-URL שלך

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`${backendURL}/availability/${username}/${role}`)
        .then(res => setAvailability(res.data));
    }
  }, [loggedIn, username, role]);

  const handleSubmit = () => setLoggedIn(true);

  const handleSave = () => {
    const payload = { employee: username, day: "Monday", hours: ["9-12"] };
    axios.post(`${backendURL}/availability`, payload)
      .then(() => alert("Saved"));
  };

  if (!loggedIn) {
    return (
      <div>
        <h2>Login</h2>
        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <select onChange={e => setRole(e.target.value)} value={role}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button onClick={handleSubmit}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {username} ({role})</h2>
      <pre>{JSON.stringify(availability, null, 2)}</pre>
      <button onClick={handleSave}>Save Demo Availability</button>
    </div>
  );
}

export default App;
