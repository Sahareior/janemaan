import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BsSuitDiamondFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import CustomModal from "../../../../others/CustomModal";
import { useDeleteHuntMutation, useGetHuntsQuery } from "../../../../../redux/slices/apiSlice";

const CustomTable = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // store clicked row data
  const [deleteHunt] = useDeleteHuntMutation();
   const { data: huntData, isLoading,refetch } = useGetHuntsQuery();


const handleDelete = (hunt) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    background: "#1e1e2f",
    color: "#fff",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteHunt(hunt.id).unwrap();

        Swal.fire({
          title: "Deleted!",
          text: "Your hunt has been deleted.",
          background: "#1e1e2f",
          color: "#fff",
          icon: "success",
        });

        // Correct the typo here:
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.data?.message || "Failed to delete hunt",
          background: "#1e1e2f",
          color: "#fff",
          icon: "error",
        });
      }
    }
  });
};


  const columns = [
    {
      title: "Hunts",
      dataIndex: "hunt",
      key: "hunt",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            alt="hunt"
            className="w-10 h-10 rounded-md object-cover"
          />
          <span className="text-[#97BECA] truncate w-[120px]">
            {record.title}
          </span>
        </div>
      ),
    },
    {
      title: "Prize",
      dataIndex: "prize_amount",
      key: "prize_amount",
      render: (value) => (
        <div className="flex items-center gap-2 text-[#9E9E9E]">
          <img className="text-[14px]" src="/images/tro.png" alt="Trophy" />
          R {value}
        </div>
      ),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty_level",
      key: "difficulty_level",
      render: (level) => {
        const styleMap = {
          Easy: {
            bg: "bg-blue-600/25",
            border: "border-blue-500",
            text: "text-blue-500",
          },
          Medium: {
            bg: "bg-yellow-600/25",
            border: "border-yellow-500",
            text: "text-yellow-500",
          },
          Hard: {
            bg: "bg-red-700/25",
            border: "border-red-500",
            text: "text-red-500",
          },
        };

        const capitalized =
          level?.charAt(0).toUpperCase() + level?.slice(1).toLowerCase();
        const { bg, border, text } = styleMap[capitalized] || {
          bg: "bg-gray-500/25",
          border: "border-gray-500",
          text: "text-gray-500",
        };

        return (
          <Tag
            className={`${bg} ${border} text-white flex popbold justify-center text-[16px] items-center w-[100px] h-[36px] gap-1 rounded-[22px]`}
          >
            <BsSuitDiamondFill className={text} />
            {capitalized}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const capitalized =
          status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase();
        const colorMap = {
          Active: "bg-green-800",
          Draft: "bg-yellow-700",
          Completed: "bg-sky-900",
        };
        const color = colorMap[capitalized] || "bg-gray-500";

        return (
          <Tag
            className={`${color} text-white border-none font-bold w-[100px] popbold h-[36px] px-20 text-[16px] flex justify-center items-center rounded-[22px]`}
          >
            {capitalized}
          </Tag>
        );
      },
    },
    {
      title: "Participants",
      dataIndex: "hunters",
      key: "hunters",
      render: (count) => (
        <span className="text-[#9E9E9E] font-bold text-[17px]">{count}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link state={{
            data: record
          }} to="/dashboard/clue-management">
            <EyeOutlined className="text-[#9E9E9E] text-[22px] hover:text-blue-400 cursor-pointer" />
          </Link>
          <EditOutlined
            onClick={() => {
              setSelectedRecord(record); // store clicked row data
              setIsModalOpen(true);
            }}
            className="text-[#9E9E9E] text-[22px] hover:text-yellow-400 cursor-pointer"
          />
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            className="text-red-500 text-[22px] hover:text-red-700 cursor-pointer"
          />
        </Space>
      ),
    },
  ];

console.log("dsadad",selectedRecord)

  return (
    <div className="p-1 rounded-xl bg-[#030712] text-white">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 8 }}
        bordered={false}
        className="custom-ant-table bg-[#030712]"
      />
      <CustomModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        edit={true}
        data={selectedRecord} // pass record to modal
      />
    </div>
  );
};

export default CustomTable;
