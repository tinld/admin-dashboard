"use client";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ColumnChart from "@/app/components/ColumnCharts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analysis() {
  // If don't have token, redirect to login
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-gray-100">
      <div className="w-full h-[40rem] m-2 bg-white rounded-lg p-6">
        <ColumnChart />
      </div>
    </main>
  );
}