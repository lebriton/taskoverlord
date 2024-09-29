import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const days = [
  { day: 1, weekday: "Mon", count: 1 },
  { day: 2, weekday: "Tue", count: 0 },
  { day: 3, weekday: "Wed", count: 4 },
  { day: 4, weekday: "Thu", count: 0 },
  { day: 5, weekday: "Fri", count: 2 },
  { day: 6, weekday: "Sat", count: 0 },
  { day: 7, weekday: "Sun", count: 1 },
  { day: 8, weekday: "Mon", count: 1 },
  { day: 9, weekday: "Tue", count: 0 },
  { day: 10, weekday: "Wed", count: 0 },
];

export default function CalendarStripe() {
  return (
    <div className="flex items-center gap-3 px-6 pb-3 pt-1.5 shadow">
      <TooltipWrapper content={<p>Scroll left</p>}>
        <Button className="shrink-0 rounded-full" variant="secondary" size="icon">
          <ChevronLeftIcon className="size-6" />
        </Button>
      </TooltipWrapper>

      <ScrollArea className="[mask-image:_linear-gradient(to_right,transparent_0,_black_16px,_black_calc(100%-16px),transparent_100%)]">
        <div className="flex gap-0.5">
          {days.map((day, index) => {
            const isToday = day.day === 5; // TODO:

            return (
              <div
                key={index}
                className={cn(
                  "flex h-16 w-28 flex-col items-center justify-start border-t-8 bg-muted p-1.5 text-muted-foreground",
                  "data-[active=true]:border-yellow-300 data-[active=true]:bg-yellow-100 data-[active=true]:text-yellow-900",
                )}
                data-active={isToday}
              >
                {isToday ? (
                  <span className="text-sm font-medium">Today</span>
                ) : (
                  <span className="text-sm">
                    {day.weekday} {day.day}
                  </span>
                )}

                {day.count > 0 && <span className="text-xl font-semibold">{day.count}</span>}
              </div>
            );
          })}
        </div>

        {/* <ScrollBar orientation="horizontal" /> */}
      </ScrollArea>

      <TooltipWrapper content={<p>Scroll right</p>}>
        <Button className="shrink-0 rounded-full" variant="secondary" size="icon">
          <ChevronRightIcon className="size-6" />
        </Button>
      </TooltipWrapper>
    </div>
  );
}
