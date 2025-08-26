import { getDbConnection } from "./db";

export async function getSummaries(userId: string){
    const sql = await getDbConnection();
    const summaries = await sql`
  SELECT id, user_id, original_file_url, summary_text, status, title, file_name, 
         createdat AS "createdAt"
  FROM pdf_summaries 
  WHERE user_id = ${userId} 
  ORDER BY createdat DESC
`;
    console.log("DB se raw summaries: ", summaries)
    return summaries
}