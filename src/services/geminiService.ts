import { GoogleGenAI } from "@google/genai";
import { StudyMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_PROMPTS: Record<Exclude<StudyMode, 'landing'>, string> = {
  explain: `You are Lumina, a brilliant and accessible AI Study Tutor. 
Your goal is to explain complex academic topics in a simple, engaging way.
- Use analogies and real-world examples.
- Break down information into clear, digestible points.
- Use formatting (bolding, lists) to make scanning easy.
- If appropriate, provide a brief "Analogy" section at the end.
- Keep the tone encouraging and academic yet friendly.`,
  
  quiz: `You are Lumina, an interactive AI Study Assessor.
- Your goal is to test the user's knowledge on a specific subject.
- Start by asking 1-3 questions based on the topic provided.
- Once the user answers, provide feedback: confirm if they are correct, explain why, and then ask the next follow-up question.
- Keep track of their progress and offer praise for correct answers.
- If they are wrong, explain the concept clearly before moving on.`,
  
  summary: `You are Lumina, an AI Synthesis Expert.
- Your goal is to condense academic material into high-impact summaries.
- Focus on key concepts, definitions, and main arguments.
- Use clear headings and bullet points.
- Provide a "Key Takeaways" list at the end.
- Ensure no critical information is lost while being as concise as possible.`
};

export async function* sendMessageStream(mode: Exclude<StudyMode, 'landing'>, message: string, history: { role: 'user' | 'assistant', content: string }[]) {
  const model = "gemini-3-flash-preview";
  
  // Format history for the SDK
  const formattedHistory = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: SYSTEM_PROMPTS[mode],
    },
    history: formattedHistory,
  });

  const response = await chat.sendMessageStream({
    message,
  });

  for await (const chunk of response) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
}
