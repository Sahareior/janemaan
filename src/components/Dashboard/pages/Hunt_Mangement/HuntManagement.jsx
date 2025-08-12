import React, { useState, useMemo } from "react";
import { StatCard } from "../overview/Overview";
import { Input } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import CustomTable from "./_components/Table";
import CustomModal from "../../../others/CustomModal";
import { useGetHuntsQuery } from "../../../../redux/slices/apiSlice";

const HuntManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: huntData, isLoading, refetch } = useGetHuntsQuery();

  const hunts = huntData?.results || [];

  // Filter hunts by title (case-insensitive)
  const filteredHunts = useMemo(() => {
    if (!searchText.trim()) return hunts;
    const lowerSearch = searchText.toLowerCase();
    return hunts.filter((hunt) => hunt.title.toLowerCase().includes(lowerSearch));
  }, [searchText, hunts]);

  // Filter by status for stats
  const completed = hunts.filter((hunt) => hunt.status === "completed");
  const draft = hunts.filter((hunt) => hunt.status === "draft");
  const active = hunts.filter((hunt) => hunt.status === "active");

  if (isLoading) {
    return <div className="p-5 text-white">Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total hunts" value={huntData?.count || 0} />
        <StatCard title="Active hunts" value={active.length} />
        <StatCard title="Draft hunts" value={draft.length} />
        <StatCard title="Completed hunts" value={completed.length} />
      </div>

      <div className="flex justify-between gap-4 mt-5 items-center">
        <div className="relative w-full">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search hunts by title..."
            style={{
              backgroundColor: "#030712",
              color: "white",
              height: "50px",
              paddingLeft: "48px", // to avoid overlap with icon
            }}
            className="w-full placeholder-[#9E9E9E] popreg border border-[#5D87A3]"
          />
          <FaSearch size={18} className="absolute top-4 left-4 text-gray-400" />
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center hover:bg-blue-900 items-center h-[50px] w-[174px] bg-[#123D74] text-white border-none gap-2"
        >
          <FaPlus size={13} />
          Create New
        </button>
      </div>

      <div className="mt-7">
        <h2 className="text-[25px] text-white popmed">All Hunts</h2>
        <CustomTable refetch={refetch} data={filteredHunts} />
      </div>

      <CustomModal
        open={isModalOpen}
        refetch={refetch}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HuntManagement;
