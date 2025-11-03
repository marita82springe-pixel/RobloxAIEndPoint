import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("✅ Roblox AI Server is running!");
});

app.post("/ai", async (req, res) => {
  const prompt = req.body.prompt || "";
  console.log("Received prompt:", prompt);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    });

    const reply = completion.choices[0].message.content;
    console.log("GPT reply:", reply);
    res.json({ reply });
  } catch (error) {
    console.error("Error calling GPT:", error);
    res.status(500).json({ reply: "Error: Could not get AI response." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

