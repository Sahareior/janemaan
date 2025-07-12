import React from "react";
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

const userChartData = [
  { day: "Mon", thisYear: 12000, lastYear: 9000 },
  { day: "Tue", thisYear: 15000, lastYear: 10000 },
  { day: "Wed", thisYear: 20000, lastYear: 12000 },
  { day: "Thu", thisYear: 18000, lastYear: 14000 },
  { day: "Fri", thisYear: 22000, lastYear: 16000 },
  { day: "Sat", thisYear: 24000, lastYear: 17000 },
  { day: "Sun", thisYear: 26000, lastYear: 20000 },
];

const revenueChartData = Array.from({ length: 12 }, (_, i) => ({
  value: 20 + Math.sin(i / 2) * 30 + i * 4,
  name: `${(i + 1) * 5}k`,
}));

export const StatCard = ({ title, value }) => (
  <div className="w-full h-[115px] flex justify-center items-center bg-[#030712] border border-[#5D87A3] rounded-[12.76px] p-4">
    <div>
      <h3 className="text-[19px] popreg text-[#9E9E9E]">{title}</h3>
      <h4 className="text-[29px] popbold text-white font-bold">{value}</h4>
    </div>
  </div>
);

const Overview = () => {
  return (
    <div className="p-5 space-y-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="RS 83,45746" />
        <StatCard title="New Users" value="1,245" />
        <StatCard title="Active Devices" value="512" />
        <StatCard title="Completed Hunts" value="234" />
      </div>

      {/* First Chart: Total Users */}
      <div className="bg-[#1E1E1E] p-6 rounded-xl border border-[#5D87A3]">
        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center justify-center gap-11">
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
          <div className="text-gray-300 text-sm">7 days</div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
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
      <div className="bg-[#1E1E1E] p-6 rounded-xl border border-[#5D87A3]">
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold">Revenue</h3>
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
