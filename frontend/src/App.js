import React, { useState } from "react";
import Login from "./components/Login";
import { AvailabilityForm } from './components/AvailabilityForm';

function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <h1>מערכת ניהול משמרות</h1>
      <h2>שלום {user.username} ({user.role})</h2>
      <AvailabilityForm user={user} />
    </div>
  );
}

export default App;
