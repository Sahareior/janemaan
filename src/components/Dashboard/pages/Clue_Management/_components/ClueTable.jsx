import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { FaLocationPin } from 'react-icons/fa6';
import { PiQrCodeBold } from 'react-icons/pi';
import ClueModal from './modal/ClueModal';
import Swal from 'sweetalert2';



const data = [
  {
    key: 1,
    order: 'CL001',
    title: "Treasure Trail Cape Town",
    location: "Cape Town",
    qrcode: "1234567890",
    status: "uploaded",
  },
  {
    key: 2,
    order: 'CL001',
    title: "hYYAS ASAD[P ADFNA KFMNO",
    location: "Uganda",
    qrcode: "1234567890",
    status: "uploaded",
  },
  {
    key: 3,
    order: 'CL001',
    title: "dIO KA? DIO Ka??",
    location: "Nigeria",
    qrcode: "1234567890",
    status: "draft",
  },
];

const ClueTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

                 const handleDelete =()=>{
                    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
                  }
    

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
          className={`${color} text-white font-bold w-[140px] h-[36px] text-[17px] popreg p-5 flex justify-center items-center rounded-[22px]`}
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
       
        <EditOutlined onClick={()=> setIsModalOpen(true)}  className="text-[#9E9E9E] hover:text-yellow-400 text-2xl cursor-pointer" />
        <DeleteOutlined onClick={()=> handleDelete()} className="text-red-500 hover:text-red-700 text-[22px] cursor-pointer" />
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

            <ClueModal
        open={isModalOpen}
        edit={true}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ClueTable;
