"use client";

import { useModalStore, useToDoListStore } from "@/store";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";

export default function Header() {
  const { changeModalState } = useModalStore();
  const { slide, setSlide } = useToDoListStore();
  const pathname = usePathname();
  return (
    <div className="fixed top-0 flex items-center w-full min-h-16 bg-neutral-700">
      <div className="flex justify-between w-full ml-5 mr-5">
        {pathname === "/" && (
          <>
            {slide ? (
              <div className="w-6" />
            ) : (
              <ArrowUturnLeftIcon
                onClick={() => setSlide(false)}
                className="h-6 mt-1 cursor-pointer "
              />
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="cursor-pointer size-8"
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
          </>
        )}
      </div>
    </div>
  );
}
