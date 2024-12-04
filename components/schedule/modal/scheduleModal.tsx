"use client";

import { useModalStore, useRangeStore } from "@/store";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { createSchedule } from "@/app/schedule/action";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function ScheduleModal() {
  const { scheduleModal, changeModalState } = useModalStore();
  const { range } = useRangeStore();

  const onCreateSchedule = async () => {
    await createSchedule(range?.from, range?.to);
    changeModalState("scheduleModal");
  };

  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  console.log(selectedHour);
  const hours = [...Array(24)].map((_, i) => i.toString().padStart(2, "0"));
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));

  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 32);
    setSelectedHour(hours[index] || "00");
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 32);
    setSelectedMinute(minutes[index] || "00");
  };

  return (
    <>
      <AnimatePresence>
        {scheduleModal && (
          <motion.div
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="z-10 flex flex-col items-center w-full h-full gap-3 px-4 py-4 mt-40 rounded-t-3xl bg-neutral-950"
          >
            <div className="flex justify-center w-full gap-9 ">
              <div
                onScroll={handleHourScroll}
                className="h-[80px] overflow-auto snap-y snap-mandatory"
              >
                <ul className="flex flex-col mb-[60px] first:mt-[30px] gap-3 ">
                  {hours.map((t, index) => (
                    <li
                      className={`snap-center h-[20px] ${
                        selectedHour === t ? "text-white" : "text-gray-500"
                      }`}
                      key={index}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-[80px] flex items-center justify-center">
                <span>:</span>
              </div>
              <div
                onScroll={handleMinuteScroll}
                className="h-[80px] overflow-auto snap-y snap-mandatory"
              >
                <ul className="flex flex-col mb-[60px] first:mt-[30px] gap-3">
                  {minutes.map((t, index) => (
                    <li
                      className={`snap-center h-[20px] ${
                        selectedMinute === t ? "text-white" : "text-gray-500"
                      }`}
                      key={index}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span>일정</span>
              <Input />
            </div>
            <div className="flex gap-2">
              <Button onClick={onCreateSchedule} className="w-36">
                확인
              </Button>
              <Button
                onClick={() => changeModalState("scheduleModal")}
                className="w-36"
              >
                취소
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
