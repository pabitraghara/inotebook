const express = require("express");
const cors = require("cors");
const connectToMongo = require("../db");

connectToMongo();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

app.use("/api/auth", require("../routes/auth"));
app.use("/api/notes", require("../routes/notes"));

// ⛔ Don't call app.listen()
// ✅ Instead, export the app
module.exports = app;
