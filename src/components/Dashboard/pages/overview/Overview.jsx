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
import { Spin } from "antd"; // 👈 import Spin
import ParticipantProgress from "./_components/ParticipantProgress";
import Activity from "./_components/Activity";
import {
  useGetDashboardStatsQuery,
  useGetHuntsQuery,
  useGetPrgressQuery,
  useGetTopHuntQuery,
  useGetUserGrowthQuery,
  useGetUserRevinewQuery,
} from "../../../../redux/slices/apiSlice";

export const StatCard = ({ title, value, color }) => {
  const displayValue = value ?? 0;
  const formattedValue =
    typeof displayValue === "number"
      ? displayValue.toLocaleString()
      : displayValue;

  return (
    <div className="w-full h-[115px] md:flex mx-auto justify-center items-center bg-[#030712] border border-[#5D87A3] rounded-[12.76px] p-4">
      <div>
        <h3 className="text-[19px] popreg text-[#9E9E9E]">{title}</h3>
        <h4
          className={`${
            !color ? "text-[#2C739E]" : "text-white"
          } text-[29px] popbold font-bold`}
        >
          {formattedValue}
        </h4>
      </div>
    </div>
  );
};

const Overview = () => {
  const currentYear = new Date().getFullYear();

  const [selectedGrowthYear, setSelectedGrowthYear] = useState(currentYear);
  const [selectedRevenueYear, setSelectedRevenueYear] = useState(currentYear);

  // Queries
  const { data: progress, isLoading: loadingProgress } = useGetPrgressQuery();
  const { data: overviewData, isLoading: loadingOverview } = useGetDashboardStatsQuery();
  const { data: userGrowthRaw, isLoading: loadingGrowth } = useGetUserGrowthQuery();
  const { data: userRevinewRaw, isLoading: loadingRevenue } = useGetUserRevinewQuery();
  const { data: topHunts, isLoading: loadingTopHunts } = useGetTopHuntQuery();
  const { data: huntsData, isLoading: loadingHunts } = useGetHuntsQuery();

  // Combine loading states
  const isLoading =
    loadingProgress ||
    loadingOverview ||
    loadingGrowth ||
    loadingRevenue ||
    loadingTopHunts ||
    loadingHunts;

  // Show spinner if loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  // --- Data Processing ---
  const filteredGrowthData =
    userGrowthRaw?.filter((item) => item.year === selectedGrowthYear) || [];

  const lastYearGrowthData =
    userGrowthRaw?.filter((item) => item.year === selectedGrowthYear - 1) || [];

  const lastYearGrowthMap = new Map();
  lastYearGrowthData.forEach((item) => {
    lastYearGrowthMap.set(item.month, item.growth_percentage);
  });

  const userGrowth = filteredGrowthData.map((item) => ({
    day: item.month,
    thisYear: item.growth_percentage,
    lastYear: lastYearGrowthMap.get(item.month) || 0,
  }));

  const revenueChartData =
    userRevinewRaw
      ?.filter((item) => item.year === selectedRevenueYear)
      .map((item) => ({
        name: item.month,
        value: item.revenue_percentage,
      })) || [];

  const completedCount = huntsData?.results?.filter(
    (item) => item.status === "completed"
  ).length;
  const totalCount = huntsData?.results?.length;
  const completionPercentage =
    totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(2) : 0;

  return (
    <div className="p-5 space-y-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          color={true}
          title="Total Revenue"
          value={`R ${overviewData?.total_revenue ?? 0} `}
        />
        <StatCard
          color={true}
          title="New Users"
          value={overviewData?.total_user ?? 0}
        />
        <StatCard
          color={true}
          title="Hunt Completion"
          value={`${completionPercentage ?? 0}%`}
        />
        <StatCard
          color={true}
          title="Subscriber"
          value={overviewData?.total_subscriber ?? 0}
        />
      </div>

      {/* User Growth Chart */}
      <div className="bg-[#111827] p-6 rounded-xl border border-[#5D87A3]">
        <div className="flex gap-3">
          <h3 className="text-white text-lg font-semibold flex mb-4">
            Total Users Growth
          </h3>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSelectedGrowthYear(currentYear)}
              className={`px-4 py-2 flex items-center gap-2 rounded ${
                selectedGrowthYear === currentYear
                  ? "bg-black text-white"
                  : "bg-black text-gray-400"
              }`}
            >
              <div className="h-3 w-3 rounded-full bg-green-500" /> This Year (
              {currentYear})
            </button>
            <button
              onClick={() => setSelectedGrowthYear(currentYear - 1)}
              className={`px-4 py-2 flex items-center gap-2 rounded ${
                selectedGrowthYear === currentYear - 1
                  ? "bg-black text-white"
                  : "bg-black text-gray-400"
              }`}
            >
              <div className="h-3 w-3 rounded-full bg-red-500" /> Last Year (
              {currentYear - 1})
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
        <ParticipantProgress participants={progress} hunts={huntsData} />
        <Activity topHunts={topHunts} />
      </div>
    </div>
  );
};

export default Overview;
