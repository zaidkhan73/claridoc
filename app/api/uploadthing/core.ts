import { auth } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      //console.log("🚀 Reached middleware");
      //console.log(auth())
      // pass request into clerk auth
      const { userId } = await auth();
      console.log("👉 Clerk auth result:", userId);

      if (!userId) throw new UploadThingError("Unauthorized");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Upload completed for user:", metadata.userId);
      console.log("📂 File URL:", file.ufsUrl);

      return { userId: metadata.userId, fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
