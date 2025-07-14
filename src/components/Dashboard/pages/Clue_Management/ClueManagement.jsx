import { Button } from "antd";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ClueTable from "./_components/ClueTable";
import ClueModal from "./_components/modal/ClueModal";

// Helper to chunk array into rows of 4
const chunkArray = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

const ClueManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const detailItems = [
    { label: "City", value: "Cape Town" },
    { label: "Prize", value: "3444 Rs" },
    { label: "Status", value: "Active" },
    { label: "Difficulty", value: "Medium" },
    { label: "Participants", value: "56" },
    { label: "Start Date", value: "12 July 2025" },
    { label: "Active Time", value: "9pm - 9am" },
    { label: "End Date", value: "15 July 2025" },
  ];

  const rows = chunkArray(detailItems, 4); // ⬅️ Group in rows of 4

  return (
    <div className="p-5">
      <div className="bg-[#111827] p-6 rounded-xl text-white">
        <h2 className="text-[25px] popmed font-medium mb-6">Hunt Details</h2>

        <div className="grid grid-cols-4 text-[18px] p-7 justify-items-center gap-y-12">
          <div className="flex gap-3 items-center ">
            <img
              className="h-[45px] w-[45px]"
              src="https://images.unsplash.com/photo-1751076547556-f816d884e972?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div>
              <h3 className="text-[18px] popreg">Hunt Name</h3>
              <h3 className="text-[18px] popreg">Treasure Trail Cape Town</h3>
            </div>
          </div>

          <div className="flex text-[18px] flex-col gap-2">
            <h3 className="text-[18px] popreg">Price</h3>
            <h3 className="text-[#97BECA] popreg">RS 12345</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] popreg">City</h3>
            <h3 className="text-[#97BECA] popreg">Cape Town</h3>
          </div>
          <div className="flex flex-col text-start gap-2">
            <h3 className="text-[18px] popreg">Status</h3>
            <h3 className="text-[#97BECA] popreg">Active</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] popreg">Participate</h3>
            <h3 className="text-[#97BECA] popreg">43</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] popreg">Difficulty</h3>
            <h3 className="text-[#97BECA] popreg">Easy</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] popreg">Date</h3>
            <h3 className="text-[#97BECA] popreg">03.09.2025</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] popreg">Active time</h3>
            <h3 className="text-[#97BECA] popreg">3:00pm - 6:00pm</h3>
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-11">
        <div className="bg-[#030712] border-[#5D87A3] border text-[17px] popreg w-[198px] h-[50px] text-white flex items-center justify-between px-4">
          Total clues
          <span className="bg-[#2C739E] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
            3
          </span>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#123D74] text-white flex justify-center items-center gap-3 hover:bg-blue-950 border-none text-[17px] popreg w-[198px] h-[50px]"
        >
          <FaPlus size={14} /> Add New Clue
        </button>
      </div>

      <div className="mt-7">
        <h3 className="text-[25px] font-semibold text-white pt-7 px-6 ">
          All Clues
        </h3>
        <ClueTable />
      </div>

      <ClueModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ClueManagement;
