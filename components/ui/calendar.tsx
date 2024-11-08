"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { createToDo } from "@/app/actions";
import useStore from "@/store";
import { ToDosProps } from "../todoList";

type MyTodosProps = Pick<ToDosProps, "completedTodos">;

export type CalendarProps = React.ComponentProps<typeof DayPicker> &
  MyTodosProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  completedTodos,
  ...props
}: CalendarProps) {
  const setDate = useStore((state) => state.setDate);

  const onClickDay = (day: Date) => {
    const newDate = day.toLocaleDateString();
    createToDo(newDate.replace(/\./g, "").split(" ").join(""));
    setDate(newDate.replace(/\./g, "").split(" ").join(""));
  };

  const individualDate = completedTodos.reduce<Record<string, number>>(
    (acc, todo) => {
      const year = String(todo.toDoId).slice(0, 4);
      const month = String(todo.toDoId).slice(4, 6).padStart(2, "0");
      const day = String(todo.toDoId).slice(6, 8).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <DayPicker
      modifiers={{
        own: (date) => {
          const dateKey = date.toLocaleDateString("en-CA");
          return individualDate[dateKey] == 1;
        },
        two: (date) => {
          const dateKey = date.toLocaleDateString("en-CA");
          return individualDate[dateKey] == 2;
        },
        three: (date) => {
          const dateKey = date.toLocaleDateString("en-CA");
          return individualDate[dateKey] == 3;
        },
        four: (date) => {
          const dateKey = date.toLocaleDateString("en-CA");
          return individualDate[dateKey] == 4;
        },
        five: (date) => {
          const dateKey = date.toLocaleDateString("en-CA");
          return individualDate[dateKey] == 5;
        },
        six: (date) => {
          const dateKey = date.toLocaleDateString("en-CA");
          return individualDate[dateKey] >= 6;
        },
      }}
      modifiersClassNames={{
        own: "bg-green-100",
        two: "bg-green-300",
        three: "bg-green-500",
        four: "bg-green-700",
        five: "bg-green-900",
        six: "bg-green-950",
      }}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-col justify-center sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
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
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
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
      }}
      {...props}
      onDayClick={onClickDay}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
