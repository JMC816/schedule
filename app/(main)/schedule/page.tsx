import Schedule_Box from "@/components/schedule/schedule";
import { getScheduleList } from "./actions";
import getSession from "@/lib/session";

export default async function Schedule() {
  const scheduleLists = await getScheduleList();
  const session = await getSession();
  return (
    <div className="overflow-auto">
      <Schedule_Box session={session} scheduleLists={scheduleLists} />
    </div>
  );
}
