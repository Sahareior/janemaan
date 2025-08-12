import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import ParticipantProgress from "./_components/ParticipantProgress";
import Activity from "./_components/Activity";
import {
  useGetDashboardStatsQuery,
  useGetPrgressQuery,
  useGetUserGrowthQuery,
  useGetUserRevinewQuery,
} from "../../../../redux/slices/apiSlice";

export const StatCard = ({ title, value, color }) => (
  <div className="w-full h-[115px] md:flex mx-auto justify-center items-center bg-[#030712] border border-[#5D87A3] rounded-[12.76px] p-4">
    <div>
      <h3 className="text-[19px] popreg text-[#9E9E9E]">{title}</h3>
      <h4
        className={`${
          !color ? "text-[#2C739E]" : "text-white"
        } text-[29px] popbold font-bold`}
      >
        {value}
      </h4>
    </div>
  </div>
);

const Overview = () => {
  const currentYear = new Date().getFullYear();

  // Separate state for User Growth chart year filter
  const [selectedGrowthYear, setSelectedGrowthYear] = useState(currentYear);

  // Separate state for Revenue chart year filter
  const [selectedRevenueYear, setSelectedRevenueYear] = useState(currentYear);

  const { data: progress } = useGetPrgressQuery();
  const { data: overviewData } = useGetDashboardStatsQuery();
  const { data: userGrowthRaw } = useGetUserGrowthQuery();
  const { data: userRevinewRaw } = useGetUserRevinewQuery();

  // USER GROWTH FILTERING
  const filteredGrowthData = userGrowthRaw?.filter(
    (item) => item.year === selectedGrowthYear
  ) || [];

  const lastYearGrowthData = userGrowthRaw?.filter(
    (item) => item.year === selectedGrowthYear - 1
  ) || [];

  // Map last year for easy lookup
  const lastYearGrowthMap = new Map();
  lastYearGrowthData.forEach((item) => {
    lastYearGrowthMap.set(item.month, item.growth_percentage);
  });

  const userGrowth = filteredGrowthData.map((item) => ({
    day: item.month,
    thisYear: item.growth_percentage,
    lastYear: lastYearGrowthMap.get(item.month) || 0,
  }));

  // REVENUE FILTERING
  const revenueChartData =
    userRevinewRaw?.filter((item) => item.year === selectedRevenueYear).map((item) => ({
      name: item.month,
      value: item.revenue_percentage,
    })) || [];

  return (
    <div className="p-5 space-y-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard color={true} title="Total Revenue" value={overviewData?.total_revenue} />
        <StatCard color={true} title="New Users" value={overviewData?.total_user} />
        <StatCard color={true} title="Hunt Completion" value="55%" />
        <StatCard color={true} title="Drop out" value="23%" />
      </div>

      {/* User Growth Year Selector */}
 

      {/* User Growth Chart */}
      <div className="bg-[#111827] p-6 rounded-xl border border-[#5D87A3]">
        <div className="flex gap-3">
          <h3 className="text-white text-lg font-semibold flex mb-4">Total Users Growth</h3>
               <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSelectedGrowthYear(currentYear)}
          className={`px-4 py-2 flex items-center gap-2 rounded ${
            selectedGrowthYear === currentYear
              ? "bg-black text-white"
              : "bg-black text-gray-400"
          }`}
        >
         <div className="h-3 w-3 rounded-full bg-green-500" /> This Year ({currentYear})
        </button>
        <button
          onClick={() => setSelectedGrowthYear(currentYear - 1)}
          className={`px-4 py-2 flex items-center gap-2 rounded ${
            selectedGrowthYear === currentYear - 1
              ? "bg-black text-white"
              : "bg-black text-gray-400"
          }`}
        >
         <div className="h-3 w-3 rounded-full bg-red-500" /> Last Year ({currentYear - 1})
        </button>
      </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="1" stroke="#444" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="thisYear"
              stroke="#189EFE"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#AAAAAA"
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Year Selector */}


      {/* Revenue Chart */}
      <div className="bg-[#111827] p-6 rounded-xl border border-[#5D87A3]">
        <h3 className="text-white text-[18px] popreg py-5">Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueChartData}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#189EFE"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between gap-5">
        <ParticipantProgress participants={progress} />
        <Activity />
      </div>
    </div>
  );
};

export default Overview;
