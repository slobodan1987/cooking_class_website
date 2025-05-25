import express from "express";
import cors from "cors";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    date TEXT
  )`);
})();

app.get("/api/bookings", async (req, res) => {
  const bookings = await db.all("SELECT * FROM bookings");
  res.json(bookings);
});

app.post("/api/bookings", async (req, res) => {
  const { name, date } = req.body;
  const result = await db.run(
    "INSERT INTO bookings (name, date) VALUES (?, ?)",
    [name, date]
  );
  res.json({ id: result.lastID, name, date });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
