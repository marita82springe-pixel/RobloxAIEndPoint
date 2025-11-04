import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/ai", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    console.log("AI response:", data);

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.json({ reply: "⚠️ No response from AI." });
    }
  } catch (err) {
    console.error("AI request failed:", err);
    res.json({ reply: "⚠️ Server error, try again later." });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Roblox AI Endpoint is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

