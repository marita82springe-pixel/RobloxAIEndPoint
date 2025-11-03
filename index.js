const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Browser check route (so you don’t see a blank page)
app.get("/", (req, res) => {
  res.send("✅ Roblox AI Server is running on Render!");
});

// ✅ AI endpoint for Roblox
app.post("/ai", (req, res) => {
  const prompt = req.body.prompt || "";
  console.log("Received prompt:", prompt);

  // You can replace this with actual AI logic later
  const reply = `AI says: ${prompt}`;
  res.json({ reply });
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
