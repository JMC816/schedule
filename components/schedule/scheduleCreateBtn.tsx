"use client";

import { useModalStore, useRangeStore } from "@/store";
import { CalendarIcon, PlusIcon } from "@heroicons/react/16/solid";

export default function ScheduleCreateBtn() {
  const { changeModalState } = useModalStore();
  const { range } = useRangeStore();
  const onPopupClick = () => {
    if (!range?.from || !range?.to) {
      changeModalState("schedulePopup");
    } else {
      changeModalState("scheduleModal");
    }
  };
  return (
    <>
      <div className="px-2 py-2 mb-2 ml-5 mr-5 ">
        <div className="flex gap-4 h-7">
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
      </div>
      <div
        onClick={onPopupClick}
        className="flex items-center justify-center py-2 rounded-md ml-7 mr-7 bg-neutral-700 "
      >
        <PlusIcon className="w-10" />
      </div>
    </>
  );
}
