"use client";

import { useModalStore } from "@/store";

export default function ChartModal() {
  const { chartModal } = useModalStore();

  return (
    <>
      {chartModal && (
        <div className="z-10 w-full h-full bg-black">
          <div className="flex flex-col gap-4 m-7">
            <div className="rounded-xl bg-neutral-700"></div>
            <div className="rounded-md bg-neutral-700"></div>
          </div>
        </div>
      )}
    </>
  );
}
