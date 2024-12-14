"use client";

import { useRangeStore } from "@/store";
import { Schedule_Calendar } from "../ui/schedule_calendar";
import ScheduleCreateBtn from "./scheduleCreateBtn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
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
  const [scheduleList, setScheduleList] = useState(true);
  const onClickList = () => {
    setScheduleList((prev) => !prev);
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
      <div className="fixed bottom-0 left-0 w-full mb-20" onClick={onClickList}>
        <ChevronDownIcon className="w-10 rounded-full bg-neutral-500" />
      </div>
    </>
  );
}
