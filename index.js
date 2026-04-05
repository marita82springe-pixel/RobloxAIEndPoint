const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("✅ Roblox AI Endpoint is running!");
});

app.post("/ai", async (req, res) => {
  const prompt = typeof req.body.prompt === "string" ? req.body.prompt.trim() : "";
  const userId = req.body.userId ?? "unknown";
  const conversationId = req.body.conversationId ?? "default";

  if (!prompt) {
    return res.status(400).json({ reply: "Please send a prompt." });
  }

  try {
    const response = await client.responses.create({
      model: "gpt-5.4",
      input: [
        {
          role: "system",
          content: "You are a helpful Roblox in-game AI assistant. Keep replies clear, friendly, and fairly short."
        },
        {
          role: "user",
          content: `User ${userId} in conversation ${conversationId} says: ${prompt}`
        }
      ]
    });

    const reply = response.output_text || "No response from AI.";
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error);

    const message =
      error?.status === 401 ? "OpenAI key is invalid or missing."
      : error?.status === 429 ? "OpenAI quota or rate limit reached."
      : "Server error connecting to AI.";

    res.status(500).json({ reply: message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Roblox AI Server running on port ${PORT}`);
});
