"use client";

import { useModalStore } from "@/store";

export default function Header() {
  const { changeModalState } = useModalStore();
  return (
    <div className="fixed top-0 flex items-center w-full min-h-16 bg-neutral-700">
      <div className="flex justify-end w-full mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
          onClick={() => changeModalState("chartModal")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
          />
        </svg>
      </div>
    </div>
  );
}
