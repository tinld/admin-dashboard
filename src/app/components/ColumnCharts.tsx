"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import React, { useEffect, useState } from "react";

export default function ColumnChart() {
  const [showPrevYear, setShowPrevYear] = useState(false);
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [showValue1, setShowValue1] = useState(true);
  const [showValue2, setShowValue2] = useState(true);
  const [showValue3, setShowValue3] = useState(true);
  let totalRevenue = 0;
  let totalCovers = 0;
  let averagePerDay = 0;
  let totalRevenuePrev = 0;
  let totalCoversPrev = 0;
  let averagePerDayPrev = 0;

  // Get data from localhost:3003/api/current-data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/analysis/current-data");
      const jsonData = await response.json();
      if (response.ok) {
        setData(jsonData);
      } else {
        console.error("Error fetching data:", jsonData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fetchPrevYearData = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/analysis/previous-data");
      const jsonData = await response.json();
      if (response.ok) {
        setPrevData(jsonData);
      } else {
        console.error("Error fetching data:", jsonData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchPrevYearData();
  }, []);

  // Merge data and prevData based on name
  const mergedData = data.map((item: any) => {
    const prevItem = prevData.find((p: any) => p.name === item.name);
    return {
      ...item,
      ...(prevItem || {}),
    };
  });

  if (mergedData.length > 0) {
    totalRevenue = data.reduce((sum: number, item: any) => sum + item.value1 + item.value2, 0);
    totalCovers = data.reduce((sum: number, item: any) => sum + item.value3, 0);
    averagePerDay = totalRevenue / data.length;
    totalRevenuePrev = prevData.reduce((sum: number, item: any) => sum + item.value1 + item.value2, 0);
    totalCoversPrev = prevData.reduce((sum: number, item: any) => sum + item.value3, 0);
    averagePerDayPrev = totalRevenuePrev / prevData.length;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-4 mb-2 w-full justify-between">
        <div className="flex w-full space-x-4 items-center">
          <h1 className="font-semibold text-2xl">This Week's Revenue Trend</h1>
          <div className="flex gap-10 justify-center w-7/12">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showValue1}
                onChange={() => setShowValue1((prev) => !prev)}
                className="h-5 w-5 accent-black border-gray-700 rounded focus:ring-black"
              />
              <span className="flex justify-center">
                <div className="w-4 h-px bg-black border-1"></div>
              </span>
              <span className="text-gray-700 font-semibold">POS Revenue</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showValue2}
                onChange={() => setShowValue2((prev) => !prev)}
                className="h-5 w-5 accent-black border-gray-700 rounded focus:ring-black"
              />
              <span className="flex justify-center text-blue-700">
                <div className="w-4 h-px bg-blue-700 border-1"></div>
              </span>
              <span className="text-gray-700">Eatclub Revenue</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showValue3}
                onChange={() => setShowValue3((prev) => !prev)}
                className="h-5 w-5 accent-black border-gray-700 rounded-lg focus:ring-black"
              />
              <span className="flex justify-center text-orange-600">
                <div className="w-4 h-px bg-black border-1"></div>
              </span>
              <span className="text-gray-700"><h1>Labour Costs</h1> </span>
            </label>
          </div>
          <button
            className={`px-4 py-2 flex items-center gap-2 rounded font-semibold transition rounded-2xl ${!showPrevYear ? "bg-[#FCC61D] text-black" : "bg-black text-white"}`}
            onClick={() => setShowPrevYear((prev) => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>


            {showPrevYear ? "Hide Previous Year" : "Compare with Previous Year"}
          </button>
          <button
            className={`px-4 py-2 flex items-center gap-2 rounded font-semibold transition rounded-2xl bg-gray-100 border border-gray-300 border-2 text-black`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>

            Export PNG
          </button>
        </div>

      </div>
      <div className="flex justify-between items-center mb-2 gap-10">
        <div className="bg-gray-100 p-2 rounded-lg w-1/3">
          <div>
            <h1 className="text-xl p-2">Total Revenue</h1>
            <h1 className="text-3xl font-bold p-2">${(totalRevenue / 1000).toFixed(1)}K {showPrevYear &&
              <>
                <span className="text-2xl font-bold text-gray-500">vs ${(totalRevenuePrev / 1000).toFixed(1)}K</span>
                {"  "}
                <span className={`text-2xl font-bold ${totalRevenue / totalRevenuePrev > 1 ? "text-green-500" : "text-red-500"
                  }`}>
                  (+{((totalRevenue / totalRevenuePrev) * 100 - 100).toFixed(0)}%)
                </span>
              </>
            }</h1>
          </div>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg w-1/3">
          <div>
            <h1 className="text-xl p-2">Average per Day</h1>
            <h1 className="text-3xl font-bold p-2">${(averagePerDay / 1000).toFixed(1)}K {showPrevYear &&
              <>
                <span className="text-2xl font-bold text-gray-500">vs ${(averagePerDayPrev / 1000).toFixed(1)}K</span>
                {"  "}
                <span className={`text-2xl font-bold ${averagePerDay / averagePerDayPrev > 1 ? "text-green-500" : "text-red-500"
                  }`}>
                  (+{((averagePerDay / averagePerDayPrev) * 100 - 100).toFixed(0)}%)
                </span>
              </>

            }</h1>
          </div>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg w-1/3">
          <div>
            <h1 className="text-xl p-2">Total Covers</h1>
            <h1 className="text-3xl font-bold p-2">{totalCovers} {showPrevYear &&
              <>
                <span className="text-2xl font-bold text-gray-500">vs {totalCoversPrev} </span>
                <span className={`text-2xl font-bold ${totalCovers / totalCoversPrev > 1 ? "text-green-500" : "text-red-500"
                  }`}>
                  (+{((totalCovers / totalCoversPrev) * 100 - 100).toFixed(0)}%)
                </span>
              </>
            }</h1>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mergedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {showValue1 && (
            <Bar dataKey="value1" stackId="a" fill="#040609ff" radius={[0, 0, 0, 0]} />
          )}
          {showValue2 && (
            <Bar dataKey="value2" stackId="a" fill="#0e43beff" radius={[6, 6, 0, 0]} />
          )}
          {showValue3 && (
            <Bar dataKey="value3" stackId="b" fill="#ea580c" radius={[6, 6, 0, 0]} />
          )}
          {showPrevYear && (
            <>
              {showValue1 && (
                <Bar dataKey="prevValue1" stackId="c" fill="#040609ff" radius={[0, 0, 0, 0]} fillOpacity={0.4} />
              )}
              {showValue2 && (
                <Bar dataKey="prevValue2" stackId="c" fill="#0e43beff" radius={[6, 6, 0, 0]} fillOpacity={0.4} />
              )}
              {showValue3 && (
                <Bar dataKey="prevValue3" stackId="d" fill="#ea580c" radius={[6, 6, 0, 0]} fillOpacity={0.4} />
              )}
            </>
          )}
        </BarChart>
      </ResponsiveContainer>


      {/* Note Color of Value */}
      <div className="gap-10 flex justify-center w-full mt-4 flex-grid grid-cols-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded-full"></div>
          <h1>POS Revenue</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
          <h1>EatClub Revenue</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
          <h1>Labour Costs</h1>
        </div>
        {
          showPrevYear && <><div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-black rounded-full"></div>
            <h1>POS Revenue</h1>
          </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
              <h1>EatClub Revenue</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
              <h1>Labour Costs</h1>
            </div></>
        }
        <div className="flex items-center gap-2 border-l-2 pl-4 border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-red-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
          </svg>

          <h1>Negative Event Impact</h1>
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-green-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>

          <h1>Positive Event Impact</h1>
        </div>
      </div>

    </div>
  );
}