import React, { useState } from "react";
import { StatCard } from "../overview/Overview";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button, Input } from "antd";
import SubscriptionTable from "./_components/SubscriptionTable";
import SubCreationModal from "./_components/SubCreationModal";


const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
setIsModalOpen
  return (
    <div className="p-5">
      <div>


        <div className="flex justify-end gap-4 mt-5 items-center">


          <button
            onClick={() => setIsModalOpen(true)}
            className="flex hover:bg-blue-950 justify-center border-none popreg items-center h-[50px] w-[174px] bg-[#123D74] text-white gap-2"
          >
            <FaPlus size={13} className="text-white" />
            Add Plan
          </button>
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-[25px] text-white px-5">All Clues</h3>
        <SubscriptionTable />
      </div>

      <SubCreationModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Subscription;
