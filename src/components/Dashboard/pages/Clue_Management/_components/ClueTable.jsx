import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { CiLocationOn } from "react-icons/ci";
import { PiQrCodeBold } from "react-icons/pi";
import ClueModal from "./modal/ClueModal";
import Swal from "sweetalert2";
import { useDeleteClueMutation, useGetHuntsQuery } from "../../../../../redux/slices/apiSlice";

const ClueTable = ({ filteredClues: initialClues }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editClue, setEditClue] = useState({});
  const [deleteClue] = useDeleteClueMutation();
  const { data: huntData, refetch } = useGetHuntsQuery();

  // Local state for instant updates
  const [filteredClues, setFilteredClues] = useState(initialClues || []);

  // Keep filteredClues in sync if parent prop changes
  React.useEffect(() => {
    setFilteredClues(initialClues || []);
  }, [initialClues]);

  const handleDelete = (id) => {
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
        deleteClue(id)
          .unwrap()
          .then(() => {
            // Remove clue locally for instant UI update
            const updatedClues = filteredClues.filter((clue) => clue.id !== id);
            setFilteredClues(updatedClues);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              background: "#1e1e2f",
              color: "#fff",
              icon: "success",
            });

            // Optional: refetch hunts to keep backend in sync
            refetch();
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              background: "#1e1e2f",
              color: "#fff",
            });
          });
      }
    });
  };

  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      render: (value) => (
        <span className="text-[#97BECA] font-medium popbold text-[16px]">{value}</span>
      ),
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (value) => (
        <span className="text-[#97BECA] popmed truncate max-w-[160px] block">{value}</span>
      ),
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) => (
        <span className="text-[#9E9E9E] flex justify-start popreg text-[17px] items-center gap-3">
          <CiLocationOn size={18} />
          {record.qr_code?.latitude ?? "—"}, {record.qr_code?.longitude ?? "—"}
        </span>
      ),
    },
    {
      title: "QR Code",
      key: "qrcode",
      render: (_, record) =>
        record.qr_code?.qr_image ? (
          <a
            href={record.qr_code.qr_image}
            download={`${record.qr_code?.code || "qr-code"}.png`}
            className="no-underline"
          >
            <span className="text-[17px] text-[#9E9E9E] flex justify-center items-center gap-3 w-[190px] border-[#9E9E9E] border-[1px] rounded-[22px] px-3 py-2 hover:bg-[#1f2937] transition">
              <PiQrCodeBold size={22} />
              QR Code
            </span>
          </a>
        ) : (
          <span className="text-gray-500">No QR</span>
        ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const isActive = record?.qr_code?.is_active;
        const color = isActive
          ? "bg-[#2765A1]/25 border border-[#2765A1]"
          : "bg-[#995900]/25 border border-[#995900]";
        const text = isActive ? "Active" : "Inactive";

        return (
          <Tag
            className={`${color} text-white font-bold w-[140px] h-[36px] text-[17px] popreg p-5 flex justify-center items-center rounded-[22px]`}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setIsModalOpen(true);
              setEditClue(record);
            }}
            className="text-[#9E9E9E] hover:text-yellow-400 text-2xl cursor-pointer"
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
        dataSource={filteredClues}
        pagination={{ pageSize: 5 }}
        bordered={false}
        rowKey="id"
        className="custom-ant-table bg-[#030712]"
      />

      <ClueModal
        open={isModalOpen}
        edit={true}
        data={editClue}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ClueTable;
