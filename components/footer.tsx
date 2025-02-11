"use client";

import { useModalStore } from "@/store";
import {
  CalendarDateRangeIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const { todoModal, chartModal, changeModalState } = useModalStore();
  const onClick = () => {
    if (todoModal === true) {
      changeModalState("todoModal");
    }
    if (chartModal === true) {
      changeModalState("chartModal");
    }
  };
  return (
    <div className="fixed bottom-0 flex w-full min-h-16 bg-neutral-700">
      <div
        className={`flex items-center justify-center w-full ${
          pathname === "/todo" ? "bg-neutral-500" : "bg-neutral-700"
        }`}
      >
        <Link href="/todo" onClick={onClick}>
          <div className="flex flex-col items-center">
            <CalendarDateRangeIcon className="w-8 " />
            <span className="text-sm">할 일</span>
          </div>
        </Link>
      </div>
      <div
        className={`flex items-center justify-center w-full ${
          pathname === "/schedule" ? "bg-neutral-500" : "bg-neutral-700"
        }`}
      >
        <Link href="/schedule" onClick={onClick}>
          <div className="flex flex-col items-center">
            <CalendarIcon className="w-8" />
            <span className="text-sm">일정</span>
          </div>
        </Link>
      </div>
      <div
        className={`flex items-center justify-center w-full ${
          pathname === "/set" ? "bg-neutral-500" : "bg-neutral-700"
        }`}
      >
        <Link href="/set" onClick={onClick}>
          <div className="flex flex-col items-center">
            <Cog6ToothIcon className="w-8" />
            <span className="text-sm">설정</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
