import React from 'react';
import { Space, Table, Tag } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { FaLocationPin } from 'react-icons/fa6';
import { PiQrCodeBold } from 'react-icons/pi';

const columns = [
  {
    title: "Order",
    dataIndex: "order",
    key: "order",
    render: (value) => (
      <span className="text-white font-medium popbold text-[16px]">{value}</span>
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (value) => (
      <span className="text-[#97BECA] popmed truncate max-w-[160px] block">{value}</span>
    ),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: (value) => (
      <span className="text-[#9E9E9E] flex justify-start popreg text-[17px] items-center gap-3">
        <FaLocationPin />
        {value}</span>
    ),
  },
  {
    title: "QR Code",
    dataIndex: "qrcode",
    key: "qrcode",
    render: (value, idx) => (
      <span className="text-[17px] text-[#9E9E9E] flex justify-center items-center gap-3 w-[190px] border-[#9E9E9E] border-[1px] rounded-[22px] px-3 py-2">
        <PiQrCodeBold size={22} />
        Qr Code 
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
const color =
  {
    uploaded: "bg-[#2765A1]/25 border border-[#2765A1]",
    draft: "bg-[#995900]/25 border border-[#995900]",
  }[status] || "bg-gray-500";


      return (
        <Tag
          className={`${color} text-white font-bold w-[100px] h-[36px] text-[17px] popreg p-5 flex justify-center items-center rounded-[22px]`}
        >
          {status}
        </Tag>
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space size="middle">
       
        <EditOutlined  className="text-white hover:text-yellow-400 text-2xl cursor-pointer" />
        <DeleteOutlined className="text-red-500 hover:text-red-700 text-[22px] cursor-pointer" />
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    order: 1,
    title: "Treasure Trail Cape Town",
    location: "Cape Town",
    qrcode: "1234567890",
    status: "uploaded",
  },
  {
    key: 2,
    order: 2,
    title: "hYYAS ASAD[P ADFNA KFMNO",
    location: "Uganda",
    qrcode: "1234567890",
    status: "uploaded",
  },
  {
    key: 3,
    order: 3,
    title: "dIO KA? DIO Ka??",
    location: "Nigeria",
    qrcode: "1234567890",
    status: "draft",
  },
];

const ClueTable = () => {
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

export default ClueTable;
