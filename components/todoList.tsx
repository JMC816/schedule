"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import {
  checkedTodos,
  deleteCompletedTodos,
  deleteTodos,
  getCompletedTodos,
  initializeTodaysTodo,
} from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { useChartStore, useStore } from "@/store";
import { CheckedProps, ToDosProps } from "./todo";

export default function ToDoList({ todos, completedTodos }: ToDosProps) {
  const { date, setDate } = useStore();
  const { setChartData } = useChartStore();

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
      <div className="flex justify-between gap-2 py-2 mt-20 rounded-md ml-7 mr-7">
        {filteredTodos.length === 0 ? (
          <>
            <div className="w-full p-2 text-center rounded-3xl bg-neutral-500 active:bg-neutral-700">
              <span>TO DO</span>
            </div>
          </>
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
        {filteredCompletedTodos.length === 0 ? (
          <>
            <div className="w-full p-2 text-center rounded-3xl bg-neutral-500 active:bg-neutral-700">
              <span>COMPLETED</span>
            </div>
          </>
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
