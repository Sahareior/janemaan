import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { MdOutlineCalendarToday } from "react-icons/md";
import "antd/dist/reset.css";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useDeleteClaimsMutation, useGetClaimsQuery } from "../../../../../redux/slices/apiSlice";



const PrizeTable = ({ onOpenModal,data }) => {
  const {data:claims, refetch} = useGetClaimsQuery()
console.log("claimed", data)
const [deleteClaims] = useDeleteClaimsMutation()

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
        await deleteClaims(hunt.id).unwrap();

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
  // {
  //   title: "Price",
  //   dataIndex: ["user", "plan", "price"], // nested path to plan.price
  //   key: "price",
  //   render: (value) => (
  //     <span className="text-[#9E9E9E] flex items-center gap-2 popreg text-[17px]">
  //       R {value}
  //     </span>
  //   ),
  // },
  {
    title: "Status",
    dataIndex: "status", // matches API
    key: "status",
    render: (value) => {
      const color =
        {
          approved: "bg-white text-black ",
          pending: "bg-yellow-600/25 text-white border-yellow-500", // lowercase from API
          rejected: "bg-red-600 text-white border-red-500",
        }[value] || "bg-green-500 text-white border-gray-500";

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
          className="text-slate-500 text-[24px]  cursor-pointer"
        >
          <EyeOutlined size={22} />
        
        </button>
        <button
        onClick={() => onOpenModal({ type: 'edit', data: record })}
      className="text-[#9E9E9E] text-[22px] hover:text-yellow-400 cursor-pointer"
        >

          <EditOutlined size={22} />
        </button>

                  <DeleteOutlined
            onClick={() => handleDelete(record)}
            className="text-red-500 text-[22px] hover:text-red-700 cursor-pointer"
          />
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
