"use client";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ColumnChart from "@/app/components/ColumnCharts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["May", "June", "July", "August", "September"],
  datasets: [
    {
      label: "Sales",
      data: [120, 150, 170, 140, 180],
      backgroundColor: "rgba(59, 130, 246, 0.7)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Monthly Sales" },
  },
};

export default function Analysis() {
  return (
    <main>
      <div className="w-full m-2 bg-white rounded-lg p-6">
        <ColumnChart />
      </div>
    </main>
  );
}