"use client";

import { AnimatePresence, motion } from "framer-motion";
import ToDoList from "./todoList";
import { Calendar } from "../ui/calendar";
import {
  useChartStore,
  useModalStore,
  useStore,
  useToDoListStore,
} from "@/store";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";

export interface ToDosProps {
  todos: {
    id: number;
    text: string;
    toDoId: number;
    userId: number;
  }[];
  completedTodos: {
    id: number;
    text: string;
    toDoId: number;
    userId: number;
  }[];
  session: {
    id?: number;
  };
}

export interface CheckedProps {
  id: number;
  text: string;
  toDoId: number;
}

export default function ToDo_Box({
  todos,
  completedTodos,
  session,
}: ToDosProps) {
  const { changeModalState } = useModalStore();
  const { setSlide, slide } = useToDoListStore();
  const { setCheckToDo } = useToDoListStore();
  const { date, setDate } = useStore();
  const { setChartData } = useChartStore();

  useEffect(() => {
    if (!date) {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      setDate(`${year}${month}${day}`);
    }
  }, [date, setDate]);

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

      for (let month = 1; month <= 12; month++) {
        const formatMonth = await formatChartDate(month);
        const filteredTodo = await completedTodos.filter(
          (todo) =>
            String(todo.toDoId).includes(formatMonth) &&
            todo.userId === session.id!
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
  }, [completedTodos, setChartData]);

  const onClickToDo = () => {
    setSlide(true);
    setCheckToDo(true);
  };

  const onClickCompletedToDo = () => {
    setSlide(true);
    setCheckToDo(false);
  };

  const filteredTodos = todos.filter(
    (todos) => todos.toDoId === parseInt(date) && todos.userId === session.id!
  );
  const filteredCompletedTodos = completedTodos.filter(
    (todos) => todos.toDoId === parseInt(date) && todos.userId === session.id!
  );

  return (
    <>
      <AnimatePresence initial={false}>
        {slide && (
          <div className="h-[100vh] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 1000 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Calendar
                session={session}
                completedTodos={completedTodos}
                className="flex justify-center mt-[85px] mb-2 ml-6 mr-6 rounded-md"
              />
              <div className="flex justify-end gap-1 mr-7 ml-7">
                <span className="text-xs">Less</span>
                <div className="p-2 bg-green-100 rounded-sm"></div>
                <div className="p-2 bg-green-300 rounded-sm"></div>
                <div className="p-2 bg-green-500 rounded-sm"></div>
                <div className="p-2 bg-green-700 rounded-sm"></div>
                <div className="p-2 bg-green-900 rounded-sm"></div>
                <div className="p-2 rounded-sm bg-green-950"></div>
                <span className="text-xs">More</span>
              </div>
              <div className="flex justify-center gap-2 mt-4 mr-7 ml-7">
                <div
                  className="relative w-full p-2 text-center rounded-3xl bg-neutral-500 active:bg-neutral-700"
                  onClick={onClickToDo}
                >
                  {filteredTodos.length !== 0 ? (
                    <div className="absolute flex items-center justify-center rounded-full bg-sky-500 w-7 h-7 left-[85%] bottom-[50%]">
                      {filteredTodos.length}
                    </div>
                  ) : null}
                  <span>TO DO</span>
                </div>
                <div
                  className="relative w-full p-2 text-center rounded-3xl bg-neutral-500 active:bg-neutral-700"
                  onClick={onClickCompletedToDo}
                >
                  {filteredCompletedTodos.length !== 0 ? (
                    <div className="absolute flex items-center justify-center rounded-full bg-sky-500 w-7 h-7 left-[85%] bottom-[50%]">
                      {filteredCompletedTodos.length}
                    </div>
                  ) : null}
                  <span>COMPLETED</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {slide || (
        <ToDoList
          session={session}
          todos={todos}
          completedTodos={completedTodos}
        />
      )}
      <div
        onClick={() => changeModalState("todoModal")}
        className="fixed bottom-0 w-12 mb-20 rounded-full right-5 bg-neutral-500 active:bg-neutral-700"
      >
        <PlusIcon />
      </div>
    </>
  );
}
