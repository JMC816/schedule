import ToDoList from "@/components/todoList";
import { Calendar } from "@/components/ui/calendar";
import { getCompletedTodos, getTodos } from "./actions";

export default async function ToDo() {
  const todos = await getTodos();
  const completedTodos = await getCompletedTodos();
  return (
    <div className="overflow-auto ">
      <Calendar
        completedTodos={completedTodos}
        className="flex justify-center mb-2 border rounded-md ml-7 mr-7 mt-7"
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
      <ToDoList todos={todos} completedTodos={completedTodos} />
    </div>
  );
}
