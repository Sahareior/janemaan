import React, { useState } from 'react';
import { Input, Select } from "antd";
import { RiArrowDropDownLine } from 'react-icons/ri';

const { TextArea } = Input;

const CreateSubs = () => {
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
    console.log(formData);
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
          <label className="block mb-1 popreg text-[14px]">Price</label>
          <Input
            placeholder="0.00"
            className="custom-dark-input"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 popreg text-[14px]">Currency</label>

  <div className="relative w-full">
      <select
        value={formData.currency}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full custom-dark-input custom-select-placeholder text-white  border-none focus:outline-none appearance-none pr-10"
        // appearance-none removes default arrow, pr-10 for space for custom icon
      >
  <option value="" disabled>
          Select Currency
        </option>
  <option value="usd">USD</option>
  <option value="eur">EUR</option>
  <option value="gbp">GBP</option>
      </select>
      <RiArrowDropDownLine
        className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />
    </div>

        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 popreg text-[14px]">Interval</label>
  <div className="relative w-full">
      <select
        value={formData.interval}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full custom-dark-input custom-select-placeholder text-white  border-none focus:outline-none appearance-none pr-10"
        // appearance-none removes default arrow, pr-10 for space for custom icon
      >
        <option value="" disabled>
          Select Interval
        </option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
      <RiArrowDropDownLine
        className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />
    </div>
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
          Create Plan
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

export default CreateSubs;
