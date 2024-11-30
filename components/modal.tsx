"use client";

import { useModalStore } from "@/store";
import ToDoModal from "./todoModal";
import ChartModal from "./chartModal";
import SchedulePopup from "./schedule/popup/schedulePopup";
import ScheduleModal from "./schedule/modal/scheduleModal";

export interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  const { todoModal, chartModal, scheduleModal, schedulePopup } =
    useModalStore();
  return (
    <>
      <div
        className="h-full"
        style={{
          backgroundColor:
            todoModal || schedulePopup || scheduleModal
              ? "rgba(76,76,76,0.7)"
              : "",
          pointerEvents:
            todoModal || schedulePopup || scheduleModal || chartModal
              ? "none"
              : "auto",
          position:
            todoModal || schedulePopup || scheduleModal || chartModal
              ? "fixed"
              : "static",
          width: "100%",
        }}
      >
        <div
          className="absolute "
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents:
              todoModal || schedulePopup || scheduleModal || chartModal
                ? "auto"
                : "none",
          }}
        >
          <ToDoModal />
          <ChartModal />
          <SchedulePopup />
          <ScheduleModal />
        </div>
        {children}
      </div>
    </>
  );
}
