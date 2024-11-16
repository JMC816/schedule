"use client";

import { uploadTodos } from "@/app/actions";
import { useModalStore, useStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function ToDoModal({ children }: Props) {
  const { todoModal, changeModalState } = useModalStore();
  const { date } = useStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todoModal]);

  const [value, setValue] = useState<string>("");

  const onChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    const formData = new FormData(e.currentTarget);
    await uploadTodos(formData, date);
    setValue("");
    changeModalState("todoModal");
  };
  return (
    <>
      <div
        className="h-full"
        style={
          todoModal
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
            pointerEvents: todoModal ? "auto" : "none",
          }}
        >
          <AnimatePresence>
            {todoModal && (
              <motion.div
                exit={{ opacity: 0, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 flex flex-col items-center justify-center gap-3 px-4 py-4 ml-5 mr-5 rounded-lg bg-neutral-950"
              >
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                  <Input
                    onChange={onChage}
                    value={value}
                    name="todo"
                    type="text"
                    placeholder="할 일을 입력하세요."
                    autoFocus
                    ref={inputRef}
                  />
                  <Button className="w-48">입력</Button>
                </form>
                <Button
                  onClick={() => changeModalState("todoModal")}
                  className="w-48"
                >
                  취소
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {children}
      </div>
    </>
  );
}
