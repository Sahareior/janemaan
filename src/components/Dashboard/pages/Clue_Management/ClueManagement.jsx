import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTicketAlt, FaPuzzlePiece } from "react-icons/fa"
// import { FaPlus } from "react-icons/fa";
import ClueTable from "./_components/ClueTable";
import ClueModal from "./_components/modal/ClueModal";
import {  useLocation } from "react-router-dom";
import { useGetAllVoucherQuery, useGetCluesQuery, useGetHuntsQuery } from "../../../../redux/slices/apiSlice";
import VoucherModal from "../Vouchers/_components/VoucherModal";
import VoucherTable from "../Vouchers/_components/VoucherTable";

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
  const [voucherOpen,setVoucherOpen] = useState(false)
  const location = useLocation();
  const {data} = useGetCluesQuery()
  const huntData = location.state?.data || {}; // Get hunt data from state
 const { data: fetchHuntdata, isLoading,refetch } = useGetHuntsQuery();
const [filteredClues, setFilteredClues] = useState([]);
  const { data: vouchers  } = useGetAllVoucherQuery();
  const filteredHunts = fetchHuntdata?.results?.filter(hunts => hunts.id === huntData?.id)
  
  useEffect(() => {
    const filteredHunts = fetchHuntdata?.results?.find(
      (hunt) => hunt.id === huntData?.id
    );

    if (filteredHunts) {
      setFilteredClues(filteredHunts.clues || []);
    }
  }, [fetchHuntdata, huntData]);

  // This function will be passed to ClueTable to update clues locally
  const handleClueDelete = (deletedId) => {
    setFilteredClues((prev) => prev.filter((clue) => clue.id !== deletedId));
    // Optional: refetch hunts from server for consistency
    refetch();
  };

  const filteredVouchers = vouchers?.filter(data => data.hunt === huntData.id)

  console.log('filtered', filteredVouchers)

  console.log('ada',huntData)
  return (
    <div className="p-5">
      <div className="bg-[#111827] p-6 rounded-xl text-white">
        <h2 className="text-[25px] popmed font-medium mb-6">Hunt Details</h2>

<div className="">
          <div className="grid grid-cols-4 text-[18px] py-7 mx-auto gap-y-12">
          <div className="flex gap-3 items-center ">
            <img
              className="h-[45px] w-[45px]"
              src={huntData?.image || "https://via.placeholder.com/45"}
              alt=""
            />
            <div>
              <h3 className="text-[18px] popreg">Hunt Name</h3>
              <h3 className="text-[18px] text-[#97BECA] popreg">
                {huntData?.title}
              </h3>
            </div>
          </div>

          <div className="flex text-[18px] flex-col gap-2">
            <h3 className="text-[18px] popreg">Price</h3>
            <h3 className="text-[#97BECA] popreg">RS {filteredHunts?.[0]?.prize_amount}</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] popreg">City</h3>
            <h3 className="text-[#97BECA] popreg">{filteredHunts?.[0]?.city}</h3>
          </div>
          <div className="flex flex-col text-start gap-2">
            <h3 className="text-[18px] popreg">Status</h3>
            <h3 className="text-[#97BECA] popreg">{filteredHunts?.[0]?.status}</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] popreg">Participate</h3>
            <h3 className="text-[#97BECA] popreg">{filteredHunts?.[0]?.hunters}</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] popreg">Difficulty</h3>
            <h3 className="text-[#97BECA] popreg">{filteredHunts?.[0]?.difficulty_level}</h3>
          </div>
<div className="flex flex-col gap-2">
  <h3 className="text-[18px] popreg">Start Date</h3>
  <h3 className="text-[#97BECA] popreg">
    {filteredHunts?.[0]?.start_date
      ? new Date(filteredHunts[0].start_date).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : ""}
  </h3>
</div>

<div className="flex flex-col gap-2">
  <h3 className="text-[18px] popreg">End Date</h3>
  <h3 className="text-[#97BECA] popreg">
    {filteredHunts?.[0]?.end_date
      ? new Date(filteredHunts[0].end_date).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : ""}
  </h3>
</div>

        </div>
</div>
      </div>
<div className="flex flex-wrap gap-5 mt-11">
  {/* Total Clues */}
  <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] 
                  border border-[#3b82f6]/40 rounded-xl shadow-lg
                  text-[17px] popreg w-[220px] h-[60px] 
                  text-white flex items-center justify-between px-5">
    <div className="flex items-center gap-2">
      <FaPuzzlePiece className="text-[#38bdf8]" />
      <span className="tracking-wide">Total Clues</span>
    </div>
    <span className="bg-[#38bdf8] text-black font-bold w-8 h-8 rounded-full 
                     flex items-center justify-center text-sm shadow-lg">
      {filteredHunts?.[0].clues.length}
    </span>
  </div>

  {/* Total Vouchers */}
  <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] 
                  border border-[#8b5cf6]/40 rounded-xl shadow-lg
                  text-[17px] popreg w-[220px] h-[60px] 
                  text-white flex items-center justify-between px-5">
    <div className="flex items-center gap-4">
      <FaTicketAlt className="text-[#a78bfa]" />
      <span className="tracking-wide">Total Vouchers</span>
    </div>
    <span className="bg-[#a78bfa] text-black font-bold w-8 h-8 rounded-full 
                     flex items-center justify-center text-sm shadow-lg">
      {filteredVouchers?.length}
    </span>
  </div>

  {/* Add New Clue */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] 
               text-white flex justify-center items-center gap-3 
               rounded-xl shadow-md hover:shadow-blue-500/50 
               transition-all duration-200 ease-in-out 
               w-[220px] h-[60px] text-[17px] popreg"
  >
    <FaPlus size={16} /> Add New Clue
  </button>

  {/* Add New Voucher */}
  <button
    onClick={() => setVoucherOpen(true)}
    className="bg-gradient-to-r from-[#9333ea] to-[#6d28d9] 
               text-white flex justify-center items-center gap-3 
               rounded-xl shadow-md hover:shadow-purple-500/50 
               transition-all duration-200 ease-in-out 
               w-[220px] h-[60px] text-[17px] popreg"
  >
    <FaPlus size={16} /> Add New Voucher
  </button>
</div>

      <div className="mt-7">
        <h3 className="text-[25px] font-semibold text-white pt-7 px-6 ">
          All Clues for This Hunt
        </h3>
          <ClueTable
          filteredClues={filteredClues}
          onClueDelete={handleClueDelete} // Pass handler to update state on delete
        />
      </div>
     <div className="mt-7">
        <h3 className="text-[25px] text-white px-5">All Vouchers for This Hunt</h3>
        <VoucherTable vouchers={filteredVouchers} />
      </div>

      <ClueModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        huntId={filteredHunts?.[0].id}
        refetch={refetch}
      />

      <VoucherModal 
      open={voucherOpen}
        onOk={() => setVoucherOpen(false)}
        onCancel={() => setVoucherOpen(false)}
        huntId={filteredHunts?.[0].id}
        refetch={refetch}
      />
    </div>
  );
};

export default ClueManagement;
