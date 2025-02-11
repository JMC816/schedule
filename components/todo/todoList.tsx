"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import React from "react";
import {
  checkedTodos,
  deleteCompletedTodos,
  deleteTodos,
} from "@/app/(main)/todo/actions";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, useToDoListStore } from "@/store";
import { CheckedProps, ToDosProps } from "./todo";

export default function ToDoList({
  todos,
  completedTodos,
  session,
}: ToDosProps) {
  const { date } = useStore();
  const { checkToDo, setCheckToDo } = useToDoListStore();

  const filteredTodos = todos.filter(
    (todos) => todos.toDoId === parseInt(date) && todos.userId === session.id!
  );
  const filteredCompletedTodos = completedTodos.filter(
    (todos) => todos.toDoId === parseInt(date) && todos.userId === session.id!
  );

  const onDeleteTodos = (id: number) => {
    todos.map(async (todos) => {
      if (todos.id === id && todos.userId === session.id!) {
        await deleteTodos(id);
      }
    });
  };

  const onCheckedTodos = async (todo: CheckedProps) => {
    await checkedTodos(todo);
  };

  const onDeleteCompletedTodos = (id: number) => {
    completedTodos.map(async (todos) => {
      if (todos.id == id && todos.userId === session.id!) {
        await deleteCompletedTodos(id);
      }
    });
  };

  const weeks = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const formatDayWeeks =
    date.substring(0, 4) +
    "/" +
    date.substring(4, 6) +
    "/" +
    date.substring(6, 8);

  const dayWeeks = new Date(formatDayWeeks).getDay();

  return (
    <>
      <div className="overflow-auto ">
        <div className="flex flex-col mt-20 ml-7 mr-7">
          <span className="text-4xl">{date.substring(6)}</span>
          <span>{weeks[dayWeeks]}</span>
          <div className="mt-1 mb-4 border"></div>
        </div>
        <div className="flex justify-between gap-2 mb-4 ml-7 mr-7">
          <div
            onClick={() => setCheckToDo(true)}
            className={`w-full p-2 text-center rounded-3xl ${
              checkToDo ? "bg-neutral-500" : "bg-neutral-700"
            }`}
          >
            <span>TO DO</span>
          </div>
          <div
            onClick={() => setCheckToDo(false)}
            className={`w-full p-2 text-center rounded-3xl ${
              checkToDo ? "bg-neutral-700" : "bg-neutral-500"
            }`}
          >
            <span>COMPLETED</span>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-24 ml-7 mr-7">
          {!checkToDo
            ? filteredTodos.map((todos) => (
                <AnimatePresence key={todos.id}>
                  <motion.div
                    layout
                    className="flex w-full px-2 py-4 mb-4 rounded-md bg-neutral-700"
                  >
                    <input
                      type="checkbox"
                      onChange={() => onCheckedTodos(todos)}
                    />
                    <span className="w-full pl-3 text-white">{todos.text}</span>
                    <TrashIcon
                      className="h-6 text-white cursor-pointer"
                      onClick={() => onDeleteTodos(todos.id)}
                    />
                  </motion.div>
                </AnimatePresence>
              ))
            : filteredCompletedTodos.map((todos) => (
                <AnimatePresence key={todos.id}>
                  <motion.div
                    layout
                    className="flex w-full px-2 py-4 mb-4 rounded-md bg-neutral-800"
                  >
                    <input type="checkbox" checked={true} disabled />
                    <span className="w-full pl-3 text-gray-500 line-through">
                      {todos.text}
                    </span>
                    <TrashIcon
                      className="h-6 text-white cursor-pointer"
                      onClick={() => onDeleteCompletedTodos(todos.id)}
                    />
                  </motion.div>
                </AnimatePresence>
              ))}
        </div>
      </div>
    </>
  );
}
