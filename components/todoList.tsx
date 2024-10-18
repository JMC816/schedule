"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import React, { useState } from "react";

export default function ToDoList() {
  const [value, setValue] = useState("");
  const [toDo, setToDo] = useState<string[]>([]);

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const dateString = year + "-" + month + "-" + day;
    return dateString;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    setToDo((prev) => [...prev, value]);
    setValue("");
  };
  return (
    <>
      <div className="px-5 py-2 mb-[85px] ml-5 mr-5 border border-white rounded-md ">
        <div className="mb-2 text-center">{getDate()}</div>
        <form className="flex gap-1 mb-5" onSubmit={onSubmit}>
          <Input onChange={onChange} value={value} />
          <Button className="border border-white">입력</Button>
        </form>
        <div className="flex items-center justify-between mb-4 px-2h-7">
          <Checkbox className="bg-white" />
          <TrashIcon className="h-6 text-white" />
        </div>
        <div className="flex mb-4 border border-white rounded-md"></div>
        {toDo.map((todos, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-1 px-2 py-2 mb-5 bg-white border border-white rounded-md"
          >
            <Checkbox />
            <span className="w-full pl-1 text-black">{todos}</span>
            <TrashIcon className="h-6 text-black" />
          </div>
        ))}
      </div>
    </>
  );
}
