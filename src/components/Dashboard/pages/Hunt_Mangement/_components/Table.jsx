import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaTrophy } from 'react-icons/fa';
import 'antd/dist/reset.css'; // optional, but recommended if you're styling manually
import { BsFillTrophyFill, BsSuitDiamondFill } from 'react-icons/bs';
import { RiPokerDiamondsLine } from 'react-icons/ri';
import CustomModal from '../../../../others/CustomModal';



const data = [
  {
    key: 1,
    image: "https://images.unsplash.com/photo-1751076547556-f816d884e972?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Treasure Trail Cape Town",
    prize: 20000,
    difficulty: "Easy",
    status: "Active",
    participants: 56,
  },
  {
    key: 2,
    image: "https://images.unsplash.com/photo-1751076547556-f816d884e972?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Treasure Trail Cape Town",
    prize: 20000,
    difficulty: "Medium",
    status: "Active",
    participants: 34,
  },
  {
    key: 3,
    image: "https://images.unsplash.com/photo-1751076547556-f816d884e972?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Treasure Trail Cape Town",
    prize: 20000,
    difficulty: "Easy",
    status: "Draft",
    participants: 90,
  },
  {
    key: 4,
    image: "https://images.unsplash.com/photo-1751076547556-f816d884e972?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Treasure Trail Cape Town",
    prize: 20000,
    difficulty: "Hard",
    status: "Completed",
    participants: 12,
  },
  {
    key: 5,
    image: "https://images.unsplash.com/photo-1751076547556-f816d884e972?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Treasure Trail Cape Town",
    prize: 20000,
    difficulty: "Hard",
    status: "Draft",
    participants: 31,
  },
];


const CustomTable = () => {

      const [isModalOpen, setIsModalOpen] = useState(false); 



      const columns = [
  {
    title: "Hunts",
    dataIndex: "hunt",
    key: "hunt",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record.image}
          alt="hunt"
          className="w-10 h-10 rounded-md object-cover"
        />
        <span className="text-[#97BECA] truncate w-[120px]">{record.title}</span>
      </div>
    ),
  },
  {
    title: "Prize",
    dataIndex: "prize",
    key: "prize",
    render: (value) => (
      <div className="flex items-center gap-2 text-[#9E9E9E]">
        <img className=' text-[14px]' src="/images/tro.png" alt="/images/tro.png" />
        RS <br /> {value}
      </div>
    ),
  },
{
  title: "Difficulty",
  dataIndex: "difficulty",
  key: "difficulty",
  render: (level) => {
    const styleMap = {
      Easy: {
        bg: "bg-blue-600/25",
        border: "border-blue-500",
        text: "text-blue-500",
      },
      Medium: {
        bg: "bg-yellow-600/25",
        border: "border-yellow-500",
        text: "text-yellow-500",
      },
      Hard: {
        bg: "bg-red-700/25",
        border: "border-red-500",
        text: "text-red-500",
      },
    };

    const { bg, border, text } = styleMap[level] || {
      bg: "bg-gray-500/25",
      border: "border-gray-500",
      text: "text-gray-500",
    };

    return (
      <Tag
        className={`${bg} ${border} text-white flex popbold justify-center text-[16px] items-center w-[100px] h-[36px] gap-1 rounded-[22px]`}
      >
        <BsSuitDiamondFill className={text} />
        {level}
      </Tag>
    );
  },
},

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color =
        {
          Active: "bg-green-800",
          Draft: "bg-yellow-700",
          Completed: "bg-sky-900",
        }[status] || "bg-gray-500";

      return (
        <Tag className={`${color} text-white border-none font-bold w-[100px] popbold h-[36px] px-20 text-[16px] flex justify-center items-center rounded-[22px]`}>
          {status}
        </Tag>
      );
    },
  },
  {
    title: "Participants",
    dataIndex: "participants",
    key: "participants",
    render: (count) => <span className="text-[#9E9E9E] font-bold text-[17px] ">{count}</span>,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <EyeOutlined className="  text-[#9E9E9E] text-xl hover:text-blue-400 cursor-pointer" />
        <EditOutlined onClick={()=> setIsModalOpen(true) } className="text-[#9E9E9E] text-xl hover:text-yellow-400 cursor-pointer" />
        <DeleteOutlined className="text-red-500 text-xl hover:text-red-700 cursor-pointer" />
      </Space>
    ),
  },
];

  return (
    <div className="p-1 rounded-xl bg-[#030712] text-white">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
         bordered={false}
        className="custom-ant-table bg-[#030712]"
      />
          <CustomModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        edit={true}
      />
    </div>
  );
};

export default CustomTable;
