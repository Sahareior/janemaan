import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Swal from "sweetalert2";

import { useDeleteVoucherMutation, useGetAllVoucherQuery, useGetHuntsQuery } from "../../../../../redux/slices/apiSlice";
import VoucherModal from "./VoucherModal";


const VoucherTable = ({ vouchers: initialVouchers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteVoucher] = useDeleteVoucherMutation();
  const { data: ssss, isLoading, refetch } = useGetAllVoucherQuery();
    const { data: huntData } = useGetHuntsQuery();

  // Local state for instant UI updates
  const [vouchers, setVouchers] = useState(initialVouchers || []);

  // Keep vouchers in sync if parent prop changes
  useEffect(() => {
    setVouchers(initialVouchers || []);
  }, [initialVouchers]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This voucher will be deleted!",
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
        await deleteVoucher(id).unwrap();

        // Remove voucher locally for instant UI update
        const updatedVouchers = vouchers.filter((v) => v.id !== id);
        setVouchers(updatedVouchers);

        Swal.fire({
          title: "Deleted!",
          text: "Voucher has been deleted.",
          background: "#1e1e2f",
          color: "#fff",
          icon: "success",
        });

        // Optional: refetch backend data to ensure sync
        refetch();
      } catch (error) {
        console.error("Delete failed", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete voucher.",
          background: "#1e1e2f",
          color: "#fff",
          icon: "error",
        });
      }
    }
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => (
        <span className="text-[#9E9E9E] font-bold popreg text-[17px]">{text}</span>
      ),
    },
{
  title: "Hunt",
  dataIndex: "hunt",
  key: "hunt",
  render: (huntId) => {
    // Find hunt by ID
    const hunt = huntData?.results?.find((h) => h.id === huntId);

    return (
      <span className="text-gray-400 text-[15px] popreg">
        {hunt ? hunt.title : "Unknown Hunt"}
      </span>
    );
  },
},
{
  title: "Status",
  dataIndex: "status",
  key: "status",
  render: (status) => {
    const styleMap = {
      Active: {
        bg: "bg-blue-600/25",
        border: "border-blue-500",
        text: "text-blue-500",
      },
      Claimed: {
        bg: "bg-green-600/25",
        border: "border-green-500",
        text: "text-green-500",
      },
      Expired: {
        bg: "bg-red-600/25",
        border: "border-red-500",
        text: "text-red-500",
      },
    };

    const capitalized =
      status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase();

    const { bg, border, text } = styleMap[capitalized] || {
      bg: "bg-gray-500/25",
      border: "border-gray-500",
      text: "text-gray-500",
    };

    return (
      <Tag
        className={`${bg} ${border} ${text} flex popbold justify-center text-[16px] items-center w-[110px] h-[36px] gap-1 rounded-[22px]`}
      >
        {capitalized}
      </Tag>
    );
  },
},


    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      render: (date) => (
        <span className="text-[#9E9E9E] popreg text-[15px]">
          {new Date(date).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Created On",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => (
        <span className="text-gray-400 text-[15px] popreg">
          {new Date(date).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setEditData(record);
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
    <div className="p-4 flex-1 justify-center rounded-xl bg-[#030712] text-white">
      <Table
        columns={columns}
        dataSource={vouchers || []}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        bordered={false}
        className="custom-ant-table bg-[#030712]"
      />

      <VoucherModal
        data={editData}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        edit={true}
      
      />
    </div>
  );
};

export default VoucherTable;
