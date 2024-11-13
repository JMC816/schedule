"use client";

import { uploadTodos } from "@/app/actions";
import useStore from "@/store";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  const { show, toggleModal } = useStore();
  const { date } = useStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

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
    toggleModal();
  };
  return (
    <>
      <div
        className="h-full"
        style={
          show
            ? {
                backgroundColor: "rgba(76,76,76,0.7)",
                pointerEvents: "none",
                position: "fixed",
                width: "100%",
              }
            : { display: "block", pointerEvents: "auto" }
        }
      >
        <div
          className="absolute "
          style={
            show
              ? {
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: "auto",
                }
              : { display: "none" }
          }
        >
          <div className="z-10 flex flex-col items-center justify-center gap-3 px-4 py-4 ml-5 mr-5 rounded-lg bg-neutral-950">
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
            <Button onClick={toggleModal} className="w-48">
              취소
            </Button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
