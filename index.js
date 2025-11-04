import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Roblox AI Endpoint is running!");
});

app.post("/ai", async (req, res) => {
  const prompt = req.body.prompt || "Hello there!";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "No response from AI.";

    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error connecting to AI." });
  }
});

app.listen(10000, () => console.log("✅ Roblox AI Server running on port 10000"));
