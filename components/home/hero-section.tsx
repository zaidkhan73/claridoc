import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { MotionDiv, MotionH1, MotionH2, MotionSection } from "../common/motion-wrapper";
import { buttonAnimation, containerVariants, itemVariants } from "@/utils/constants";

export default function HeroSection() {
  return (
    <MotionSection
    variants={containerVariants}
    animate='visible'
    initial="hidden"
    className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 lg:pt-24 transition-all animate-in lg:px-12 mx-w-7xl">

      
        <MotionDiv
        variants={itemVariants} 
        className="relativ p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant="secondary"
            className="relative px-6 py-2 text-base font-medium bg-background transition-colors duration-300 rounded-full group-hover:bg-background/70"
          >
            <Sparkles className=" h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">powered by ai</p>
          </Badge>
        </MotionDiv>
      
      <MotionH1 variants={itemVariants} className="font-bold py-6 text-center">
        Transform PDFs into concise summarise
      </MotionH1>
      <MotionH2 variants={itemVariants}className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds
      </MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonAnimation}>
        <Button
          variant={"link"}
          className="group relative overflow-hidden text-white mt-16 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 font-bold"
        >
          {/* Default gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-slate-900 to-rose-500 transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0" />

          {/* Hover gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-slate-900 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 text-white hover:no-underline" />

          {/* Button content */}
          
          <Link
            href="/upload"
            className="relative z-10 flex gap-2 items-center hover:no-underline"
          >
            <span>Try ClariDoc</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
