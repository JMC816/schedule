"use client";

import { useModalStore } from "@/store";
import ToDoModal from "./todoModal";
import ChartModal from "./chartModal";
import SchedulePopup from "./schedule/popup/schedulePopup";

export interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  const { todoModal, chartModal, schedulePopup } = useModalStore();
  return (
    <>
      <div
        className="h-full"
        style={{
          backgroundColor:
            todoModal || schedulePopup ? "rgba(76,76,76,0.7)" : "",
          pointerEvents:
            todoModal || schedulePopup || chartModal ? "none" : "auto",
          position:
            todoModal || schedulePopup || chartModal ? "fixed" : "static",
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
              todoModal || schedulePopup || chartModal ? "auto" : "none",
          }}
        >
          <ToDoModal />
          <ChartModal />
          <SchedulePopup />
        </div>
        {children}
      </div>
    </>
  );
}
