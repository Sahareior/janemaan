import React, { useState } from "react";
import { StatCard } from "../overview/Overview";
import { Button, Input } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import CustomTable from "./_components/Table";
import CustomModal from "../../../others/CustomModal";
import { useGetHuntsQuery } from "../../../../redux/slices/apiSlice";

const HuntManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const {data:huntData, isLoading} = useGetHuntsQuery();
  console.log(huntData);
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total hunts" value={huntData?.count} />
        <StatCard title="Active hunts" value="1,245" />
        <StatCard title="Draft hunts" value="52" />
        <StatCard title="Completed hunts" value="23" />
      </div>

      {/* ............................................................................. */}

      <div className="flex justify-between gap-4 mt-5 items-center">
        <div className="relative w-full">
          <Input
            placeholder="Search hunts name, status, difficulty.."
            style={{
              backgroundColor: "#030712",
              color: "white",
              height: "50px",
              paddingLeft: "48px", // increase to avoid overlap
            }}
            className="w-full placeholder-[#9E9E9E] popreg border border-[#5D87A3]"
          />
          <FaSearch size={18} className="absolute top-4 left-4 text-gray-400" />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center hover:bg-blue-900 items-center h-[50px] w-[174px] bg-[#123D74] text-white border-none gap-2"
        >
          <FaPlus size={13} className="text-white" />
          Create New
        </button>
      </div>

      {/* ................................Table......................................... */}

      <div className="mt-7">
        <h2 className="text-[25px] text-white popmed">All Hunts</h2>
        <CustomTable data={huntData?.results} />
      </div>
      <CustomModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HuntManagement;
