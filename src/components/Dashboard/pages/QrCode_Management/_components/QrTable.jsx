import React, { useState } from "react";
import { Table, Tag, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { PiQrCodeBold } from "react-icons/pi";
import { FaLocationPin } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineCalendarToday } from "react-icons/md";
import Qrmodal from "./modal/Qrmodal";
import ClueModal from "../../Clue_Management/_components/modal/ClueModal";
import Swal from "sweetalert2";
import { useDeleteQrCodeMutation, useGetQrCodesQuery } from "../../../../../redux/slices/apiSlice";


const data = [
  {
    key: 1,
    qrcode: "QRCODE001",
    status: "scanned",
    scans: 480,
    location: "Cape Town",
    created: "2023-10-01",
    expires: "2024-10-01",
  },
  {
    key: 2,
    qrcode: "QRCODE002",
    status: "expired",
    scans: 342,
    location: "Cape Town",
    created: "2023-11-15",
    expires: "2024-11-15",
  },
];

const QrTable = ({qrCode}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [qrdata, setQrdata] = useState()
  const [deleteQrCode] = useDeleteQrCodeMutation()
    const { data,refetch } = useGetQrCodesQuery();
  

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    background: "#1e1e2f",
    color: "#fff",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await deleteQrCode(id); // make sure deleteQrCode returns a promise

      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        background: "#1e1e2f",
        color: "#fff",
        icon: "success",
      });

      // Optionally refetch or update UI here
      refetch();
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete file.",
        background: "#1e1e2f",
        color: "#fff",
        icon: "error",
      });
    }
  }
};

const columns = [
  {
    title: "QR Code",
    dataIndex: "qr_image",
    key: "qr_image",
    render: (qr_image, record) => (
      <span
        onClick={() => setIsModalOpen(true)}
        className="text-[17px] text-[#9E9E9E] flex justify-start items-center gap-3 px-3 py-2"
      >
        <img
          className="h-[50px] w-[50px] hover:cursor-pointer"
          src={qr_image}
          alt={record.code}
        />
        {record.code}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "is_active",
    key: "is_active",
    render: (is_active) => {
      const status = is_active ? "active" : "inactive";
      const tagColor = is_active
        ? "bg-[#2765A1]/25 border border-[#2765A1]"
        : "bg-[#995900]/25 border border-[#995900]";

      return (
        <Tag
          className={`${tagColor} text-white font-bold w-[100px] h-[36px] flex justify-center items-center rounded-[22px]`}
        >
          {status}
        </Tag>
      );
    },
  },
  {
    title: "Scans",
    key: "scans",
    render: () => (
      <span className="text-[#9E9E9E] font-bold text-[17px]">—</span>
    ), // No scans in your object, placeholder used
  },
  {
    title: "Location",
    key: "location",
    render: (record) => (
      <span className="text-[#9E9E9E] flex justify-center items-center gap-3 text-[17px] popreg">
        <CiLocationOn size={18} />
        {record.latitude}, {record.longitude}
      </span>
    ),
  },
  {
    title: "Created On",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => (
      <span className="text-gray-400 flex justify-center items-center gap-3 text-[17px] popreg">
        <MdOutlineCalendarToday /> {new Date(date).toLocaleDateString()}
      </span>
    ),
  },
  {
    title: "Expires On",
    dataIndex: "updated_at", // Not in object, but using updated_at as placeholder
    key: "updated_at",
    render: (date) => (
      <span className="text-gray-400 flex justify-center items-center gap-3 text-[17px] popreg">
        <MdOutlineCalendarToday /> {new Date(date).toLocaleDateString()}
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
              setQrdata(record); 
              setIsEditModalOpen(true);
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
    <div className="p-4 rounded-xl bg-[#030712] text-white">
      <Table
        columns={columns}
        dataSource={qrCode}
        pagination={{ pageSize: 5 }}
        bordered={false}
        className="custom-ant-table bg-[#030712]"
      />

      <Qrmodal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
      <ClueModal
        edit={true}
        open={isEditModalOpen}
        onOk={() => setIsEditModalOpen(false)}
        onCancel={() => setIsEditModalOpen(false)}
        data={qrdata}
        position = {true}
      />
    </div>
  );
};

export default QrTable;
