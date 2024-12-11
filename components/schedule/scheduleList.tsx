"use client";

import { ScheduleListProps } from "./schedule";

export default function ScheduleList({ scheduleLists }: ScheduleListProps) {
  return (
    <div>
      {scheduleLists.map((list) => (
        <>
          <div key={list.id}>
            <span>{list.text}</span>
            <span>{list.timeStart}</span>
            <span>{list.timeEnd}</span>
          </div>
        </>
      ))}
    </div>
  );
}
