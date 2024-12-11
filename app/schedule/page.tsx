import Schedule_Box from "@/components/schedule/schedule";
import { getScheduleList } from "./actions";

export default async function Schedule() {
  const scheduleLists = await getScheduleList();
  return (
    <div className="overflow-auto gri">
      <Schedule_Box scheduleLists={scheduleLists} />
    </div>
  );
}
