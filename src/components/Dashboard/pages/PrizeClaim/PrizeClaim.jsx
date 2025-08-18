import React, { useState, useEffect } from "react";
import { Button, Dropdown, Input, Radio, Space, Spin } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import PrizeTable from "./_componentsa/PrizeTable";
import PrizeModal from "./_componentsa/Modal/PrizeModal";
import { useGetClaimsQuery } from "../../../../redux/slices/apiSlice";

const PrizeClaim = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [tableData, setTableData] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const { data: claims, isLoading } = useGetClaimsQuery();

  // Filter data whenever claims, searchTerm, or selectedStatus changes
useEffect(() => {
  if (!claims) return;

  let filtered = claims;

  // Filter by status
  if (selectedStatus) {
    filtered = filtered.filter(
      (claim) =>
        claim.status &&
        claim.status.toLowerCase() === selectedStatus.toLowerCase()
    );
  }

  // Filter by user name
  if (searchTerm) {
    filtered = filtered.filter(
      (claim) =>
        claim.user?.name &&
        claim.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  setFilteredData(filtered || []);
}, [claims, selectedStatus, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  const items = [
    {
      key: "status-filter",
      label: (
        <Radio.Group
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
          className="flex flex-col text-white gap-2"
        >
          <Radio className="text-white" value={null}>
            <span className="text-red-500">None</span>
          </Radio>
          <Radio className="text-white" value="pending">
            Pending
          </Radio>
          <Radio className="text-white" value="approved">
            Approved
          </Radio>
          <Radio className="text-white" value="rejected">
            Rejected
          </Radio>
        </Radio.Group>
      ),
    },
  ];

  const handleModalOpen = (sa) => {
    setTableData(sa.data);
    setSelectedClaim(sa.type);
    setIsModalOpen(true);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between gap-4 mt-5 items-center">
        <div className="relative w-full">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: "#030712",
              color: "white",
              height: "50px",
              paddingLeft: "48px",
            }}
            className="w-full placeholder-[#9E9E9E] border border-[#5D87A3]"
            placeholder="Search by name"
          />
          <FaSearch size={18} className="absolute top-4 left-4 text-gray-400" />
        </div>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <button className="flex justify-center items-center popreg hover:bg-blue-950 border-none h-[50px] w-[174px] bg-[#123D74] text-white gap-2">
                <FaPlus size={13} className="text-white" />
                {selectedStatus
                  ? selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)
                  : "All Status"}
              </button>
            </Space>
          </a>
        </Dropdown>
      </div>

      <div className="mt-7">
        <h3 className="text-[25px] popmed font-bold text-white">All Claims</h3>
        <PrizeTable data={filteredData} onOpenModal={handleModalOpen} />
      </div>

      <PrizeModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        location={selectedClaim}
        selectedClaim={tableData}
        id={tableData.id}
      />
    </div>
  );
};

export default PrizeClaim;
