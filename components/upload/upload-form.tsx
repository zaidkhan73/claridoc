"use client";
import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";

import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import { error } from "console";
import { generatePdfSummary } from "@/utils/generate-pdf";
import { id } from "zod/locales";
import { useRef, useState } from "react";
import { storePdfSummary } from "@/utils/generate-pdf";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a pdf"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      // Do something with the response
      console.log("Files: ", res);
      toast("Upload Completed");
    },
    onUploadError: (error: Error) => {
      // Do something with the error.
      toast(`ERROR! ${error}`);
    },
  });
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      
      setIsLoading(true);
      e.preventDefault();
      console.log("submitted");
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validating the fields
      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid File"
        );
        toast("invalid input");
        setIsLoading(false);
        return;
      }

      toast("processing pdf");
      const res = await startUpload([file]);
      if (!res) {
        toast.error("something went wrong");
        setIsLoading(false);
        return;
      }

      const result = await generatePdfSummary([res[0]]);
      console.log("resut:", { result });

      console.log("generatePdfSummary result:", result);


      const { data = null, message = null } = result || {};

      

      if (data) {
        let storeResult: any;
        toast("saving pdf...");
        
        if (data.summary) {
          storeResult = await storePdfSummary({
            summary: data.summary,
            fileUrl: res[0].serverData.fileUrl,
            title: data.title,
            fileName: file.name,
          });
          toast('summary stored in db')
          router.push(`/summaries/${storeResult.data.id}`)
        }
        
      }
      

      
    } catch (error) {
      setIsLoading(false);
      console.log("Error occured while submitting ", error);
      formRef.current?.reset();
    } finally{
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
