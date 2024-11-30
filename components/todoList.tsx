"use client";

import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import {
  checkedTodos,
  deleteCompletedTodos,
  deleteTodos,
  getCompletedTodos,
  initializeTodaysTodo,
} from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { useChartStore, useModalStore, useStore } from "@/store";

export interface ToDosProps {
  todos: {
    id: number;
    text: string;
    toDoId: number;
  }[];
  completedTodos: {
    id: number;
    text: string;
    toDoId: number;
  }[];
}

export interface CheckedProps {
  id: number;
  text: string;
  toDoId: number;
}

export default function ToDoList({ todos, completedTodos }: ToDosProps) {
  const { changeModalState } = useModalStore();
  const { date, setDate } = useStore();
  const { setChartData } = useChartStore();

  const formatDate = () => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6).padStart(2, "0");
    const day = date.slice(6, 8).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const formatChartDate = (month: number) => {
      const today = new Date()
        .toLocaleDateString()
        .replace(/\./g, "")
        .split(" ")
        .join("");
      const year = today.slice(0, 4);
      const months = String(month).padStart(2, "0");
      return `${year}${months}`;
    };

    const updateChartData = async () => {
      const monthlyData: Record<string, Record<string, number>> = {};
      const chartData = await getCompletedTodos();

      for (let month = 1; month <= 12; month++) {
        const formatMonth = await formatChartDate(month);
        const filteredTodo = await chartData.filter((todo) =>
          String(todo.toDoId).includes(formatMonth)
        );

        const count = await filteredTodo.map((todo) => todo.toDoId);
        const result = await count.reduce(
          (accu: Record<string, number>, curr: number) => {
            accu[curr] = (accu[curr] || 0) + 1;
            return accu;
          },
          {}
        );
        monthlyData[formatMonth] = result;
      }
      setChartData(monthlyData);
    };
    updateChartData();
  }, [completedTodos]);

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

  const filteredTodos = todos.filter(
    (todos) => todos.toDoId === parseInt(date)
  );
  const filteredCompletedTodos = completedTodos.filter(
    (todos) => todos.toDoId === parseInt(date)
  );

  const onDeleteTodos = (id: number) => {
    todos.map(async (todos) => {
      if (todos.id === id) {
        await deleteTodos(id);
      }
    });
  };

  const onCheckedTodos = async (todo: CheckedProps) => {
    await checkedTodos(todo);
  };

  const onDeleteCompletedTodos = (id: number) => {
    completedTodos.map(async (todos) => {
      if (todos.id == id) {
        await deleteCompletedTodos(id);
      }
    });
  };
  return (
    <>
      <div className="py-2 mb-[70px] ml-7 mr-7 rounded-md ">
        <div className="mb-2 text-center">{formatDate()}</div>
        <div
          onClick={() => changeModalState("todoModal")}
          className="flex items-center justify-center py-2 mb-2 rounded-md cursor-pointer bg-neutral-700"
        >
          <PlusIcon className="w-10" />
        </div>
        <span>TO DO</span>
        <div className="flex mb-4 border border-white rounded-md"></div>
        {filteredTodos.length === 0 ? (
          <div className="mb-4 text-center text-gray-500">
            할 일이 없습니다.
          </div>
        ) : (
          filteredTodos.map((todos) => (
            <AnimatePresence key={todos.id}>
              <motion.div
                layout
                className="flex items-center justify-between px-2 py-4 mb-5 rounded-md bg-neutral-700"
              >
                <input type="checkbox" onChange={() => onCheckedTodos(todos)} />
                <span className="w-full pl-3 text-white">{todos.text}</span>
                <TrashIcon
                  className="h-6 text-white cursor-pointer"
                  onClick={() => onDeleteTodos(todos.id)}
                />
              </motion.div>
            </AnimatePresence>
          ))
        )}
        <span>COMPLETED</span>
        <div className="flex mb-4 border border-white rounded-md"></div>
        {filteredCompletedTodos.length === 0 ? (
          <div className="text-center text-gray-500">완료한 일이 없습니다.</div>
        ) : (
          filteredCompletedTodos.map((todos) => (
            <AnimatePresence key={todos.id}>
              <motion.div
                layout
                className="flex items-center justify-between gap-1 px-2 py-4 mb-5 rounded-md bg-neutral-800"
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
          ))
        )}
      </div>
    </>
  );
}
