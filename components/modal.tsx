"use client";

import { useModalStore } from "@/store";
import ToDoModal from "./todoModal";
import ChartModal from "./chartModal";

export interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  const { todoModal, chartModal } = useModalStore();
  return (
    <>
      <div
        className="h-full"
        style={{
          backgroundColor: todoModal ? "rgba(76,76,76,0.7)" : "",
          pointerEvents: todoModal || chartModal ? "none" : "auto",
          position: "fixed",
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
            pointerEvents: todoModal || chartModal ? "auto" : "none",
          }}
        >
          <ToDoModal />
          <ChartModal />
        </div>
        {children}
      </div>
    </>
  );
}
