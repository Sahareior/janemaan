import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { MdOutlineCalendarToday } from "react-icons/md";
import "antd/dist/reset.css";
import { FaEdit, FaEye } from "react-icons/fa";



const PrizeTable = ({ onOpenModal,data }) => {
const columns = [
  {
    title: "Claim Id",
    dataIndex: "id", // your API uses 'id'
    key: "id",
    render: (value) => (
      <span className="text-[#9E9E9E] popreg text-[16px]">{value}</span>
    ),
  },
  {
    title: "User",
    dataIndex: "user", // this is already correct
    key: "user",
    render: (value) => (
      <span className="popreg text-[16px] truncate block">
        <h3 className="text-[#9E9E9E]">{value.name}</h3>
        <span className="text-[#97BECA]">{value.email}</span>
      </span>
    ),
  },
  {
    title: "Price",
    dataIndex: ["user", "plan", "price"], // nested path to plan.price
    key: "price",
    render: (value) => (
      <span className="text-[#9E9E9E] flex items-center gap-2 popreg text-[17px]">
        R {value}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status", // matches API
    key: "status",
    render: (value) => {
      const color =
        {
          Approved: "bg-white ",
          pending: "bg-yellow-600/25 border-yellow-500", // lowercase from API
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
    dataIndex: "submitted_at", // API key
    key: "submitted_at",
    render: (value) => (
      <span className="text-[#97BECA] truncate max-w-[160px] flex gap-2 popreg ">
        <MdOutlineCalendarToday size={18} />
        {new Date(value).toLocaleDateString()} {/* formats ISO date */}
      </span>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (record) => (
      <div className="flex gap-3 items-center">
        <button
          onClick={() => onOpenModal({type:'view', data:record})}
          className="f3"
        >
          <FaEye size={22} />
        
        </button>
        <button
        onClick={() => onOpenModal({ type: 'edit', data: record })}

        >

          <FaEdit size={22} />
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
