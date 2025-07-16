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

const QrTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      title: "QR Code",
      dataIndex: "qrcode",
      key: "qrcode",
      render: (value) => (
        <span
          onClick={() => setIsModalOpen(true)}
          className="text-[17px]  text-[#9E9E9E]  flex justify-start items-center gap-3 w-  px-3 py-2"
        >
          <img className="h-[50px] w-[50px]" src="/images/qr.png" alt="" />
          {value}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const tagColor =
          {
            scanned: "bg-[#2765A1]/25 border border-[#2765A1]",
            draft: "bg-[#995900]/25 border border-[#995900]",
            expired: "bg-red-500/25 border border-red-500", // <-- Add this too
          }[status] || "bg-gray-500";

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
      dataIndex: "scans",
      key: "scans",
      render: (scans) => (
        <span className="text-[#9E9E9E] font-bold text-[17px]">{scans}</span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <span className="text-[#9E9E9E] flex justify-center items-center gap-3  text-[17px] popreg">
          <CiLocationOn size={18} />
          {location}
        </span>
      ),
    },
    {
      title: "Created On",
      dataIndex: "created",
      key: "created",
      render: (date) => (
        <span className="text-gray-400 flex justify-center items-center gap-3 text-[17px] popreg">
          <MdOutlineCalendarToday /> {date}
        </span>
      ),
    },
    {
      title: "Expires On",
      dataIndex: "expires",
      key: "expires",
      render: (date) => (
        <span className="text-gray-400 flex justify-center items-center gap-3 text-[17px] popreg">
          <MdOutlineCalendarToday /> {date}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size="middle">
          <EditOutlined
            onClick={() => setIsEditModalOpen(true)}
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
    <div className="p-4 rounded-xl bg-[#030712] text-white">
      <Table
        columns={columns}
        dataSource={data}
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
      />
    </div>
  );
};

export default QrTable;
