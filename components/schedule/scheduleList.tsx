"use client";

import { CalendarIcon, ClockIcon } from "@heroicons/react/16/solid";
import { ScheduleListProps } from "./schedule";
import { Button } from "../ui/button";
import React from "react";
import { deleteScheduleList } from "@/app/schedule/actions";
import { useScheduleStore } from "@/store";

export default function ScheduleList({ scheduleLists }: ScheduleListProps) {
  const { day } = useScheduleStore();

  const filterList = scheduleLists.filter(
    (list) => list.dayStart <= day && list.dayEnd >= day
  );

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const onDeleteList = (id: number) => {
    filterList.map(async (list) => {
      if (list.id == id) {
        await deleteScheduleList(id);
      }
    });
  };
  return (
    <div>
      {filterList.map((list) => (
        <div
          className="flex gap-3 mb-3 rounded-sm bg-neutral-700"
          key={list.id}
        >
          <div
            className="w-2 rounded-s-sm"
            style={{ backgroundColor: getRandomColor() }}
          />
          <div className="flex flex-col w-full gap-3 p-2">
            <span>{list.text}</span>
            <div className="text-xs">
              <span className="flex items-center gap-2 text-gray-500">
                <CalendarIcon className="w-5" />
                {list.dayStart + " - " + list.dayEnd}
              </span>
              <div className="flex justify-between w-full">
                <span className="flex items-center gap-2 text-gray-500">
                  <ClockIcon className="w-5" />
                  {list.timeStart.slice(0, 2) +
                    ":" +
                    list.timeStart.slice(2)} -{" "}
                  {list.timeEnd.slice(0, 2) + ":" + list.timeEnd.slice(2)}
                </span>
                <Button onClick={() => onDeleteList(list.id)}>삭제</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
