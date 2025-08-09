import React, { useState } from "react";
import { Table, Tag, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Swal from "sweetalert2";
import SubCreationModal from "./SubCreationModal";

const data = [
  {
    key: 1,
    name: "Basic Plan",
    price: 9.99,
    interval: "Monthly",
    discount: 10,
  },
  {
    key: 2,
    name: "Pro Plan",
    price: 29.99,
    interval: "Yearly",
    discount: 25,
  },
];


const SubscriptionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [target,setTarget] = useState(null);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      background: "#1e1e2f",
      color: "#fff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          background: "#1e1e2f",
          color: "#fff",
          icon: "success",
        });
      }
    });
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
    render: (text) => (
      <span className="text-[#9E9E9E] font-bold popreg text-[17px]">${text}</span>
    ),
  },
  {
    title: "Interval",
    dataIndex: "interval",
    key: "interval",
    render: (text) => (
      <span className="text-[#9E9E9E] font-bold popreg text-[17px]">{text}</span>
    ),
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    render: (text) => (
      <span className="text-[#9E9E9E] popreg font-bold text-[17px]">{text}%</span>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space size="middle">
         <EyeOutlined onClick={() => {
           setTarget("view");
          setIsModalOpen(true);
         }} className="text-[#9E9E9E] text-[22px] hover:text-blue-400 cursor-pointer" />

        <EditOutlined
          onClick={() => {
            setTarget("edit");
            setIsModalOpen(true);
          } }
          className="text-white hover:text-yellow-400 text-[22px] cursor-pointer"
        />
        <DeleteOutlined
          onClick={() => handleDelete()}
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
        dataSource={data}
        
        pagination={{ pageSize: 5 }}
        bordered={false}
        className="custom-ant-table bg-[#030712]"
      />

 <SubCreationModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        edit={target}
      />
    </div>
  );
};

export default SubscriptionTable;
