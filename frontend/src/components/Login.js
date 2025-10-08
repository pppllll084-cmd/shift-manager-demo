import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = "https://shift-manager-demo.onrender.com"; // שנה ל-URL שלך

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      onLogin(data);
    } else {
      alert("שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <div className="login-container">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="שם משתמש" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="סיסמה" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">התחבר</button>
      </form>
    </div>
  );
}

export default Login;
