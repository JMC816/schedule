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

interface ChartState {
  chartData: Record<string, number>;
  setChartData: (newChartData: Record<string, number>) => void;
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

export const useChartStore = create<ChartState>((set) => ({
  chartData: {},
  setChartData: (newChartData: Record<string, number>) =>
    set({ chartData: newChartData }),
}));
