import { ActionBar } from "../custom/action-bar";
import { ScrollArea } from "../ui/scroll-area";
import { addDays, format, isToday, isWeekend } from "date-fns";
import { CalendarCheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const tabs = [
  {
    label: "October 2024",
    value: "calendar",
  },
];

const actions = [
  {
    Icon: CalendarCheckIcon,
    tooltip: "Today",
    onClick: () => null,
  },
  {
    Icon: ChevronLeftIcon,
    tooltip: "Scroll left",
    onClick: () => null,
  },
  {
    Icon: ChevronRightIcon,
    tooltip: "Scroll right",
    onClick: () => null,
  },
];

interface DotsProps {
  count: number;
}

interface PastDueComponentProps {
  count: number;
}

interface DayProps {
  day: Date;
  count?: number;
}

function Dots({ count }: DotsProps) {
  return (
    <div
      className="grid h-[11px] place-items-end gap-px"
      style={{
        gridTemplateColumns: `repeat(${Math.min(count, 5)}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: Math.min(count, 10) }).map((_, index) => (
        <div key={index} className="size-1 rounded-full bg-foreground group-data-[today=true]:bg-amber-600" />
      ))}
    </div>
  );
}

function PastDueComponent({ count }: PastDueComponentProps) {
  return (
    <div className="flex w-[91px] flex-col items-center justify-between py-[17px] text-muted-foreground">
      <span className="text-center text-[0.8rem] uppercase leading-none">Past due</span>

      <Dots count={count} />
    </div>
  );
}

function Day({ day, count = 0 }: DayProps) {
  return (
    <button
      className="group p-1 text-muted-foreground data-[weekend=true]:bg-muted data-[weekend=true]:text-muted-foreground/50"
      type="button"
      data-today={isToday(day)}
      data-weekend={isWeekend(day)}
    >
      <div className="flex w-16 flex-col items-center gap-1 rounded-sm border-2 border-transparent py-2 hover:!border-primary hover:bg-background hover:text-primary group-data-[today=true]:border-amber-300 group-data-[today=true]:bg-amber-50 group-data-[today=true]:text-amber-600">
        <span className="text-[0.8rem] uppercase leading-none group-data-[today=true]:underline">
          {format(day, "EEE")}
        </span>
        <span className="mb-1 text-xl font-extrabold leading-none">{format(day, "d")}</span>

        <Dots count={count} />
      </div>
    </button>
  );
}

export default function CalendarStripe() {
  const today = new Date();
  const days = [];
  for (let i = 0; i <= 14; i++) {
    days.push(addDays(today, i));
  }

  return (
    <div className="bg-muted/20">
      <ActionBar tabs={tabs} actions={actions} />

      <ScrollArea className="border">
        <div className="flex divide-x">
          <PastDueComponent count={10} />
          {days.map((day, index) => (
            <Day key={index} day={day} count={7} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
