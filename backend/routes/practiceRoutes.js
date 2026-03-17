import express from "express";
import { generateLLMResponse } from "../config/openrouter.js";

const router = express.Router();

router.post("/generate", async (req, res) => {

  try {

    const { topic } = req.body;

    const prompt = `
Generate 10 interview questions about ${topic}.
Return ONLY a JSON array.
Example:
["Question1","Question2"]
`;

    const result = await generateLLMResponse([
      {
        role: "user",
        content: prompt
      }
    ]);

    const questions = JSON.parse(result);

    res.json({ questions });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Failed to generate questions" });

  }

});

export default router;