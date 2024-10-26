import { create } from "zustand";

interface Store {
  date: string;
  setDate: (newDate: string) => void;
}

const useStore = create<Store>((set) => ({
  date: "",
  setDate: (newDate: string) => set({ date: newDate }),
}));

export default useStore;
