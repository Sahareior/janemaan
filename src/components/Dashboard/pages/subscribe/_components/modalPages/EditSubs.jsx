import React, { useState } from 'react';
import { Input, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaArrowCircleDown } from 'react-icons/fa';

const { TextArea } = Input;

const EditSubs = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "",
    interval: "",
    discount_percent: ""
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Convert price and discount_percent to numbers if possible
    const dataToLog = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      discount_percent: parseFloat(formData.discount_percent) || 0
    };
    console.log(dataToLog);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12 mt-4 p-2 rounded-xl text-white">
      <div className="mb-4">
        <label className="block mb-1 popreg text-[14px]">Name</label>
        <Input
          placeholder="Enter Plan Name"
          className="custom-dark-input"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 popreg text-[14px]">Description</label>
        <TextArea
          placeholder="Enter Description"
          rows={4}
          className="custom-dark-input"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 popreg text-[16px]">Price</label>
          <Input
            placeholder="0.00"
            className="custom-dark-input"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 popreg text-[14px]">Currency</label>
          <Select
            placeholder="Select Currency"
            suffixIcon={<DownOutlined />}
            className="w-full custom-dark-input"
            dropdownClassName="custom-dark-dropdown"
            value={formData.currency}
            onChange={(value) => handleChange("currency", value)}
          >
            <Select.Option value="usd">USD</Select.Option>
            <Select.Option value="eur">EUR</Select.Option>
            <Select.Option value="gbp">GBP</Select.Option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 popreg text-[14px]">Interval</label>
          <Select
            placeholder="Select Interval"
            suffixIcon={<FaArrowCircleDown className='text-red-500 text-xl' />}
            className="w-full text-white custom-dark-input"
            dropdownClassName="custom-dark-dropdown"
            value={formData.interval}
            onChange={(value) => handleChange("interval", value)}
          >
            <Select.Option value="month">Month</Select.Option>
            <Select.Option value="year">Year</Select.Option>
          </Select>
        </div>
        <div>
          <label className="block mb-1 popreg text-[14px]">Discount Percent</label>
          <Input
            placeholder="17%"
            className="custom-dark-input"
            value={formData.discount_percent}
            onChange={(e) => handleChange("discount_percent", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleSubmit}
          className="bg-[#2C739E] hover:bg-[#1f5471] transition-all duration-300 text-white w-full h-[46px] rounded-md shadow-md hover:shadow-lg"
        >
          Create New Plan
        </button>
        <button
          className="w-full h-[46px] border border-[#9E9E9E] bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditSubs;
