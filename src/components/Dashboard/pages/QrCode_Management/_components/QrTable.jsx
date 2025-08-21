import React, { useState } from "react";
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { CiLocationOn } from "react-icons/ci";
import Swal from "sweetalert2";
import Qrmodal from "./modal/Qrmodal";
import ClueModal from "../../Clue_Management/_components/modal/ClueModal";
import {
  useDeleteClueMutation,
  useGetHuntsQuery,
} from "../../../../../redux/slices/apiSlice";
import { BsSuitDiamondFill } from "react-icons/bs";

const QrTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [qrdata, setQrdata] = useState(null);

  const [deleteClue] = useDeleteClueMutation();
  const { data: huntData, refetch } = useGetHuntsQuery();

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
        await deleteClue(id);
        refetch();
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
      render: (city) => (
        <span className="text-gray-400">{city}</span>
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
            text: "text-blue-400",
          },
          Medium: {
            bg: "bg-yellow-600/25",
            border: "border-yellow-500",
            text: "text-yellow-400",
          },
          Hard: {
            bg: "bg-red-700/25",
            border: "border-red-500",
            text: "text-red-400",
          },
        };

        const capitalized =
          level?.charAt(0).toUpperCase() + level?.slice(1).toLowerCase();
        const { bg, border, text } = styleMap[capitalized] || {
          bg: "bg-gray-500/25",
          border: "border-gray-500",
          text: "text-gray-400",
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
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => (
        <span className="text-gray-400">
          {date ? new Date(date).toLocaleDateString() : "—"}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => (
        <span className="text-gray-400">
          {date ? new Date(date).toLocaleDateString() : "—"}
        </span>
      ),
    },
  ];

  // 🔹 Nested QR/Clue table columns
  const clueColumns = [
    {
      title: "Clue Order",
      dataIndex: "order",
      key: "order",
      render: (order) => (
        <span className="text-indigo-300 text-[16px]">{order}</span>
      ),
    },
    {
      title: "Clue Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span className="text-indigo-300 text-[16px]">{name}</span>
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
          className="flex items-center text-indigo-300 gap-3 cursor-pointer"
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
      title: "Qr Scans",
      key: "scan_count",
      render: (record) => (
        <span className="text-indigo-300 text-[16px] flex items-center gap-2">
      {record.qr_code?.scan_count}
        </span>
      ),
    },
    {
      title: "Location",
      key: "location",
      render: (record) => (
        <span className="text-indigo-300 text-[16px] flex items-center gap-2">
          <CiLocationOn /> {record.qr_code?.latitude}, {record.qr_code?.longitude}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: ["qr_code", "is_active"],
      key: "status",
      render: (is_active) => {
        const status = is_active ? "Active" : "Inactive";
        const tagColor = is_active
          ? "bg-green-700/25 border border-green-600"
          : "bg-gray-700/25 border border-gray-500";
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
          border: 1px solid #6366f1;
          color: #6366f1;
          transition: all 0.3s ease;
        }
        .ant-table-row-expand-icon:focus, .ant-table-row-expand-icon:hover {
          color: #818cf8;
          border-color: #818cf8;
        }

        /* Nested table dark theme */
        .nested-table .ant-table {
          background: transparent;
        }
        .nested-table .ant-table-thead > tr > th {
          background: #1e1b4b !important;
          color: #c7d2fe !important;
          border-bottom: 1px solid #312e81;
        }
        .nested-table .ant-table-tbody > tr > td {
          background: #1e1b4b !important;
          color: #e0e7ff !important;
          border-bottom: 1px solid #312e81;
        }
        .nested-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }

        /* Smooth expand/collapse */
        .expand-wrapper {
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.4s ease, transform 0.3s ease;
        }
        .expand-enter {
          max-height: 0;
          opacity: 0;
          transform: translateY(-10px);
        }
        .expand-enter-active {
          max-height: 1000px;
          opacity: 1;
          transform: translateY(0);
        }
        .expand-leave {
          max-height: 1000px;
          opacity: 1;
          transform: translateY(0);
        }
        .expand-leave-active {
          max-height: 0;
          opacity: 0;
          transform: translateY(-10px);
        }
      `}</style>

      <Table
        columns={huntColumns}
        dataSource={huntData?.results || []}
        className="custom-ant-table bg-[#030712] rounded-lg mt-2"
        rowKey="id"
        expandable={{
          expandedRowRender: (hunt) =>
            hunt.clues && hunt.clues.length > 0 ? (
              <div className="expand-wrapper bg-[#1e1b4b] rounded-lg p-5">
                <Table
                  columns={clueColumns}
                  dataSource={hunt.clues}
                  rowKey="id"
                  pagination={false}
                  size="small"
                  className="nested-table"
                />
              </div>
            ) : (
              <div className="py-12 text-center popmed text-gray-400 border border-indigo-600 rounded-lg bg-[#030712]">
                This hunt has no QR code yet
              </div>
            ),
          rowExpandable: () => true,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <DownOutlined
                style={{ color: "#6366f1" }}
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <DownOutlined
                style={{ color: "#6366f1", transform: "rotate(-90deg)" }}
                onClick={(e) => onExpand(record, e)}
              />
            ),
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
