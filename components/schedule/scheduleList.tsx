"use client";

import { CalendarIcon, ClockIcon } from "@heroicons/react/16/solid";
import { ScheduleListProps } from "./schedule";
import { Button } from "../ui/button";
import React from "react";
import { deleteScheduleList } from "@/app/(main)/schedule/actions";
import { useScheduleStore } from "@/store";

export default function ScheduleList({
  scheduleLists,
  session,
}: ScheduleListProps) {
  const { day } = useScheduleStore();

  const filterList = scheduleLists.filter(
    (list) =>
      list.dayStart <= day && list.dayEnd >= day && list.userId === session.id!
  );

  const weeks = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const dayWeeks = new Date(day).getDay();

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const onDeleteList = (id: number) => {
    filterList.map(async (list) => {
      if (list.id === id && list.userId === session.id!) {
        await deleteScheduleList(id);
      }
    });
  };
  return (
    <div className="mb-32">
      <div className="flex flex-col">
        <span className="text-4xl">{day.substring(8)}</span>
        <span>{weeks[dayWeeks]}</span>
        <div className="mt-1 mb-4 border"></div>
      </div>
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
