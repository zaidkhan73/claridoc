"use server";

import { generateSummaryFromGeminiAI } from "@/lib/geminiai";
import { ferchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "./format-utils";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

interface pdfSummary{
    userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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
      if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED of OpenAI'){
        try {
          console.log("1111111111111111111111111111111111111")
          summary = await generateSummaryFromGeminiAI(pdfText);
      console.log("summary : ", { summary });
        } catch (geminiError) {
          console.error("Gimini API Failed", geminiError)
          throw new Error('Failed to generate summary')
        }
        
      }
      
    }

    if (!summary) {
      return {
        success: "false",
        message: "Something went wrong while generating pdf",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName)

    return {
      success: true,
      message: "Summary generated succesfully",
      data: {
        title: formattedFileName,
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

export async function storePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummary) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "user not found",
      };
    }
    savedSummary = await savedPdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if(!savedSummary){
        return {
        success: false,
        message: "failed to save pdf summary, please try again",
      };
    }
    toast('huraayyyyyy')

    
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`)


  return{
        success: true,
        message: 'PDF summary saved successfully',
        data:{
          id:savedSummary.id,
        }
    }
}

async function savedPdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  try {
    const sql = await getDbConnection();
    const result = await sql`INSERT INTO pdf_summaries (
              user_id,
              original_file_url,
              summary_text,
              title,
              file_name
            )
            VALUES(
              ${userId},
              ${fileUrl},
              ${summary},
              ${title},
              ${fileName}

            );`;
            return result[0]
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
}