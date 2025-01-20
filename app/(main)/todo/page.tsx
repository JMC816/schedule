import getSession from "@/lib/session";
import { getCompletedTodos, getTodos } from "./actions";
import ToDo_Box from "@/components/todo/todo";

export default async function ToDo() {
  const todos = await getTodos();
  const completedTodos = await getCompletedTodos();
  const session = await getSession();
  return (
    <ToDo_Box session={session} todos={todos} completedTodos={completedTodos} />
  );
}
