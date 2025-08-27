import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function NavigationControls({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}: {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSectionSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-background/80 backdrop-blur-xs border-t border-rose-500/10">
      <div className="grid grid-cols-3 items-center">
        {/* Previous Button */}
        <div className="flex justify-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={currentSection === 0}
            className={cn(
              "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 bg-gradient-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10",
              currentSection === 0 ? "opacity-50" : "hover:opacity-80"
            )}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </Button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionSelect(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSection === index
                  ? "bg-gradient-to-r from-rose-500 to-rose-600"
                  : "bg-rose-500/20 hover:bg-rose-500/40"
              )}
            />
          ))}
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={currentSection === totalSections - 1}
            className={cn(
              "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 bg-gradient-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10",
              currentSection === totalSections - 1 ? "opacity-50" : "hover:opacity-80"
            )}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
