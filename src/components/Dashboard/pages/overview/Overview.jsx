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
import { FaChevronDown } from "react-icons/fa";
import ParticipantProgress from "./_components/ParticipantProgress";
import Activity from "./_components/Activity";

const userChartData = {
  "7days": [
    { day: "Mon", thisYear: 12000, lastYear: 9000 },
    { day: "Tue", thisYear: 15000, lastYear: 10000 },
    { day: "Wed", thisYear: 20000, lastYear: 12000 },
    { day: "Thu", thisYear: 18000, lastYear: 14000 },
    { day: "Fri", thisYear: 22000, lastYear: 16000 },
    { day: "Sat", thisYear: 24000, lastYear: 17000 },
    { day: "Sun", thisYear: 26000, lastYear: 20000 },
  ],
  "30days": [
    { day: "Week 1", thisYear: 18000, lastYear: 13000 },
    { day: "Week 2", thisYear: 21000, lastYear: 14000 },
    { day: "Week 3", thisYear: 24000, lastYear: 17000 },
    { day: "Week 4", thisYear: 28000, lastYear: 20000 },
  ],
};

const revenueChartData = Array.from({ length: 12 }, (_, i) => ({
  value: 20 + Math.sin(i / 2) * 30 + i * 4,
  name: `${(i + 1) * 5}k`,
}));

export const StatCard = ({ title, value, color }) => (
  <div className="w-full h-[115px] md:flex mx-auto justify-center items-center bg-[#030712] border border-[#5D87A3] rounded-[12.76px] p-4">
    <div>
      <h3 className="text-[19px] popreg text-[#9E9E9E]">{title}</h3>
      <h4 className={`${!color ? "text-[#2C739E]" : "text-white"} text-[29px] popbold font-bold`}>{value}</h4>
    </div>
  </div>
);

const Overview = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const [userData, setUserData] = useState(userChartData["7days"]);

  // Function to toggle between 7 days and 30 days
  const handleTimeRangeClick = () => {
    const newTimeRange = timeRange === "7days" ? "30days" : "7days";
    setTimeRange(newTimeRange);
    setUserData(userChartData[newTimeRange]); // Update chart data
  };

  return (
    <div className="p-5 space-y-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard color={true} title="Total Revenue" value="R 83,45746" />
        <StatCard color={true} title="New Users" value="1,245" />
        <StatCard color={true} title="Hunt Completion" value="55%" />
        <StatCard color={true} title="Drop out" value="23%" />
      </div>

      {/* First Chart: Total Users */}
      <div className="bg-[#111827] p-6 rounded-xl border border-[#5D87A3]">
        <div className="flex justify-between bg-[#111827] items-center mb-4">
          <div className="flex items-center bg-[#111827] justify-center gap-11">
            <h3 className="text-white text-lg font-semibold">Total Users</h3>
            <div className="flex justify-between gap-12 popreg text-xs text-white">
              {/* This Year */}
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#189EFE]"></span>
                <span className="text-sm">This Year</span>
              </div>

              {/* Last Year */}
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#AAAAAA]"></span>
                <span className="text-sm">Last Year</span>
              </div>
            </div>
          </div>
          {/* Clicking on this will toggle between 7 days and 30 days */}
          <div
            onClick={handleTimeRangeClick}
            className="text-gray-300 text-sm flex justify-center items-center gap-3 cursor-pointer"
          >
            {timeRange === "7days" ? "7 days" : "30 days"} <FaChevronDown />
          </div>
        </div>
        <ResponsiveContainer className="bg-[#111827]" width="100%" height={300}>
          <LineChart data={userData}>
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

      {/* Second Chart: Revenue */}
      <div className="bg-[#111827] p-6 rounded-xl border border-[#5D87A3]">
        <div className="mb-4">
          <h3 className="text-white text-[18px] popreg py-5">Revenue</h3>
        </div>
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
        <ParticipantProgress />
        <Activity />
      </div>
    </div>
  );
};

export default Overview;
