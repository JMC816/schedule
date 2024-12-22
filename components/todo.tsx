"use client";

import { AnimatePresence, motion } from "framer-motion";
import ToDoList from "./todoList";
import { Calendar } from "./ui/calendar";
import { useModalStore, useToDoListStore } from "@/store";
import { PlusIcon } from "@heroicons/react/16/solid";

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

export default function ToDo_Box({ todos, completedTodos }: ToDosProps) {
  const { changeModalState } = useModalStore();
  const { setSlide, slide } = useToDoListStore();
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
                  className="w-full p-2 text-center rounded-3xl bg-neutral-500 active:bg-neutral-700"
                  onClick={() => setSlide(true)}
                >
                  <span>TO DO</span>
                </div>
                <div
                  className="w-full p-2 text-center rounded-3xl bg-neutral-500 active:bg-neutral-700"
                  onClick={() => setSlide(true)}
                >
                  <span>COMPLETED</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {slide || <ToDoList todos={todos} completedTodos={completedTodos} />}
      <div
        onClick={() => changeModalState("todoModal")}
        className="fixed bottom-0 w-12 mb-20 rounded-full right-5 bg-neutral-500 active:bg-neutral-700"
      >
        <PlusIcon />
      </div>
    </>
  );
}
