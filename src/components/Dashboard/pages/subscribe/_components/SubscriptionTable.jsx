import React, { useState } from "react";
import { Table, Tag, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Swal from "sweetalert2";
import SubCreationModal from "./SubCreationModal";
import { useDeletePlanMutation, useGetPlanQuery } from "../../../../../redux/slices/apiSlice";




const SubscriptionTable = ({plans}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [target,setTarget] = useState(null);
  const [editData, SetEditData] = useState({})
  const [deletePlan] = useDeletePlanMutation()
  const {data,refetch} =useGetPlanQuery()

  console.log('plans',plans)
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    background: "#1e1e2f",
    color: "#fff",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await deletePlan(id).unwrap();
      console.log('Delete successful', res);
      refetch()
      Swal.fire({
        title: "Deleted!",
        text: "Your plan has been deleted.",
        background: "#1e1e2f",
        color: "#fff",
        icon: "success",
      });
      
      // Optionally refresh your plans list here
    } catch (error) {
      console.error('Delete failed', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete plan.",
        background: "#1e1e2f",
        color: "#fff",
        icon: "error",
      });
    }
  }
};
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <span className="text-[#9E9E9E] font-bold popreg text-[17px]">{text}</span>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price, record) => (
      <span className="text-[#9E9E9E] font-bold popreg text-[17px]">
        {record.currency?.toUpperCase()} {price}
      </span>
    ),
  },
  {
    title: "Interval",
    dataIndex: "interval",
    key: "interval",
    render: (interval) => (
      <span className="text-[#9E9E9E] font-bold popreg text-[17px]">{interval}</span>
    ),
  },
  {
    title: "Discount",
    dataIndex: "discount_percent",
    key: "discount_percent",
    render: (discount) => (
      <span className="text-[#9E9E9E] popreg font-bold text-[17px]">{discount}%</span>
    ),
  },
{
  title: "Created On",
  dataIndex: "created_at",
  key: "created_at",
  render: (date) => (
    <span className="text-gray-400 text-[17px] popreg">
      {new Date(date).toLocaleDateString()}
    </span>
  ),
  // Optional: explicitly align the column
  align: "left",
},
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <EyeOutlined
          onClick={() => {
            SetEditData(record)
            setTarget("view");
            setIsModalOpen(true);
          }}
          className="text-[#9E9E9E] text-[22px] hover:text-blue-400 cursor-pointer"
        />

        <EditOutlined
          onClick={() => {
              SetEditData(record)
            setTarget("edit");
            setIsModalOpen(true);
          }}
          className="text-white hover:text-yellow-400 text-[22px] cursor-pointer"
        />
        <DeleteOutlined
          onClick={() => handleDelete(record.id)}
          className="text-red-500 hover:text-red-700 text-[22px] cursor-pointer"
        />
      </Space>
    ),
  },
];


  return (
    <div className="p-4  flex-1 justify-center rounded-xl bg-[#030712] text-white">
      <Table
        columns={columns}
        dataSource={plans}
        
        pagination={{ pageSize: 5 }}
        bordered={false}
        className="custom-ant-table bg-[#030712]"
      />

 <SubCreationModal
        data={editData}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        edit={target}
      />
    </div>
  );
};

export default SubscriptionTable;
