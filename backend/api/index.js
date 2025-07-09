const express = require("express");
const cors = require("cors");
const connectToMongo = require("../db");

connectToMongo();
const app = express();

app.use(
  cors({
    origin: ["https://inotebook-ut9e.vercel.app", "http://localhost:3000"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

app.use("/api/auth", require("../routes/auth"));
app.use("/api/notes", require("../routes/notes"));

// Do not use app.listen() — Vercel handles this.
// Export the app for Vercel
module.exports = app;
