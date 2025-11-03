const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const app = express();

app.use(cors());
app.use(express.json());

// Load API key from environment variable
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Browser check
app.get("/", (req, res) => {
  res.send("✅ Roblox AI Server is running!");
});

// AI endpoint
app.post("/ai", async (req, res) => {
  const prompt = req.body.prompt || "";
  console.log("Received prompt:", prompt); // debug log

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error: Could not get AI response." });
  }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
