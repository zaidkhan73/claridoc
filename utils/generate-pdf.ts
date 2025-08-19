"use server";

import { generateSummaryFromGeminiAI } from "@/lib/geminiai";
import { ferchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { success } from "zod";

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        fileUrl: string;
      };
      name: string;
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: "false",
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: { userId, fileUrl: pdfUrl },
    name: fileName,
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: "false",
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await ferchAndExtractPdfText(pdfUrl);
    console.log(pdfText);

    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("summary : ", { summary });
    } catch (error) {
      console.log(error);
      if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
        try {
          
        } catch (geminiError) {
          console.error("Gimini API Failed", geminiError)
        }
        throw new Error('Failed to generate summary')
      }
      summary = await generateSummaryFromGeminiAI(pdfText);
    }

    if (!summary) {
      return {
        success: "false",
        message: "Something went wrong while generating pdf",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated succesfully",
      data: {
        summary,
      },
    };
  } catch (error) {
    return {
      success: "false",
      message: "text extraction failed",
      data: null,
    };
  }
}
