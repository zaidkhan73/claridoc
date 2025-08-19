"use client";
import { useUploadThing } from "@/utils/uploadthing";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface uploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const UploadFormInput = forwardRef<
  HTMLFormElement,
  uploadFormInputProps
>(({ onSubmit, isLoading }, ref) => {
  return (
    <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          name="file"
          id="file"
          type="file"
          accept="application/pdf"
          required
          disabled={isLoading}
          className={cn(isLoading && "opacity-50 cursor-not-allowed")}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Upload your pdf"
          )}
        </Button>
      </div>
    </form>
  );
});

export default UploadFormInput;
