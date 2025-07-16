import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { MdOutlineCalendarToday } from "react-icons/md";
import "antd/dist/reset.css";
import { FaEye } from "react-icons/fa";

const data = [
  {
    key: 1,
    claimid: "CPM001",
    user: {
      name: "John Doe",
      email: "sahareada@gmail.com",
    },
    prize: "2222",
    status: "Approved",
    submitted: "2023-10-01",
  },
  {
    key: 4,
    claimid: "CPM002",
    user: {
      name: "John Doe",
      email: "sahareada@gmail.com",
    },
    prize: "2222",
    status: "Approved",
    submitted: "2023-10-01",
  },
  {
    key: 3,
    claimid: "CPM003",
    user: {
      name: "John Doe",
      email: "sahareada@gmail.com",
    },
    prize: "2222",
    status: "Approved",
    submitted: "2023-10-01",
  },
  {
    key: 2,
    claimid: "CPM004",
    user: {
      name: "John Doe",
      email: "sahareada@gmail.com",
    },
    prize: "2222",
    status: "Rejected",
    submitted: "2023-10-01",
  },
];

const PrizeTable = ({ onOpenModal }) => {
  const columns = [
    {
      title: "Claim Id",
      dataIndex: "claimid", // ✅ matches your data
      key: "claimid",
      render: (value) => (
        <span className="text-[#9E9E9E] popreg text-[16px]">{value}</span>
      ),
    },
    {
      title: "User",
      dataIndex: "user", // ✅ matches your data
      key: "user",
      render: (value) => {
        return (
          <span className=" popreg text-[16px] truncate  block">
            <h3 className="text-[#9E9E9E]">{value.name}</h3>

            <span className="text-[#97BECA]"> {value.email}</span>
          </span>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "prize", // ✅ matches your data
      key: "prize",
      render: (value) => (
        <span className="text-[#9E9E9E] flex items-center gap-2 popreg text-[17px]">
          RS {value}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status", // pretend 'status' holds QR code ID for now
      key: "status",
      render: (value) => {
        const color =
          {
            Approved: "bg-white text-black",
            Pending: "bg-yellow-600/25 border-yellow-500",
            Rejected: "bg-red-600 border-red-500",
          }[value] || "bg-gray-500/25 border-gray-500";

        return (
          <Tag
            className={`${color} text-black font-bold w-[100px] h-[36px] popreg flex justify-center items-center rounded-[22px]`}
          >
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Submission",
      dataIndex: "submitted",
      key: "submitted",
      render: (value) => (
        <span className="text-[#97BECA] truncate max-w-[160px] flex gap-2 popreg block">
          <MdOutlineCalendarToday size={18} />

          {value}
        </span>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div>
          <button
            onClick={() => onOpenModal()}
            className="flex justify-center popreg border border-[#5D87A3] hover:bg-slate-700 bg-black w-[143px] h-[48px] text-gray-400 items-center gap-3"
          >
            <FaEye size={22} />
            Review
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="p-4 rounded-xl bg-[#030712] text-white">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered={false}
        className="custom-ant-table bg-[#030712]"
      />
    </div>
  );
};

export default PrizeTable;
