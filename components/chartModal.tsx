"use client";

import ChartHeader from "./chartHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/store";

export default function ChartModal() {
  const { chartModal } = useModalStore();

  return (
    <AnimatePresence>
      {chartModal && (
        <motion.div
          className="z-10 w-full h-full bg-black"
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 1000 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ChartHeader />
          <div className="flex flex-col gap-4 ml-7 mr-7 mt-[85px]">
            <div className="rounded-xl bg-neutral-700"></div>
            <div className="rounded-md bg-neutral-700"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
