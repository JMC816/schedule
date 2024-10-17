import ToDoList from "@/components/todoList";
import { Calendar } from "@/components/ui/calendar";

export default function ToDo() {
  return (
    <div className="overflow-auto ">
      <Calendar className="m-5 border rounded-md "></Calendar>
      <ToDoList></ToDoList>
    </div>
  );
}
