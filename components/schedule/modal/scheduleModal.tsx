"use client";

import { useModalStore } from "@/store";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function ScheduleModal() {
  const { scheduleModal, changeModalState } = useModalStore();

  const onCreateSchedule = async () => {
    changeModalState("scheduleModal");
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
            <div className="flex flex-col w-full gap-4">
              <div>
                <span>시작</span>
                <div className="overflow-auto flex gap-4 [&_span]:bg-neutral-500 [&_span]:rounded-lg [&_span]:p-1">
                  <span>09:00</span>
                  <span>09:30</span>
                  <span>10:00</span>
                  <span>10:30</span>
                  <span>11:00</span>
                  <span>11:30</span>
                  <span>12:00</span>
                  <span>12:30</span>
                  <span>13:00</span>
                  <span>13:30</span>
                  <span>14:00</span>
                  <span>14:30</span>
                  <span>15:00</span>
                  <span>15:30</span>
                  <span>16:00</span>
                  <span>16:30</span>
                  <span>17:00</span>
                  <span>17:30</span>
                  <span>18:00</span>
                  <span>18:30</span>
                  <span>19:00</span>
                  <span>19:30</span>
                  <span>20:00</span>
                  <span>20:30</span>
                  <span>21:00</span>
                  <span>21:30</span>
                  <span>22:00</span>
                  <span>22:30</span>
                  <span>23:00</span>
                  <span>23:30</span>
                  <span>24:00</span>
                </div>
              </div>
              <div>
                <span>끝</span>
                <div className="overflow-auto flex gap-4 [&_span]:bg-neutral-500 [&_span]:rounded-lg [&_span]:p-1">
                  <span>09:00</span>
                  <span>09:30</span>
                  <span>10:00</span>
                  <span>10:30</span>
                  <span>11:00</span>
                  <span>11:30</span>
                  <span>12:00</span>
                  <span>12:30</span>
                  <span>13:00</span>
                  <span>13:30</span>
                  <span>14:00</span>
                  <span>14:30</span>
                  <span>15:00</span>
                  <span>15:30</span>
                  <span>16:00</span>
                  <span>16:30</span>
                  <span>17:00</span>
                  <span>17:30</span>
                  <span>18:00</span>
                  <span>18:30</span>
                  <span>19:00</span>
                  <span>19:30</span>
                  <span>20:00</span>
                  <span>20:30</span>
                  <span>21:00</span>
                  <span>21:30</span>
                  <span>22:00</span>
                  <span>22:30</span>
                  <span>23:00</span>
                  <span>23:30</span>
                  <span>24:00</span>
                </div>
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
