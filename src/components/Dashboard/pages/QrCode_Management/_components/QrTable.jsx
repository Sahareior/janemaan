import React, { useState } from "react";
import { Table, Tag, Space, Button, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineCalendarToday } from "react-icons/md";
import Swal from "sweetalert2";
import Qrmodal from "./modal/Qrmodal";
import ClueModal from "../../Clue_Management/_components/modal/ClueModal";
import {
  useDeleteQrCodeMutation,
  useGetHuntsQuery,
} from "../../../../../redux/slices/apiSlice";

const QrTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [qrdata, setQrdata] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [deleteQrCode] = useDeleteQrCodeMutation();
  const { data: huntData } = useGetHuntsQuery();

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
        await deleteQrCode(id);

        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          background: "#1e1e2f",
          color: "#fff",
          icon: "success",
        });
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

  // 🔹 Main Hunt table columns
  const huntColumns = [
    {
      title: "Order",
      key: "order",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Hunt Name",
      dataIndex: "title",
      key: "title",
      render: (title) => (
        <span className="text-gray-300 text-[16px]">{title}</span>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty_level",
      key: "difficulty_level",
      render: (diff) => (
        <Tag className="bg-[#2765A1]/25 border border-[#2765A1] text-white px-3 py-1 rounded-full">
          {diff}
        </Tag>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : "—",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : "—",
    },
  ];

  // 🔹 Nested QR/Clue table columns
  const clueColumns = [
    {
      title: "Clue Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Clue Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span className="text-gray-300 text-[15px]">{name}</span>
      ),
    },
    {
      title: "QR Code",
      dataIndex: ["qr_code", "qr_image"],
      key: "qr_image",
      render: (qr_image, record) => (
        <span
          onClick={() => {
            setIsModalOpen(true);
            setQrdata(record.qr_code);
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            className="h-[40px] w-[40px] rounded"
            src={qr_image}
            alt={record.qr_code?.code}
          />
          {record.qr_code?.code}
        </span>
      ),
    },
    {
      title: "Location",
      key: "location",
      render: (record) => (
        <span className="text-gray-400 flex items-center gap-2">
          <CiLocationOn /> {record.qr_code?.latitude}, {record.qr_code?.longitude}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: ["qr_code", "is_active"],
      key: "status",
      render: (is_active) => {
        const status = is_active ? "active" : "inactive";
        const tagColor = is_active
          ? "bg-[#2765A1]/25 border border-[#2765A1]"
          : "bg-[#995900]/25 border border-[#995900]";
        return (
          <Tag
            className={`${tagColor} text-white font-bold px-4 py-1 rounded-full`}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <EditOutlined
            onClick={() => {
              setQrdata(record.qr_code);
              setIsEditModalOpen(true);
            }}
            className="text-yellow-400 text-lg cursor-pointer"
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
    <div className="p-4 bg-[#030712] rounded-xl">
      <style>{`
      
        .ant-table-row-expand-icon {
          background-color: transparent;
          border: 1px solid #ef4444;
          color: #ef4444;
        }
        .ant-table-row-expand-icon:focus, .ant-table-row-expand-icon:hover {
          color: #f87171;
          border-color: #f87171;
        }
        .ant-dropdown-trigger {
          color: #ef4444 !important;
        }
        .ant-dropdown-trigger:hover {
          color: #f87171 !important;
        }
      `}</style>
      
      <Table
        columns={huntColumns}
        dataSource={huntData?.results || []}
        className="custom-ant-table bg-[#030712] rounded-lg mt-2"
        rowKey="id"
        expandable={{
          expandedRowRender: (hunt) => (
            <Table
              columns={clueColumns}
              dataSource={hunt.clues}
              rowKey="id"
              pagination={false}
              size="small"
              className="nested-table bg-[#030712] py-6"
            />
          ),
          rowExpandable: (hunt) => hunt.clues && hunt.clues.length > 0,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <DownOutlined 
                style={{ color: '#ef4444' }} 
                onClick={e => onExpand(record, e)} 
              />
            ) : (
              <DownOutlined 
                style={{ color: '#ef4444', transform: 'rotate(-90deg)' }} 
                onClick={e => onExpand(record, e)} 
              />
            )
        }}
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      {/* 🔹 Modals */}
      <Qrmodal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        data={qrdata}
      />
      <ClueModal
        edit
        open={isEditModalOpen}
        onOk={() => setIsEditModalOpen(false)}
        onCancel={() => setIsEditModalOpen(false)}
        data={qrdata}
        position
      />
    </div>
  );
};

export default QrTable;