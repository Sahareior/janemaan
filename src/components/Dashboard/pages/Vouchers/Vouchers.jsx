import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { Input, Spin } from "antd";
import { useGetAllVoucherQuery } from "../../../../redux/slices/apiSlice";
import VoucherModal from "./_components/VoucherModal";
import VoucherTable from "./_components/VoucherTable";

const Vouchers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: vouchers, isLoading } = useGetAllVoucherQuery();

  

  // Filter vouchers by code based on search term
  const filteredVouchers = useMemo(() => {
    if (!searchTerm) return vouchers || [];
    return vouchers.filter((voucher) =>
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vouchers, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between w-full gap-4 mt-5 items-center">
        <div className="relative w-full">
          <Input
            placeholder="Search vouchers by code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: "#030712",
              color: "white",
              height: "50px",
              paddingLeft: "48px",
            }}
            className="w-full placeholder-[#9E9E9E] popreg border border-[#5D87A3]"
          />
          <FaSearch
            size={18}
            className="absolute top-4 left-4 text-gray-400"
          />
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-[25px] text-white px-5">ALL Vouchers</h3>
        <VoucherTable vouchers={filteredVouchers} />
      </div>

      <VoucherModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Vouchers;
