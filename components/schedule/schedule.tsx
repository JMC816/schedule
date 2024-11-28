"use client";

import { useState } from "react";
import { Schedule_Calendar } from "../ui/schedule_calendar";
import { DateRange } from "react-day-picker";
import ScheduleList from "./scheduleList";

export default function Schedule_Box() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <>
      <Schedule_Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="flex mb-2 ml-6 mr-6 justify-center mt-[85px]  "
      />
      <ScheduleList range={range} />
    </>
  );
}
