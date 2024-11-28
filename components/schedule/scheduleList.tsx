"use client";

import { useModalStore } from "@/store";
import { PlusIcon } from "@heroicons/react/16/solid";
import { DateRange } from "react-day-picker";

interface RangeProps {
  range: DateRange | undefined;
}

export default function ScheduleList({ range }: RangeProps) {
  const { changeModalState } = useModalStore();
  return (
    <>
      <div className="px-5 py-2 mb-2 ml-5 mr-5 border border-white rounded-md ">
        <div className="flex gap-4 h-7">
          <div className="w-full text-center border border-white rounded-md">
            {range?.from?.toLocaleDateString()}
          </div>
          <div className="w-full text-center border border-white rounded-md">
            {range?.to?.toLocaleDateString()}
          </div>
        </div>
      </div>
      <div
        onClick={() => changeModalState("chartModal")}
        className="flex self-center justify-center ml-5 mr-5 rounded-md bg-neutral-700 "
      >
        <PlusIcon className="w-12" />
      </div>
    </>
  );
}
