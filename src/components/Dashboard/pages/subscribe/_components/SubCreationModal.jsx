import React, { useRef, useState } from "react";
import { Modal, Input,Select, Button } from "antd";
import Swal from "sweetalert2";


const { TextArea } = Input;




const SubCreationModal = ({ open, onCancel,edit }) => {


  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="90%"
      style={{ maxWidth: "700px" }}
      title={
        <div>
          <h2 className="text-white text-base text-center sm:text-lg md:text-xl popmed font-bold">
          Create New Plan
          </h2>
          <p className="text-gray-400 text-sm text-center sm:text-base popreg">
            Fill in the details to create a new subscription plan.
          </p>
        </div>
      }
    >
{
    edit? (
         <div className="max-w-xl  mx-auto space-y-8 pb-12 mt-4 p-2 rounded-xl text-white">
      <div className="mb-4">
        <label className="block mb-1 popreg text-[14px]">Edit Name</label>
        <Input placeholder="Enter Plan Name" className="custom-dark-input" />
      </div>

      <div className="mb-4">
        <label className="block mb-1 popreg text-[14px]">Edit Description</label>
        <TextArea
          placeholder="Enter Description"
          rows={4}
          className="custom-dark-input"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 popreg text-[14px]">Edit Price</label>
          <Input placeholder="0.00" className="custom-dark-input" />
        </div>
        <div>
          <label className="block mb-1 popreg text-[14px]">Edit Currency</label>
          <Select
            placeholder="USD"
            className="w-full custom-dark-input"
            dropdownClassName="custom-dark-dropdown"
          >
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
            <Select.Option value="GBP">GBP</Select.Option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 popreg text-[14px]">Edit Interval</label>
          <Select
            placeholder="Monthly"
            className="w-full custom-dark-input"
            dropdownClassName="custom-dark-dropdown"
          >
            <Select.Option value="monthly">Monthly</Select.Option>
            <Select.Option value="yearly">Yearly</Select.Option>
          </Select>
        </div>
        <div>
          <label className="block mb-1 popreg text-[14px]">Edit Discount</label>
          <Input placeholder="17%" className="custom-dark-input" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          type="primary"
          className="  bg-[#2C739E] hover:bg-[#1f5471] transition-all duration-300 text-white w-full  h-[46px] rounded-md shadow-md hover:shadow-lg
"
        >
         Confirm Edit Plan
        </button>
        <button
          className="w-full  h-[46px] border border-[#9E9E9E] bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
        >
          Cancel
        </button>
      </div>
    </div>
    ): (
          <div className="max-w-xl mx-auto space-y-8 pb-12 mt-4 p-2 rounded-xl text-white">
      <div className="mb-4">
        <label className="block mb-1 popreg text-[14px]">Name</label>
        <Input placeholder="Enter Plan Name" className="custom-dark-input" />
      </div>

      <div className="mb-4">
        <label className="block mb-1 popreg text-[14px]">Description</label>
        <TextArea
          placeholder="Enter Description"
          rows={4}
          className="custom-dark-input"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 popreg text-[16px]">Price</label>
          <Input placeholder="0.00" className="custom-dark-input" />
        </div>
        <div>
          <label className="block mb-1 popreg text-[14px]">Currency</label>
          <Select
            placeholder="USD"
            className="w-full custom-dark-input"
            dropdownClassName="custom-dark-dropdown"
          >
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
            <Select.Option value="GBP">GBP</Select.Option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 popreg text-[14px]">Interval</label>
          <Select
            placeholder="Monthly"
            className="w-full custom-dark-input"
            dropdownClassName="custom-dark-dropdown"
          >
            <Select.Option value="monthly">Monthly</Select.Option>
            <Select.Option value="yearly">Yearly</Select.Option>
          </Select>
        </div>
        <div>
          <label className="block mb-1 popreg text-[14px]">Discount</label>
          <Input placeholder="17%" className="custom-dark-input" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          type="primary"
          className="  bg-[#2C739E] hover:bg-[#1f5471] transition-all duration-300 text-white w-full  h-[46px] rounded-md shadow-md hover:shadow-lg
"
        >
          Create New Plan
        </button>
        <button
          className="w-full  h-[46px] border border-[#9E9E9E] bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
        >
          Cancel
        </button>
      </div>
    </div>
    )
}
    </Modal>
  );
};

export default SubCreationModal;
