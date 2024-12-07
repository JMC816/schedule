"use client";

import { useModalStore, useRangeStore } from "@/store";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { createSchedule } from "@/app/schedule/actions";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
} from "@heroicons/react/16/solid";

export default function ScheduleModal() {
  const { scheduleModal, changeModalState } = useModalStore();
  const { range } = useRangeStore();

  const onRemoveModal = () => {
    setHandleAccordionStart(false);
    setHandleAccordionEnd(false);
    changeModalState("scheduleModal");
  };

  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [scheduleModal]);

  const onChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onCreateSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    const formData = new FormData(e.currentTarget);
    setValue("");
    await createSchedule(
      selectedHourStart,
      selectedHourEnd,
      selectedMinuteStart,
      selectedMinuteEnd,
      formData
    );
    setHandleAccordionStart(false);
    setHandleAccordionEnd(false);
    changeModalState("scheduleModal");
  };

  const [handleAccordionStart, setHandleAccordionStart] = useState(false);
  const [handleAccordionEnd, setHandleAccordionEnd] = useState(false);

  const onHandleAccordionStart = () => {
    setHandleAccordionStart((prev) => !prev);
  };

  const onHandleAccordionEnd = () => {
    setHandleAccordionEnd((prev) => !prev);
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
          <motion.form
            onSubmit={onCreateSchedule}
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="z-10 flex flex-col items-center w-full h-full gap-3 py-6 mt-40 rounded-t-3xl bg-neutral-950"
          >
            <div className="flex flex-col w-full gap-4 px-9">
              <span>일정</span>
              <Input
                onChange={onChage}
                value={value}
                name="schedule"
                type="text"
                ref={inputRef}
              />
            </div>
            <div className="flex w-full gap-4 text-sm h-7 px-9">
              <div className="flex items-center w-full gap-2 text-center border border-white rounded-md">
                <CalendarIcon className="h-full p-1" />
                {range?.from?.toLocaleDateString()}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-4 border rounded-lg"></div>
                <div />
              </div>
              <div className="flex items-center w-full gap-2 text-center border border-white rounded-md ">
                <CalendarIcon className="h-full p-1" />
                {range?.to?.toLocaleDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center w-full gap-3 px-9">
              <div className="p-2 rounded-md bg-neutral-500">
                <div
                  className="flex justify-around mb-1"
                  onClick={onHandleAccordionStart}
                >
                  <span className="">시작</span>
                  <span className="border border-white"></span>
                  <span className="flex gap-2">
                    <ClockIcon className="w-6" />
                    {selectedHourStart + "시 " + selectedMinuteStart + "분"}
                  </span>
                  <span>
                    {handleAccordionStart ? (
                      <ChevronUpIcon className="w-6" />
                    ) : (
                      <ChevronDownIcon className="w-6" />
                    )}
                  </span>
                </div>
                <AnimatePresence>
                  {handleAccordionStart && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 100 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                      className="flex justify-center overflow-hidden rounded-sm gap-9 bg-neutral-700"
                    >
                      <div
                        onScroll={handleHourStartScroll}
                        className="h-[100px] scrollbar-hide overflow-auto snap-y snap-mandatory"
                      >
                        <ul className="flex flex-col mb-[50px] first:mt-[50px] gap-3 ">
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
                      <div className="h-[100px] flex items-center justify-center">
                        <span>:</span>
                      </div>
                      <div
                        onScroll={handleMinuteStartScroll}
                        className="h-[100px] scrollbar-hide overflow-auto snap-y snap-mandatory"
                      >
                        <ul
                          className={`flex flex-col mb-[50px] first:mt-[50px] gap-3`}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div
                className="p-2 rounded-md bg-neutral-500"
                onClick={onHandleAccordionEnd}
              >
                <div className="flex justify-around mb-1">
                  <span className="">끝</span>
                  <span className="border border-white"></span>
                  <span className="flex gap-2">
                    <ClockIcon className="w-6" />
                    {selectedHourEnd + "시 " + selectedMinuteEnd + "분"}
                  </span>
                  <span>
                    {handleAccordionEnd ? (
                      <ChevronUpIcon className="w-6" />
                    ) : (
                      <ChevronDownIcon className="w-6" />
                    )}
                  </span>
                </div>
                <AnimatePresence>
                  {handleAccordionEnd && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 100 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                      className="flex justify-center overflow-hidden rounded-sm gap-9 bg-neutral-700"
                    >
                      <div
                        onScroll={handleHourEndScroll}
                        className="h-[100px] scrollbar-hide overflow-auto snap-y snap-mandatory"
                      >
                        <ul className="flex flex-col mb-[50px] first:mt-[50px] gap-3 ">
                          {hours.map((t, index) => (
                            <li
                              className={`snap-center h-[20px] ${
                                selectedHourEnd === t
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
                      <div className="h-[100px] flex items-center justify-center">
                        <span>:</span>
                      </div>
                      <div
                        onScroll={handleMinuteEndScroll}
                        className="h-[100px] scrollbar-hide overflow-auto snap-y snap-mandatory"
                      >
                        <ul className="flex flex-col mb-[50px] first:mt-[50px] gap-3">
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex w-full gap-2 px-9">
              <Button className="w-full">확인</Button>
              <Button type="button" onClick={onRemoveModal} className="w-full">
                취소
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}
