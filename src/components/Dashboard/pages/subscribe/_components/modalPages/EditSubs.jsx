import React, { useState, useEffect } from 'react';
import { Input } from "antd";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useGetClaimsQuery, useGetPlanQuery, useUpdatePlansMutation } from '../../../../../../redux/slices/apiSlice';
import Swal from 'sweetalert2';

const { TextArea } = Input;

const EditSubs = ({ data,onCancel }) => {
  const [updatePlans] = useUpdatePlansMutation()
 const {data:demo,refetch} =useGetPlanQuery()
  const id = data?.id
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "",
    interval: "",
    discount_percent: ""
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        description: data.description || "",
        price: data.price !== undefined ? data.price.toString() : "",
        currency: data.currency || "",
        interval: data.interval || "",
        discount_percent: data.discount_percent !== undefined ? data.discount_percent.toString() : ""
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

const handleSubmit = async () => {
  const dataToLog = {
    ...formData,
    price: parseFloat(formData.price, 10) || 0,
    discount_percent: parseFloat(formData.discount_percent, 10) || 0,
  };

  try {
    const res = await updatePlans({ id, dataToLog });

    if (res?.error) {
      Swal.fire({
        title: "Error",
        text: res.error?.data?.message || "Something went wrong.",
        icon: "error",
        background: "#1e1e2f",
        color: "#fff",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: "Plan updated successfully!",
        icon: "success",
        background: "#1e1e2f",
        color: "#fff",
      });
      refetch();
      onCancel()
    }

    console.log(res);
  } catch (err) {
    Swal.fire({
      title: "Error",
      text: err.message || "Unexpected error occurred.",
      icon: "error",
      background: "#1e1e2f",
      color: "#fff",
    });
  }
};


  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12 mt-4 p-2 rounded-xl text-white">
      {/* Name */}
      <div className="mb-4">
        <label className="block mb-1 popreg text-[14px]">Edit Name</label>
        <Input
          placeholder="Enter Plan Name"
          className="custom-dark-input"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-1 popreg text-[14px]">Edit Description</label>
        <TextArea
          placeholder="Enter Description"
          rows={4}
          className="custom-dark-input"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Price and Currency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 popreg text-[16px]">Edit Price</label>
          <Input
            placeholder="0.00"
            className="custom-dark-input"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 popreg text-[14px]">Edit Currency</label>
          <select
            className="w-full custom-dark-input custom-select-placeholder text-white bg-transparent border-none focus:outline-none"
            value={formData.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
          >
            <option value="" disabled>
                Select Currency
              </option>
              <option value="zar">ZAR</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
          </select>
        </div>
      </div>

      {/* Interval and Discount Percent */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 popreg text-[14px]">Edit Interval</label>
          <div className="relative w-full">
            <select
              value={formData.interval}
              onChange={(e) => handleChange("interval", e.target.value)}
              className="w-full custom-dark-input custom-select-placeholder text-white border-none focus:outline-none appearance-none pr-10"
            >
              <option value="" disabled>Select Interval</option>
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
          <label className="block mb-1 popreg text-[14px]">Edit Discount Percent</label>
          <Input
            placeholder="0%"
            className="custom-dark-input"
            value={formData.discount_percent}
            onChange={(e) => handleChange("discount_percent", e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          className="w-full h-[46px] border border-[#9E9E9E] bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
        >
          Cancel
        </button>
                <button
          onClick={handleSubmit}
          className="bg-[#2C739E] hover:bg-[#1f5471] transition-all duration-300 text-white w-full h-[46px] rounded-md shadow-md hover:shadow-lg"
        >
          Edit Plan
        </button>
      </div>
    </div>
  );
};

export default EditSubs;
