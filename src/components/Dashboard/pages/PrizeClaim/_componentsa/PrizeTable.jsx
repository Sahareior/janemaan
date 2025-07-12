import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaLocationPin } from 'react-icons/fa6';
import { PiQrCodeBold } from 'react-icons/pi';
import 'antd/dist/reset.css';
import { FaEye } from 'react-icons/fa';



const data = [
  {
    key: 1,
    claimid: 'CPM001',
    user: {
        name: "John Doe",
        email: "sahareada@gmail.com"    
    },
    prize: "2222",
    status: "Approved",
    submitted: "2023-10-01",
  },
  {
    key: 4,
    claimid: 'CPM002',
    user: {
        name: "John Doe",
        email: "sahareada@gmail.com"    
    },
    prize: "2222",
    status: "Approved",
    submitted: "2023-10-01",
  },
  {
    key: 3,
    claimid: 'CPM003',
    user: {
        name: "John Doe",
        email: "sahareada@gmail.com"    
    },
    prize: "2222",
    status: "Approved",
    submitted: "2023-10-01",
  },
  {
    key: 2,
    claimid: 'CPM004',
    user: {
        name: "John Doe",
        email: "sahareada@gmail.com"    
    },
    prize: "2222",
    status: "Rejected",
    submitted: "2023-10-01",
  },
];

const PrizeTable = ({onOpenModal}) => {



    const columns = [
  {
    title: "Claim Id",
    dataIndex: "claimid", // ✅ matches your data
    key: "claimid",
    render: (value) => (
      <span className="text-[#9E9E9E] popreg text-[16px]">{value}</span>
    ),
  },
  {
    title: "User",
    dataIndex: "user", // ✅ matches your data
    key: "user",
    render: (value) => {
        return (
            <span className="text-[#97BECA] popreg text-[16px] truncate max-w-[160px] block">
                <h3>{value.name}</h3>

             {value.email}
            </span>
        );
    },
  },
  {
    title: "Price",
    dataIndex: "prize", // ✅ matches your data
    key: "prize",
    render: (value) => (
      <span className="text-[#9E9E9E] flex items-center gap-2 popreg text-[17px]">
     RS {value}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status", // pretend 'status' holds QR code ID for now
    key: "status",
    render: (value) => {
        const color =
            {
            Approved: "bg-white text-black",
            Pending: "bg-yellow-600/25 border-yellow-500",
            Rejected: "bg-red-600 border-red-500",
            }[value] || "bg-gray-500/25 border-gray-500";
    
        return (
            <Tag className={`${color} text-black font-bold w-[100px] h-[36px] popreg flex justify-center items-center rounded-[22px]`}>
            {value}
            </Tag>
        );
    }
  },
{
  title: "Submission",
  dataIndex: "submitted",
  key: "submitted",
 render: (value) => (
      <span className="text-[#97BECA] truncate max-w-[160px] popreg block">{value}</span>
    ),
},

 {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <div>
        <Button onClick={()=> onOpenModal()} className='flex justify-center popreg bg-black w-[143px] h-[48px] text-gray-400 items-center gap-2'>
            <FaEye />
            Review
        </Button>
      </div>
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
    </div>
  );
};

export default PrizeTable;
