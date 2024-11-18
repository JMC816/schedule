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
        style={
          todoModal || chartModal
            ? {
                backgroundColor: "rgba(76,76,76,0.7)",
                pointerEvents: "none",
                position: "fixed",
                width: "100%",
              }
            : { pointerEvents: "auto" }
        }
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
          {todoModal && <ToDoModal />}
          {chartModal && <ChartModal />}
        </div>
        {children}
      </div>
    </>
  );
}
