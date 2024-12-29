import Schedule_Box from "@/components/schedule/schedule";
import { getScheduleList } from "./actions";

export default async function Schedule() {
  const scheduleLists = await getScheduleList();
  return (
    <div className="overflow-auto">
      <Schedule_Box scheduleLists={scheduleLists} />
    </div>
  );
}
