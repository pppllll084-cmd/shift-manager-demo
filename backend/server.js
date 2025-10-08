const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas
mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0.mongodb.net/shift_manager?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Schemas
const userSchema = new mongoose.Schema({
  username: String,
  role: { type: String, enum: ["employee", "manager"], default: "employee" }
});
const User = mongoose.model("User", userSchema);

const availabilitySchema = new mongoose.Schema({
  employee: String,
  day: String,
  hours: [String]
});
const Availability = mongoose.model("Availability", availabilitySchema);

// Seed users for demo
const usersDemo = [
  { username: "shalev", role: "employee" },
  { username: "ariel", role: "employee" },
  { username: "ori", role: "employee" },
  { username: "roaa", role: "employee" },
  { username: "manager", role: "manager" }
];

usersDemo.forEach(async (u) => {
  const exists = await User.findOne({ username: u.username });
  if (!exists) await new User(u).save();
});

// Routes
app.get("/availability/:requester/:role", async (req, res) => {
  const { requester, role } = req.params;
  if (role === "manager") {
    const data = await Availability.find();
    res.json(data);
  } else {
    const data = await Availability.find({ employee: requester });
    res.json(data);
  }
});

app.post("/availability", async (req, res) => {
  const { employee, day, hours } = req.body;
  const entry = new Availability({ employee, day, hours });
  await entry.save();
  res.json({ status: "ok" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
