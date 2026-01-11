import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/career", async (req, res) => {
  try {
    // UPDATED: Used v1 endpoint and gemini-2.5-flash model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: req.body.prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini Error Detail:", JSON.stringify(data, null, 2));
      return res.status(response.status).json(data);
    }

    res.json({
      text:
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated",
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});