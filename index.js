const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/ai", (req, res) => {
  const prompt = req.body.prompt || "";
  const reply = `AI says: ${prompt}`;
  res.json({ reply });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running"));
