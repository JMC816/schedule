"use client";

import {
  CalendarDateRangeIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 flex w-full min-h-16 bg-neutral-700">
      <div
        className={`flex items-center justify-center w-full ${
          pathname === "/" ? "bg-neutral-500" : "bg-neutral-700"
        }`}
      >
        <Link href="/">
          <CalendarDateRangeIcon className="w-11 " />
        </Link>
      </div>
      <div
        className={`flex items-center justify-center w-full ${
          pathname === "/schedule" ? "bg-neutral-500" : "bg-neutral-700"
        }`}
      >
        <Link href="/schedule">
          <CalendarIcon className="w-11" />
        </Link>
      </div>
      <div
        className={`flex items-center justify-center w-full ${
          pathname === "/set" ? "bg-neutral-500" : "bg-neutral-700"
        }`}
      >
        <Link href="/set">
          <Cog6ToothIcon className="w-11" />
        </Link>
      </div>
    </div>
  );
}
