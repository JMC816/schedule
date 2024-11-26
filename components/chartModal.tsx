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

  const count = (obj: Record<string, number>) => {
    if (!obj) {
      return [];
    }
    const value = Object.values(obj);
    return value;
  };

  const jan = count(chartData[202402]);
  const feb = count(chartData[202402]);
  const mar = count(chartData[202403]);
  const apr = count(chartData[202404]);
  const may = count(chartData[202405]);
  const jun = count(chartData[202406]);
  const jul = count(chartData[202407]);
  const aug = count(chartData[202408]);
  const sep = count(chartData[202409]);
  const oct = count(chartData[202410]);
  const nov = count(chartData[202411]);
  const dec = count(chartData[202412]);

  const chatValue = count(chartData[formatToDay()]);
  const chartOne = chatValue.filter((n) => n == 1).length;
  const chartTwo = chatValue.filter((n) => n == 2).length;
  const chartThree = chatValue.filter((n) => n == 3).length;
  const chartfour = chatValue.filter((n) => n == 4).length;
  const chartFive = chatValue.filter((n) => n == 5).length;
  const chartSixOver = chatValue.filter((n) => n >= 6).length;

  const january = {
    chartOne: jan.filter((n) => n == 1).length,
    chartTwo: jan.filter((n) => n == 2).length,
    chartThree: jan.filter((n) => n == 3).length,
    chartfour: jan.filter((n) => n == 4).length,
    chartFive: jan.filter((n) => n == 5).length,
    chartSixOver: jan.filter((n) => n >= 6).length,
  };
  const february = {
    chartOne: feb.filter((n) => n == 1).length,
    chartTwo: feb.filter((n) => n == 2).length,
    chartThree: feb.filter((n) => n == 3).length,
    chartfour: feb.filter((n) => n == 4).length,
    chartFive: feb.filter((n) => n == 5).length,
    chartSixOver: feb.filter((n) => n >= 6).length,
  };

  const march = {
    chartOne: mar.filter((n) => n == 1).length,
    chartTwo: mar.filter((n) => n == 2).length,
    chartThree: mar.filter((n) => n == 3).length,
    chartfour: mar.filter((n) => n == 4).length,
    chartFive: mar.filter((n) => n == 5).length,
    chartSixOver: mar.filter((n) => n >= 6).length,
  };

  const april = {
    chartOne: apr.filter((n) => n == 1).length,
    chartTwo: apr.filter((n) => n == 2).length,
    chartThree: apr.filter((n) => n == 3).length,
    chartfour: apr.filter((n) => n == 4).length,
    chartFive: apr.filter((n) => n == 5).length,
    chartSixOver: apr.filter((n) => n >= 6).length,
  };

  const mays = {
    chartOne: may.filter((n) => n == 1).length,
    chartTwo: may.filter((n) => n == 2).length,
    chartThree: may.filter((n) => n == 3).length,
    chartfour: may.filter((n) => n == 4).length,
    chartFive: may.filter((n) => n == 5).length,
    chartSixOver: may.filter((n) => n >= 6).length,
  };

  const june = {
    chartOne: jun.filter((n) => n == 1).length,
    chartTwo: jun.filter((n) => n == 2).length,
    chartThree: jun.filter((n) => n == 3).length,
    chartfour: jun.filter((n) => n == 4).length,
    chartFive: jun.filter((n) => n == 5).length,
    chartSixOver: jun.filter((n) => n >= 6).length,
  };

  const july = {
    chartOne: jul.filter((n) => n == 1).length,
    chartTwo: jul.filter((n) => n == 2).length,
    chartThree: jul.filter((n) => n == 3).length,
    chartfour: jul.filter((n) => n == 4).length,
    chartFive: jul.filter((n) => n == 5).length,
    chartSixOver: jul.filter((n) => n >= 6).length,
  };

  const august = {
    chartOne: aug.filter((n) => n == 1).length,
    chartTwo: aug.filter((n) => n == 2).length,
    chartThree: aug.filter((n) => n == 3).length,
    chartfour: aug.filter((n) => n == 4).length,
    chartFive: aug.filter((n) => n == 5).length,
    chartSixOver: aug.filter((n) => n >= 6).length,
  };

  const september = {
    chartOne: sep.filter((n) => n == 1).length,
    chartTwo: sep.filter((n) => n == 2).length,
    chartThree: sep.filter((n) => n == 3).length,
    chartfour: sep.filter((n) => n == 4).length,
    chartFive: sep.filter((n) => n == 5).length,
    chartSixOver: sep.filter((n) => n >= 6).length,
  };

  const october = {
    chartOne: oct.filter((n) => n == 1).length,
    chartTwo: oct.filter((n) => n == 2).length,
    chartThree: oct.filter((n) => n == 3).length,
    chartfour: oct.filter((n) => n == 4).length,
    chartFive: oct.filter((n) => n == 5).length,
    chartSixOver: oct.filter((n) => n >= 6).length,
  };

  const november = {
    chartOne: nov.filter((n) => n == 1).length,
    chartTwo: nov.filter((n) => n == 2).length,
    chartThree: nov.filter((n) => n == 3).length,
    chartfour: nov.filter((n) => n == 4).length,
    chartFive: nov.filter((n) => n == 5).length,
    chartSixOver: nov.filter((n) => n >= 6).length,
  };

  const december = {
    chartOne: dec.filter((n) => n == 1).length,
    chartTwo: dec.filter((n) => n == 2).length,
    chartThree: dec.filter((n) => n == 3).length,
    chartfour: dec.filter((n) => n == 4).length,
    chartFive: dec.filter((n) => n == 5).length,
    chartSixOver: dec.filter((n) => n >= 6).length,
  };

  const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const donutOptions = {
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
    },
  };
  const BarOptions: ApexOptions = {
    series: [
      {
        data: [
          january.chartOne,
          february.chartOne,
          march.chartOne,
          april.chartOne,
          mays.chartOne,
          june.chartOne,
          july.chartOne,
          august.chartOne,
          september.chartOne,
          october.chartOne,
          november.chartOne,
          december.chartOne,
        ],
      },
      {
        data: [
          january.chartTwo,
          february.chartTwo,
          march.chartTwo,
          april.chartTwo,
          mays.chartTwo,
          june.chartTwo,
          july.chartTwo,
          august.chartTwo,
          september.chartTwo,
          october.chartTwo,
          november.chartTwo,
          december.chartTwo,
        ],
      },
      {
        data: [
          january.chartThree,
          february.chartThree,
          march.chartThree,
          april.chartThree,
          mays.chartThree,
          june.chartThree,
          july.chartThree,
          august.chartThree,
          september.chartThree,
          october.chartThree,
          november.chartThree,
          december.chartThree,
        ],
      },
      {
        data: [
          january.chartfour,
          february.chartfour,
          march.chartfour,
          april.chartfour,
          mays.chartfour,
          june.chartfour,
          july.chartfour,
          august.chartfour,
          september.chartfour,
          october.chartfour,
          november.chartfour,
          december.chartfour,
        ],
      },
      {
        data: [
          january.chartFive,
          february.chartFive,
          march.chartFive,
          april.chartFive,
          mays.chartFive,
          june.chartFive,
          july.chartFive,
          august.chartFive,
          september.chartFive,
          october.chartFive,
          november.chartFive,
          december.chartFive,
        ],
      },
      {
        data: [
          january.chartSixOver,
          february.chartSixOver,
          march.chartSixOver,
          april.chartSixOver,
          mays.chartSixOver,
          june.chartSixOver,
          july.chartSixOver,
          august.chartSixOver,
          september.chartSixOver,
          october.chartSixOver,
          november.chartSixOver,
          december.chartSixOver,
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
