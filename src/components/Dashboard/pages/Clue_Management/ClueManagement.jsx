import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ClueTable from "./_components/ClueTable";
import ClueModal from "./_components/modal/ClueModal";
import { data, useLocation } from "react-router-dom";
import { useGetCluesQuery, useGetHuntsQuery } from "../../../../redux/slices/apiSlice";

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
  const location = useLocation();
  const {data} = useGetCluesQuery()
  const huntData = location.state?.data || {}; // Get hunt data from state
 const { data: fetchHuntdata, isLoading,refetch } = useGetHuntsQuery();
const [filteredClues, setFilteredClues] = useState([]);

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
      <div className="flex gap-5 mt-11">
        <div className="bg-[#030712] border-[#5D87A3] border text-[17px] popreg w-[198px] h-[50px] text-white flex items-center justify-between px-4">
          Total clues
          <span className="bg-[#97BECA] text-[#2C739E] popbold w-7 h-7 rounded-full flex items-center justify-center text-sm">
            {filteredHunts?.[0].clues.length}
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
          <ClueTable
          filteredClues={filteredClues}
          onClueDelete={handleClueDelete} // Pass handler to update state on delete
        />
      </div>

      <ClueModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        huntId={filteredHunts?.[0].id}
        refetch={refetch}
      />
    </div>
  );
};

export default ClueManagement;
