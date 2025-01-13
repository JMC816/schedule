import { getUser, logOut } from "./actions";

export default async function Set() {
  const user = await getUser();
  return (
    <div className="overflow-hidden ">
      <div className=" mt-[85px] mr-5 ml-5">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between p-4 rounded-lg bg-neutral-700">
            <span>{user?.username}</span>
          </div>
          <div className="flex justify-between p-4 rounded-lg bg-neutral-700">
            <form action={logOut}>
              <button>로그아웃</button>
            </form>
          </div>
          <div className="flex justify-between p-4 rounded-lg bg-neutral-700">
            <span>앱 버전</span>
            <span className="text-gray-500">v1.0.0</span>
          </div>
          <div className="flex justify-between p-4 rounded-lg bg-neutral-700">
            <span>문의 및 피드백</span>
            <span className="text-gray-500">(출시 예정)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
