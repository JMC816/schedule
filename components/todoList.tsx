"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import useStore from "@/store";
import { deleteTodos, initializeTodaysTodo, uploadTodos } from "@/app/actions";

export interface TodosProps {
  todos: {
    id: number;
    text: string;
    toDoId: number;
  }[];
}

export default function ToDoList({ todos }: TodosProps) {
  const { date, setDate } = useStore((state) => state);
  const [value, setValue] = useState<string>("");

  const formatDate = () => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!date) {
      const today = new Date()
        .toLocaleDateString()
        .replace(/\./g, "")
        .split(" ")
        .join("");
      setDate(today);
      initializeTodaysTodo(today);
    }
  }, [date, setDate]);

  const filteredTodo = todos.filter((todo) => todo.toDoId === parseInt(date));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    const formData = new FormData(e.currentTarget);
    await uploadTodos(formData, date);
    setValue("");
  };

  const onDelete = async (id: number) => {
    todos.map(async (todo) => {
      if (todo.id === id) {
        await deleteTodos(id);
      }
    });
  };

  const onChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div className="px-5 py-2 mb-[85px] ml-5 mr-5 border border-white rounded-md ">
        <div className="mb-2 text-center">{formatDate()}</div>
        <form onSubmit={onSubmit} className="flex gap-1 mb-5">
          <Input onChange={onChage} value={value} name="todo" type="text" />
          <Button className="border border-white">입력</Button>
        </form>
        <div className="flex items-center justify-between mb-4 px-2h-7">
          <Checkbox className="bg-white" />
          <TrashIcon className="h-6 text-white" />
        </div>
        <div className="flex mb-4 border border-white rounded-md"></div>
        {filteredTodo.length === 0 ? (
          <div className="text-center text-gray-500">할 일이 없습니다.</div>
        ) : (
          filteredTodo.map((todo) => (
            <div
              key={`${todo.toDoId}-${todo.id}`}
              className="flex items-center justify-between gap-1 px-2 py-2 mb-5 bg-white border border-white rounded-md"
            >
              <Checkbox />
              <span className="w-full pl-1 text-black">{todo.text}</span>
              <TrashIcon
                className="h-6 text-black cursor-pointer"
                onClick={() => onDelete(todo.id)}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
