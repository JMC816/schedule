"use client";

import dynamic from "next/dynamic";
import ChartHeader from "./chartHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useChartStore, useModalStore } from "@/store";
import { ApexOptions } from "apexcharts";

export default function ChartModal() {
  const { chartModal } = useModalStore();
  const { chartData } = useChartStore();
  const formatToDay = () => {
    const today = new Date()
      .toLocaleDateString()
      .replace(/\./g, "")
      .split(" ")
      .join("");
    const year = today.slice(0, 4);
    const months = today.slice(4, 6).padStart(2, "0");
    return `${year}${months}`;
  };

  const years = () => {
    const today = new Date()
      .toLocaleDateString()
      .replace(/\./g, "")
      .split(" ")
      .join("");
    const year = today.slice(0, 4);
    return `${year}`;
  };

  const count = (obj: Record<string, number>) => {
    if (!obj) {
      return [];
    }
    const value = Object.values(obj);
    return value;
  };

  const jan = count(chartData[years() + `01`]);
  const feb = count(chartData[years() + `02`]);
  const mar = count(chartData[years() + `03`]);
  const apr = count(chartData[years() + `04`]);
  const may = count(chartData[years() + `05`]);
  const jun = count(chartData[years() + `06`]);
  const jul = count(chartData[years() + `07`]);
  const aug = count(chartData[years() + `08`]);
  const sep = count(chartData[years() + `09`]);
  const oct = count(chartData[years() + `10`]);
  const nov = count(chartData[years() + `11`]);
  const dec = count(chartData[years() + `12`]);

  const chartValue = count(chartData[formatToDay()]);

  const chartOne = (month: number[]) => {
    const one = month.filter((n) => n == 1).length;
    return one;
  };
  const chartTwo = (month: number[]) => {
    const two = month.filter((n) => n == 2).length;
    return two;
  };
  const chartThree = (month: number[]) => {
    const three = month.filter((n) => n == 3).length;
    return three;
  };
  const chartFour = (month: number[]) => {
    const four = month.filter((n) => n == 4).length;
    return four;
  };
  const chartFive = (month: number[]) => {
    const five = month.filter((n) => n == 5).length;
    return five;
  };
  const chartSixOver = (month: number[]) => {
    const sixOver = month.filter((n) => n == 6).length;
    return sixOver;
  };

  const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const donutOptions = {
    series: [
      chartOne(chartValue),
      chartTwo(chartValue),
      chartThree(chartValue),
      chartFour(chartValue),
      chartFive(chartValue),
      chartSixOver(chartValue),
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
    },
  };
  const BarOptions: ApexOptions = {
    series: [
      {
        data: [
          chartOne(jan),
          chartOne(feb),
          chartOne(mar),
          chartOne(apr),
          chartOne(may),
          chartOne(jun),
          chartOne(jul),
          chartOne(aug),
          chartOne(sep),
          chartOne(oct),
          chartOne(nov),
          chartOne(dec),
        ],
      },
      {
        data: [
          chartTwo(jan),
          chartTwo(feb),
          chartTwo(mar),
          chartTwo(apr),
          chartTwo(may),
          chartTwo(jun),
          chartTwo(jul),
          chartTwo(aug),
          chartTwo(sep),
          chartTwo(oct),
          chartTwo(nov),
          chartTwo(dec),
        ],
      },
      {
        data: [
          chartThree(jan),
          chartThree(feb),
          chartThree(mar),
          chartThree(apr),
          chartThree(may),
          chartThree(jun),
          chartThree(jul),
          chartThree(aug),
          chartThree(sep),
          chartThree(oct),
          chartThree(nov),
          chartThree(dec),
        ],
      },
      {
        data: [
          chartFour(jan),
          chartFour(feb),
          chartFour(mar),
          chartFour(apr),
          chartFour(may),
          chartFour(jun),
          chartFour(jul),
          chartFour(aug),
          chartFour(sep),
          chartFour(oct),
          chartFour(nov),
          chartFour(dec),
        ],
      },
      {
        data: [
          chartFive(jan),
          chartFive(feb),
          chartFive(mar),
          chartFive(apr),
          chartFive(may),
          chartFive(jun),
          chartFive(jul),
          chartFive(aug),
          chartFive(sep),
          chartFive(oct),
          chartFive(nov),
          chartFive(dec),
        ],
      },
      {
        data: [
          chartSixOver(jan),
          chartSixOver(feb),
          chartSixOver(mar),
          chartSixOver(apr),
          chartSixOver(may),
          chartSixOver(jun),
          chartSixOver(jul),
          chartSixOver(aug),
          chartSixOver(sep),
          chartSixOver(oct),
          chartSixOver(nov),
          chartSixOver(dec),
        ],
      },
    ],
    chart: {
      stacked: true,
      height: "100%",
      width: "100%",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      labels: {
        style: {
          colors: "#fff",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },

    colors: ["#dcfce7", "#86efac", "#22c55e", "#15803d", "#14532d", "#052e16"],
  };

  return (
    <AnimatePresence>
      {chartModal && (
        <motion.div
          className="z-10 w-full h-full overflow-auto bg-black"
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 1000 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ChartHeader />
          <div className="flex flex-col gap-4 ml-7 mr-7 mt-[85px] mb-24">
            <div className="rounded-xl bg-neutral-700">
              <ApexChart
                type="donut"
                options={donutOptions.chartOptions}
                series={donutOptions.series}
              />
            </div>
            <div className="rounded-md bg-neutral-700">
              <ApexChart
                type="bar"
                series={BarOptions.series}
                options={BarOptions}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
