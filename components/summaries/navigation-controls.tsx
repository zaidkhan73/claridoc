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
      <div className="flex justify-between items-center max-w-full">
        {/* Previous Button */}
        <div className="flex justify-start flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={currentSection === 0}
            className={cn(
              "flex-shrink-0 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 bg-gradient-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10 touch-manipulation",
              currentSection === 0 ? "opacity-50" : "hover:opacity-80 active:scale-95"
            )}
            aria-label="Previous section"
          >
            <ChevronLeft className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
          </Button>
        </div>

        {/* Dots Container with Scrolling for Many Sections */}
        <div className="flex-1 flex justify-center mx-2 xs:mx-3 sm:mx-4 overflow-hidden">
          <div 
            className={cn(
              "flex gap-1 xs:gap-1.5 sm:gap-2 items-center",
              totalSections > 8 && "overflow-x-auto scrollbar-hide max-w-full px-1"
            )}
            style={{
              scrollSnapType: totalSections > 8 ? "x mandatory" : undefined,
            }}
          >
            {Array.from({ length: totalSections }).map((_, index) => (
              <button
                key={index}
                onClick={() => onSectionSelect(index)}
                className={cn(
                  "flex-shrink-0 transition-all duration-300 touch-manipulation rounded-full",
                  "w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5",
                  "active:scale-125 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-1",
                  currentSection === index
                    ? "bg-gradient-to-r from-rose-500 to-rose-600 scale-110"
                    : "bg-rose-500/20 hover:bg-rose-500/40"
                )}
                style={{
                  scrollSnapAlign: totalSections > 8 ? "center" : undefined,
                }}
                aria-label={`Go to section ${index + 1}`}
                aria-current={currentSection === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={currentSection === totalSections - 1}
            className={cn(
              "flex-shrink-0 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 bg-gradient-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10 touch-manipulation",
              currentSection === totalSections - 1 ? "opacity-50" : "hover:opacity-80 active:scale-95"
            )}
            aria-label="Next section"
          >
            <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}