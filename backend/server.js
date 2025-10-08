const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// שמירת זמינות בעזרת משתנה בזיכרון
let availabilityData = [];

// נתיב לשליחת זמינות
app.post("/availability", (req, res) => {
  const { employee, status } = req.body;
  const existingIndex = availabilityData.findIndex(e => e.employee === employee);

  if (existingIndex >= 0) {
    availabilityData[existingIndex].status = status;
  } else {
    availabilityData.push({ employee, status });
  }

  res.json({ success: true, data: availabilityData });
});

// נתיב לשליפת זמינות
app.get("/availability", (req, res) => {
  res.json(availabilityData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
