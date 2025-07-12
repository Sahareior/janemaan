import React from 'react';
import { Table, Tag, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { PiQrCodeBold } from 'react-icons/pi';
import { FaLocationPin } from 'react-icons/fa6';

const columns = [
  {
    title: 'QR Code',
    dataIndex: 'qrcode',
    key: 'qrcode',
    render: (value) => (
      <span className="text-[17px] text-[#9E9E9E] flex justify-start items-center gap-3 w-  px-3 py-2">
        <PiQrCodeBold size={34} />
        {value}
      </span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
render: (status) => {
  const tagColor =
    {
      scanned: "bg-[#2765A1]/25 border border-[#2765A1]",
      draft: "bg-[#995900]/25 border border-[#995900]",
      expired: "bg-red-500/25 border border-red-500", // <-- Add this too
    }[status] || "bg-gray-500";

  return (
    <Tag className={`${tagColor} text-white font-bold w-[100px] h-[36px] flex justify-center items-center rounded-[22px]`}>
      {status}
    </Tag>
  );
},

  },
  {
    title: 'Scans',
    dataIndex: 'scans',
    key: 'scans',
    render: (scans) => (
      <span className="text-[#9E9E9E] font-bold text-[17px]">{scans}</span>
    ),
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: (location) => (
      <span className="text-[#9E9E9E] flex justify-center items-center gap-3  text-[17px] popreg">
        <FaLocationPin />
        {location}</span>
    ),
  },
  {
    title: 'Created On',
    dataIndex: 'created',
    key: 'created',
    render: (date) => (
      <span className="text-gray-400 text-[17px] popreg">{date}</span>
    ),
  },
  {
    title: 'Expires On',
    dataIndex: 'expires',
    key: 'expires',
    render: (date) => (
      <span className="text-gray-400 text-[17px] popreg">{date}</span>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space size="middle">
    
        <EditOutlined className="text-white hover:text-yellow-400 text-2xl cursor-pointer" />
        <DeleteOutlined className="text-red-500 hover:text-red-700 text-2xl cursor-pointer" />
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    qrcode: 'QRCODE001',
    status: 'scanned',
    scans: 480,
    location: 'Cape Town',
    created: '2023-10-01',
    expires: '2024-10-01',
  },
  {
    key: 2,
    qrcode: 'QRCODE002',
    status: 'expired',
    scans: 342,
    location: 'Cape Town',
    created: '2023-11-15',
    expires: '2024-11-15',
  },
];

const QrTable = () => {
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

export default QrTable;
