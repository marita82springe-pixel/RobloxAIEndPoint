const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("✅ Roblox AI Endpoint is running!");
});

// AI route
app.post("/ai", async (req, res) => {
  const prompt = req.body.prompt || "Hello!";

  try {
    // Call OpenAI Chat API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // change to "gpt-4" if you have access
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    // DEBUG: log full OpenAI response
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

    // Extract reply
    const aiReply = data.choices?.[0]?.message?.content || "No response from AI.";

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ reply: "Server error connecting to AI." });
  }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Roblox AI Server running on port ${PORT}`));
