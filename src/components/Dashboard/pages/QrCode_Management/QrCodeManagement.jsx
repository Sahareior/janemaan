import React, { useState } from "react";
import { StatCard } from "../overview/Overview";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button, Input } from "antd";
import QrTable from "./_components/QrTable";
import Qrmodal from "./_components/modal/Qrmodal";
import ClueModal from "../Clue_Management/_components/modal/ClueModal";

const QrCodeManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-5">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value="R 83,45746" />
          <StatCard title="New Users" value="1,245" />
          <StatCard title="Active Devices" value="512" />
          <StatCard title="Completed Hunts" value="234" />
        </div>

        <div className="flex justify-between gap-4 mt-5 items-center">
          <div className="relative w-full">
            <Input
              placeholder="Search by name"
              style={{
                backgroundColor: "#030712",
                color: "white",
                height: "50px",
                paddingLeft: "48px", // increase to avoid overlap
              }}
              className="w-full placeholder-[#9E9E9E] border border-[#5D87A3] hover:bg-[#5D87A3]"
            />
            <FaSearch
              size={18}
              className="absolute top-4 left-4 text-gray-400"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex hover:bg-blue-950 justify-center border-none popreg items-center h-[50px] w-[174px] bg-[#123D74] text-white gap-2"
          >
            <FaPlus size={13} className="text-white" />
            Create New
          </button>
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-[25px] text-white px-5">All Clues</h3>
        <QrTable />
      </div>

      <ClueModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default QrCodeManagement;
