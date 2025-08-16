import React, { useState, useMemo } from "react";
import { StatCard } from "../overview/Overview";
import { Input, Spin } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import CustomTable from "./_components/Table";
import CustomModal from "../../../others/CustomModal";
import { useGetHuntsQuery } from "../../../../redux/slices/apiSlice";

const HuntManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: huntData, isLoading, refetch } = useGetHuntsQuery();

  // Sort hunts by created_at (newest first)
  const sortedHunts = useMemo(() => {
    return [...(huntData?.results || [])].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [huntData?.results]);

  // Filter hunts by title
  const filteredHunts = useMemo(() => {
    if (!searchText.trim()) return sortedHunts;
    const lowerSearch = searchText.toLowerCase();
    return sortedHunts.filter((hunt) =>
      hunt.title.toLowerCase().includes(lowerSearch)
    );
  }, [searchText, sortedHunts]);

  // Stats
  const completed = sortedHunts.filter((hunt) => hunt.status === "completed");
  const draft = sortedHunts.filter((hunt) => hunt.status === "draft");
  const active = sortedHunts.filter((hunt) => hunt.status === "active");

  if (isLoading) {
    return  <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
  }

  // Format date helper
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-5">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total hunts" value={huntData?.count || 0} />
        <StatCard title="Active hunts" value={active.length} />
        <StatCard title="Draft hunts" value={draft.length} />
        <StatCard title="Completed hunts" value={completed.length} />
      </div>

      {/* Search + Create */}
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
              paddingLeft: "48px",
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

      {/* Table */}
      <div className="mt-7">
        <h2 className="text-[25px] text-white popmed">All Hunts</h2>
        <CustomTable
          refetch={refetch}
          data={filteredHunts.map((hunt) => ({
            ...hunt,
            created_at: formatDate(hunt.created_at), // Human-readable date
          }))}
        />
      </div>

      {/* Modal */}
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
