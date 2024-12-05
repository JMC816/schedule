"use client";

import { useModalStore } from "@/store";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function ScheduleModal() {
  const { scheduleModal, changeModalState } = useModalStore();

  const onCreateSchedule = async () => {
    changeModalState("scheduleModal");
  };

  const [selectedHourStart, setSelectedHourStart] = useState("00");
  const [selectedMinuteStart, setSelectedMinuteStart] = useState("00");
  const [selectedHourEnd, setSelectedHourEnd] = useState("00");
  const [selectedMinuteEnd, setSelectedMinuteEnd] = useState("00");
  const hours = [...Array(24)].map((_, i) => i.toString().padStart(2, "0"));
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));

  const handleHourStartScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 32);
    setSelectedHourStart(hours[index] || "00");
  };

  const handleMinuteStartScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 32);
    setSelectedMinuteStart(minutes[index] || "00");
  };

  const handleHourEndScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 32);
    setSelectedHourEnd(hours[index] || "00");
  };

  const handleMinuteEndScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 32);
    setSelectedMinuteEnd(minutes[index] || "00");
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
            className="z-10 flex flex-col items-center w-full h-full gap-3 py-6 mt-20 rounded-t-3xl bg-neutral-950"
          >
            <div className="flex flex-col justify-center w-full gap-4">
              <div className="flex gap-5 mr-9 ml-9">
                <span className="">시작</span>
                <span className="border border-white"></span>
                <span>
                  {selectedHourStart + "시 " + selectedMinuteStart + "분"}
                </span>
              </div>
              <div className="flex justify-center p-2 bg-neutral-700 rounded-xl gap-9 ml-9 mr-9">
                <div
                  onScroll={handleHourStartScroll}
                  className="h-[80px] scrollbar-hide overflow-auto snap-y snap-mandatory"
                >
                  <ul className="flex flex-col mb-[60px] first:mt-[30px] gap-3 ">
                    {hours.map((t, index) => (
                      <li
                        className={`snap-center h-[20px] ${
                          selectedHourStart === t
                            ? "text-white"
                            : "text-gray-500"
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
                  onScroll={handleMinuteStartScroll}
                  className="h-[80px] scrollbar-hide overflow-auto snap-y snap-mandatory"
                >
                  <ul
                    className={`flex flex-col mb-[60px] first:mt-[30px] gap-3`}
                  >
                    {minutes.map((t, index) => (
                      <li
                        className={`snap-center h-[20px] ${
                          selectedMinuteStart === t
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                        key={index}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-8 t mr-9 ml-9">
                <span>끝</span>
                <span className="border border-white"></span>
                <span>
                  {selectedHourEnd + "시 " + selectedMinuteEnd + "분"}
                </span>
              </div>
              <div className="flex justify-center p-2 bg-neutral-700 rounded-xl gap-9 mr-9 ml-9">
                <div
                  onScroll={handleHourEndScroll}
                  className="h-[80px] scrollbar-hide overflow-auto snap-y snap-mandatory"
                >
                  <ul className="flex flex-col mb-[60px] first:mt-[30px] gap-3 ">
                    {hours.map((t, index) => (
                      <li
                        className={`snap-center h-[20px] ${
                          selectedHourEnd === t ? "text-white" : "text-gray-500"
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
                  onScroll={handleMinuteEndScroll}
                  className="h-[80px] scrollbar-hide overflow-auto snap-y snap-mandatory"
                >
                  <ul className="flex flex-col mb-[60px] first:mt-[30px] gap-3">
                    {minutes.map((t, index) => (
                      <li
                        className={`snap-center h-[20px] ${
                          selectedMinuteEnd === t
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                        key={index}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 px-9">
              <span className="">일정</span>
              <Input className="" />
            </div>
            <div className="flex w-full gap-2 px-9">
              <Button onClick={onCreateSchedule} className="w-full">
                확인
              </Button>
              <Button
                onClick={() => changeModalState("scheduleModal")}
                className="w-full"
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
