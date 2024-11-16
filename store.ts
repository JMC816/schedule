import { create } from "zustand";

type Type = "todoModal" | "chartModal";

interface Store {
  date: string;
  setDate: (newDate: string) => void;
}

interface ModalState {
  todoModal: boolean;
  chartModal: boolean;
  changeModalState: (type: Type) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  todoModal: false,
  chartModal: false,
  changeModalState: (type) =>
    set((state) => ({ ...state, [type]: !state[type] })),
}));

export const useStore = create<Store>((set) => ({
  date: "",
  setDate: (newDate: string) => set({ date: newDate }),
}));
