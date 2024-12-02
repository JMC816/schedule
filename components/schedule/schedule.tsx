"use client";

import { useRangeStore } from "@/store";
import { Schedule_Calendar } from "../ui/schedule_calendar";
import ScheduleList from "./scheduleList";

export default function Schedule_Box() {
  const { range, setRange } = useRangeStore();

  return (
    <>
      <Schedule_Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="flex mb-2 ml-6 mr-6 justify-center mt-[85px]  "
      />
      <ScheduleList />
    </>
  );
}
