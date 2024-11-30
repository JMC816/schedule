"use client";

import { useModalStore } from "@/store";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ScheduleModal() {
  const { scheduleModal, changeModalState } = useModalStore();

  return (
    <>
      <AnimatePresence>
        {scheduleModal && (
          <motion.div
            exit={{ opacity: 0, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 flex flex-col items-center justify-center gap-3 px-4 py-4 ml-5 mr-5 rounded-lg bg-neutral-950"
          >
            <Button
              onClick={() => changeModalState("scheduleModal")}
              className="w-48"
            >
              취소
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
