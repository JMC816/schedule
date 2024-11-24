"use client";

import dynamic from "next/dynamic";
import ChartHeader from "./chartHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useChartStore, useModalStore } from "@/store";

export default function ChartModal() {
  const { chartModal } = useModalStore();
  const { chartData } = useChartStore();
  const value = Object.values(chartData);
  const chartOne = value.filter((n) => n == 1).length;
  const chartTwo = value.filter((n) => n == 2).length;
  const chartThree = value.filter((n) => n == 3).length;
  const chartfour = value.filter((n) => n == 4).length;
  const chartFive = value.filter((n) => n == 5).length;
  const chartSixOver = value.filter((n) => n >= 6).length;

  const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const options = {
    series: [
      chartOne,
      chartTwo,
      chartThree,
      chartfour,
      chartFive,
      chartSixOver,
    ],
    chartOptions: {
      labels: ["one", "two", "three", "four", "five", "six"],
      colors: [
        "#dcfce7",
        "#86efac",
        "#22c55e",
        "#15803d",
        "#14532d",
        "#052e16",
      ],
      stroke: {
        colors: undefined,
      },
    },
  };

  return (
    <AnimatePresence>
      {chartModal && (
        <motion.div
          className="z-10 w-full h-full bg-black"
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 1000 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ChartHeader />
          <div className="flex flex-col gap-4 ml-7 mr-7 mt-[85px]">
            <div className="rounded-xl bg-neutral-700">
              <ApexChart
                type="donut"
                options={options.chartOptions}
                series={options.series}
              />
            </div>
            <div className="rounded-md bg-neutral-700"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
