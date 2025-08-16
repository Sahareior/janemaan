import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "antd";
import QrTable from "./_components/QrTable";
import ClueModal from "../Clue_Management/_components/modal/ClueModal";
import { useGetQrCodesQuery } from "../../../../redux/slices/apiSlice";

const QrCodeManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: qrCode } = useGetQrCodesQuery();


  // const sortedArray = qrCode.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  console.log(qrCode)
 const codes = qrCode || []; 
  // Filter by code (case-insensitive)
  const filteredCodes = useMemo(() => {
    if (!searchText.trim()) return codes;
    const lowerSearch = searchText.toLowerCase();
    return codes.filter((item) => item.code.toLowerCase().includes(lowerSearch));
  }, [searchText, codes]);

  return (
    <div className="p-5">
      <div className="flex justify-between gap-4 mt-5 items-center">
        <div className="relative w-full">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by code"
            style={{
              backgroundColor: "#030712",
              color: "white",
              height: "50px",
              paddingLeft: "48px",
            }}
            className="w-full placeholder-[#9E9E9E] border border-[#5D87A3] hover:bg-[#5D87A3]"
          />
          <FaSearch size={18} className="absolute top-4 left-4 text-gray-400" />
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-[25px] text-white px-5">All Clues</h3>
        <QrTable qrCode={filteredCodes} />
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
