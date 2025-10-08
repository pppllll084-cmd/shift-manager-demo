const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// סכמת משתמשים
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // "employee" או "manager"
});

// סכמת זמינות
const availabilitySchema = new mongoose.Schema({
  username: String,
  date: String,
  available: Boolean,
});

const User = mongoose.model("User", userSchema);
const Availability = mongoose.model("Availability", availabilitySchema);

// 🔹 רישום משתמשים (רק לפעם הראשונה)
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, password, role });
  await user.save();
  res.send("User registered");
});

// 🔹 התחברות
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).send("Invalid credentials");
  res.json({ username: user.username, role: user.role });
});

// 🔹 שמירת זמינות
app.post("/availability", async (req, res) => {
  const { username, date, available } = req.body;
  const existing = await Availability.findOne({ username, date });
  if (existing) {
    existing.available = available;
    await existing.save();
  } else {
    await new Availability({ username, date, available }).save();
  }
  res.send("Saved");
});

// 🔹 צפייה בזמינות
app.get("/availability", async (req, res) => {
  const { username, role } = req.query;

  if (role === "manager") {
    const all = await Availability.find();
    res.json(all);
  } else {
    const userData = await Availability.find({ username });
    res.json(userData);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
