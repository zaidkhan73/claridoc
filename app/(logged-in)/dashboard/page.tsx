import BgGradient from "@/components/common/bg-gradient";
import SummaryCard from "@/components/dashboard/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus, Upload } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import EmptyState from "@/components/dashboard/empty-summary-state";
import { MotionH1, MotionP } from "@/components/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }

  const uploadLimit = 5;
  const summaries = await getSummaries(userId);
  //console.log("summariesss: ", summaries);
  //console.log(Object.keys(summaries[0]));
  return (
    <main className="min-h-screen ">
      <BgGradient className="bg-background" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between items-center">
            <div className="flex flex-col gap-6">
              <MotionH1 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl font-bold tracking-tight bg-linear-to-r from-rose-900 to-rose-400 bg-clip-text text-transparent">
                Your Summaries
              </MotionH1>
              <MotionP 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-gray-600">
                Transform your PDFs into concise, actionable insights
              </MotionP>
            </div>
            <Button
              variant={"link"}
              className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800
             transition-all duration-300 ease-in-out no-underline hover:no-underline hover:scale-105 group"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          {summaries.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
