"use client";

import { useModalStore, useRangeStore, useScheduleStore } from "@/store";
import { Schedule_Calendar } from "../ui/schedule_calendar";
import ScheduleCreateBtn from "./scheduleCreateBtn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import ScheduleList from "./scheduleList";

export interface ScheduleListProps {
  scheduleLists: {
    id: number;
    timeStart: string;
    timeEnd: string;
    dayStart: string;
    dayEnd: string;
    text: string;
  }[];
}

export default function Schedule_Box({ scheduleLists }: ScheduleListProps) {
  const { range, setRange } = useRangeStore();
  const { changeModalState } = useModalStore();
  const { day } = useScheduleStore();
  const [scheduleList, setScheduleList] = useState(true);

  const filterDayList = scheduleLists.filter(
    (list) => list.dayStart <= day && list.dayEnd >= day
  );

  const onClickList = () => {
    setScheduleList((prev) => !prev);
  };
  const onPopupClick = () => {
    if (!range?.from || !range?.to) {
      changeModalState("schedulePopup");
    } else {
      changeModalState("scheduleModal");
    }
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {scheduleList && (
          <div className="h-[100vh] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 1000 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Schedule_Calendar
                scheduleLists={scheduleLists}
                mode="range"
                selected={range}
                onSelect={setRange}
                className="flex mb-2 ml-6 mr-6 justify-center mt-[85px]"
              />
              <ScheduleCreateBtn />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {scheduleList || (
        <div className="mt-20 mb-20 ml-7 mr-7">
          <ScheduleList scheduleLists={scheduleLists} />
        </div>
      )}
      <div
        className="fixed bottom-0 w-12 mb-20 rounded-full left-5 W-12 bg-neutral-500"
        onClick={onClickList}
      >
        {scheduleList ? <ChevronDownIcon /> : <ChevronUpIcon />}
        {filterDayList.length != 0 ? (
          <div className="absolute flex items-center justify-center rounded-full bg-sky-500 w-7 h-7 bottom-8 left-8">
            <span>{filterDayList.length}</span>
          </div>
        ) : null}
      </div>
      <div
        onClick={onPopupClick}
        className="fixed bottom-0 w-12 mb-20 rounded-full right-5 bg-neutral-500"
      >
        <PlusIcon />
      </div>
    </>
  );
}
