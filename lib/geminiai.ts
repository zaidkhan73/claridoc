import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function generateSummaryFromGeminiAI(pdfText: string) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // 🚀 Directly pass string instead of role/parts
    const response = await model.generateContent(
      `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
    );

    // ✅ Extract text
    const output = response.response.text();
    return output;
  } catch (error: any) {
    console.error("Gemini error:", error.message);
    throw new Error("Gemini AI summarization failed");
  }
}
