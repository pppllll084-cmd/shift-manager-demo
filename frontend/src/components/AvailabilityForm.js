function AvailabilityForm({ user }) {
  const API_URL = "https://shift-manager-backend.onrender.com"; // שנה לכתובת שלך
  const [availabilities, setAvailabilities] = useState([]);
  const [date, setDate] = useState("");
  const [available, setAvailable] = useState(false);

  const submitAvailability = async () => {
    await fetch(`${API_URL}/availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, date, available }),
    });
    fetchData();
  };

  const fetchData = async () => {
    const res = await fetch(`${API_URL}/availability?username=${user.username}&role=${user.role}`);
    const data = await res.json();
    setAvailabilities(data);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <h3>הזמינות שלך</h3>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label>
        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
        זמין ביום זה
      </label>
      <button onClick={submitAvailability}>שמור</button>

      <ul>
        {availabilities.map((a, i) => (
          <li key={i}>{a.username} - {a.date} : {a.available ? "✅" : "❌"}</li>
        ))}
      </ul>
    </div>
  );
}
