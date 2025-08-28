// components/summary-viewer/loading-skeleton.tsx
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton"; // Assuming shadcn Skeleton is in ui/skeleton

export default function LoadingSkeleton() {
  return (
    <Card
      className="relative px-2 h-[500px] sm:h-[600px] lg:h-[620px] w-full xl:w-[600px] overflow-hidden  backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10
    "
    >
      {/* Progress Bar Skeleton */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-400 to-purple-500/80 rounded-t-3xl overflow-hidden">
        {/* Changed background to be more subtle */}
        <Skeleton className="h-full w-full bg-rose-200/50 dark:bg-rose-800/50 animate-pulse" />
      </div>

      <div className="h-full overflow-y-auto scrollbar-hidden pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          {/* Section Title Skeleton */}
          <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-transparent backdrop-blur-sm">
            {/* Changed background to be more subtle */}
            <Skeleton className="h-10 w-3/4 mx-auto rounded-md bg-rose-200/50 dark:bg-rose-800/50" />
          </div>

          {/* Content Section Skeleton */}
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                {/* Changed background to be more subtle */}
                <Skeleton className="h-4 w-4 rounded-full bg-rose-200/50 dark:bg-rose-800/50" />{" "}
                {/* Icon/bullet */}
                {/* Changed background to be more subtle */}
                <Skeleton className="h-4 w-5/6 rounded-md bg-rose-200/50 dark:bg-rose-800/50" />{" "}
                {/* Point text */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 bg-gradient-to-t from-background via-background/90 to-transparent">
        {/* Changed background to be more subtle */}
        <Skeleton className="h-10 w-24 rounded-full bg-rose-200/50 dark:bg-rose-800/50" />{" "}
        {/* Previous Button */}
        <div className="flex gap-2 sm:gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            // Changed background to be more subtle
            <Skeleton
              key={i}
              className="h-2 w-2 rounded-full bg-rose-200/50 dark:bg-rose-800/50"
            />
          ))}
          {/* Highlighted dot - slightly different shade for distinction */}
          <Skeleton className="h-2 w-4 rounded-full bg-rose-300/60 dark:bg-rose-700/60" />{" "}
          {Array.from({ length: 3 }).map((_, i) => (
            // Changed background to be more subtle
            <Skeleton
              key={i}
              className="h-2 w-2 rounded-full bg-rose-200/50 dark:bg-rose-800/50"
            />
          ))}
        </div>
        {/* Changed background to be more subtle */}
        <Skeleton className="h-10 w-24 rounded-full bg-rose-200/50 dark:bg-rose-800/50" />{" "}
        {/* Next Button */}
      </div>
    </Card>
  );
}