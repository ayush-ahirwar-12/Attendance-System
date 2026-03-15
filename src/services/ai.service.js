import { ChatGroq } from "@langchain/groq";
import Groq from "groq-sdk";
import dotenv from "dotenv"
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

export const analyzeResume = async (resumeText) => {
    const prompt = `Analyze the following resume and return ONLY JSON.

    Return ONLY valid JSON.
Do not wrap in markdown.

    Format:

    {
        "score": number,
            "skills": [],
                "missingSkills": [],
                    "suggestions": []
    }

    Resume:${resumeText}
    `;

    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{
            role: "user",
            content: prompt,
        }],
        temperature: 0.3

    })
    return completion.choices[0].message.content;
}

// module.exports={analyzeResume}

