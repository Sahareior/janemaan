import React, { useState } from "react";
import { StatCard } from "../overview/Overview";
import { Button, Dropdown, Input, Radio, Space } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import PrizeTable from "./_componentsa/PrizeTable";
import PrizeModal from "./_componentsa/Modal/PrizeModal";

const PrizeClaim = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedStatus, setSelectedStatus] = useState(null);

const items = [
  {
    key: "status-filter",
    label: (
      <Radio.Group
        onChange={(e) => setSelectedStatus(e.target.value)}
        value={selectedStatus}
        className="flex flex-col text-white gap-2"
      >
        <Radio className="text-white" value="pending">Pending</Radio>
        <Radio className="text-white" value="approved">Approved</Radio>
        <Radio className="text-white" value="rejected">Rejected</Radio>
      </Radio.Group>
    ),
  },
];


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-5">
      <div>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value="R 83,45746" />
          <StatCard title="New Users" value="1,245" />
          <StatCard title="Active Devices" value="512" />
          <StatCard title="Completed Hunts" value="234" />
        </div>

        <div className="flex justify-between gap-4 mt-5 items-center">
          <div className="relative w-full">
            <Input
              style={{
                backgroundColor: "#030712",
                color: "white",
                height: "50px",
                paddingLeft: "48px", // increase to avoid overlap
              }}
              className="w-full placeholder-[#9E9E9E] border border-[#5D87A3]"
              placeholder="Search by name"
            />
            <FaSearch
              size={18}
              className="absolute top-4 left-4 text-gray-400"
            />
          </div>


            <Dropdown menu={{ items }} trigger={['click']}>
    <a onClick={e => e.preventDefault()}>
      <Space>

          <button className="flex justify-center items-center popreg hover:bg-blue-950 border-none h-[50px] w-[174px] bg-[#123D74]  text-white gap-2">
            <FaPlus size={13} className="text-white" />
            All Status
          </button>
      </Space>
    </a>
  </Dropdown>

        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-[25px] popmed font-bold text-white">All Clues</h3>
        <PrizeTable onOpenModal={handleModalOpen} />
      </div>

      <PrizeModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PrizeClaim;
