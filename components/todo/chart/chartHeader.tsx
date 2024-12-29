"use client";

import { useModalStore } from "@/store";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function ChartHeader() {
  const { changeModalState } = useModalStore();

  return (
    <div className="fixed top-0 z-10 flex items-center w-full min-h-16 bg-neutral-700">
      <div className="flex justify-start w-full ml-5">
        <ArrowUturnLeftIcon
          onClick={() => changeModalState("chartModal")}
          className="h-6 cursor-pointer"
        />
      </div>
    </div>
  );
}
