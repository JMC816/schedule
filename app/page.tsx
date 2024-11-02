import ToDoList from "@/components/todoList";
import { Calendar } from "@/components/ui/calendar";
import { getTodos } from "./actions";

export default async function ToDo() {
  const todos = await getTodos();
  return (
    <div className="overflow-auto ">
      <Calendar todos={todos} className="m-5 border rounded-md "></Calendar>
      <ToDoList todos={todos} />
    </div>
  );
}
