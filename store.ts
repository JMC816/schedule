import { create } from "zustand";

interface Store {
  date: string;
  setDate: (newDate: string) => void;
  show: boolean;
  toggleModal: () => void;
}

const useStore = create<Store>((set) => ({
  date: "",
  setDate: (newDate: string) => set({ date: newDate }),
  show: false,
  toggleModal: () => set((state) => ({ show: !state.show })),
}));

export default useStore;
