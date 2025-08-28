import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { MotionDiv } from "../common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

export default function UploadHeader(){
    return(
         <div className="flex flex-col items-center justify-center gap-6 text-center">
          <MotionDiv variants={itemVariants} className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
            <Badge
              variant={"secondary"}
              className="relative px-6 py-2 text-base font-medium bg-background rounded-full hover:bg-secondary-foreground hover:text-background    transition-colors"
            >
              <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
              <span className="text-base">AI Powered Content Creation</span>
            </Badge>
          </MotionDiv>
          <MotionDiv variants={itemVariants} className="capitalize text-3xl font-bold tracking-tight text-popover-foreground sm:text-4xl">
            <h1>Start Uploading Your PDF's</h1>
          </MotionDiv>
          <MotionDiv variants={itemVariants} className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
            <p>Upload your PDF and let our AI do the magic !✨</p>
          </MotionDiv>
        </div>
    )
}