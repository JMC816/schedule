import { getCompletedTodos, getTodos } from "./actions";
import ToDo_Box from "@/components/todo";

export default async function ToDo() {
  const todos = await getTodos();
  const completedTodos = await getCompletedTodos();
  return <ToDo_Box todos={todos} completedTodos={completedTodos} />;
}
