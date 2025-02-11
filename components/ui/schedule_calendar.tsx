import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScheduleListProps } from "../schedule/schedule";
import { formatDate } from "@/utils/format";
import { useScheduleStore } from "@/store";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type ScheduleProps = CalendarProps & ScheduleListProps;

function Schedule_Calendar({
  className,
  classNames,
  showOutsideDays = true,
  scheduleLists,
  session,
  ...props
}: ScheduleProps) {
  const { setDay } = useScheduleStore();

  const onDayClick = (day: Date) => {
    setDay(formatDate(day));
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months:
          "flex flex-col justify-center sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-10 w-10 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-around",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2 justify-around",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-12 w-12 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="w-4 h-4" />,
        IconRight: () => <ChevronRightIcon className="w-4 h-4" />,
        DayContent: ({ date }) => (
          <div className="relative flex flex-col items-center justify-center">
            <span>{date.getDate()}</span>
            {scheduleLists.map((list) => (
              <div
                key={list.id}
                className="absolute flex justify-center h-2 top-6"
              >
                {list.dayStart <= formatDate(date) &&
                list.dayEnd >= formatDate(date) &&
                list.userId === session.id! ? (
                  <div className="w-2 h-2 rounded-full bg-sky-500" />
                ) : null}
              </div>
            ))}
          </div>
        ),
      }}
      {...props}
      onDayClick={onDayClick}
    />
  );
}
Schedule_Calendar.displayName = "Calendar";

export { Schedule_Calendar };
