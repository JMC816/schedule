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
        className="flex justify-center m-5 border rounded-md "
      />
      <ToDoList todos={todos} completedTodos={completedTodos} />
    </div>
  );
}
