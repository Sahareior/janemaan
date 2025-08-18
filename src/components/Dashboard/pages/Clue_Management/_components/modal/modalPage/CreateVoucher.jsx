import React, { useState } from "react";
import { DatePicker } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";

import dayjs from "dayjs";
import { useCreateVoucherMutation, useGetAllVoucherQuery } from "../../../../../../../redux/slices/apiSlice";
import Swal from "sweetalert2";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";

const CreateVoucher = ({ huntId }) => {
  const [formData, setFormData] = useState({
    code: "",
    status: "active",
    expiry_date: null,
  });
   const { data: vouchers, refetch } = useGetAllVoucherQuery();
  const [createVoucher, { isLoading }] = useCreateVoucherMutation();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    code: formData.code,
    status: formData.status,
    expiry_date: formData.expiry_date
      ? formData.expiry_date.toISOString()
      : null,
  };

  try {
    const res = await createVoucher({ payload, huntId }).unwrap();
    console.log("Voucher created successfully:", res);
    refetch()

    // Show success alert
    Swal.fire({
      title: "Voucher Created!",
      icon: "success",
      background: "#1e1e2f",
      color: "#fff",
      draggable: true,
    });

    // Reset form
    setFormData({ code: "", status: "active", expiry_date: null });
  } catch (err) {
    console.error("Failed to create voucher:", err);

    // Optional: show error alert
    Swal.fire({
      title: "Failed to create voucher",
      text: err?.data?.message || err.message || "Something went wrong",
      icon: "error",
      background: "#1e1e2f",
      color: "#fff",
      draggable: true,
    });
  }
};
  return (
    <div className="p-6 bg-[#030712] text-white rounded-2xl shadow-lg w-full mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
        🎟️ Create Voucher
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code */}
        <div>
          <label className="block popbold text-gray-300 mb-2">Voucher Code</label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
            placeholder="Enter voucher code"
            className="w-full mt-2 placeholder-[#9E9E9E]"
            style={{
              backgroundColor: "#030712",
              color: "white",
              height: "60px",
              paddingLeft: "16px",
              border: "1px solid #1f2937",
              borderRadius: "8px",
            }}
            required
          />
        </div>

        {/* Status (Custom Select) */}
        <div>
          <label className="block popbold text-gray-300 mb-2">Status</label>
          <div className="relative w-full">
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full custom-dark-input text-white border border-[#1f2937] focus:outline-none appearance-none pr-10 rounded-lg h-[60px] pl-4"
              style={{ backgroundColor: "#030712" }}
            >
              <option value="active">Active</option>
              <option value="claimed">Claimed</option>
              <option value="expired">Expired</option>
            </select>
            <RiArrowDropDownLine className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Expiry Date */}
<div>
  <label className="block popbold text-gray-300 mb-2">Expiry Date</label>
  <DatePicker
    showTime
    style={{
      width: "100%",
      backgroundColor: "#030712",
      color: "white",
      height: "60px",
      border: "1px solid #1f2937",
      borderRadius: "8px",
      paddingLeft: "16px",
    }}
    className="dark-datepicker"
    value={formData.expiry_date}
    onChange={(date) => handleChange("expiry_date", date)}
    disabledDate={(current) =>
      current && current < dayjs().startOf("day")
    }
    suffixIcon={<CiCalendar className="text-white text-2xl" />}
  />
</div>
        {/* Submit */}
<div className="flex justify-center">
            <button
          type="submit"
          disabled={isLoading}
          className={`w-4/12 h-12 rounded-lg font-medium transition ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Creating..." : "Create Voucher"}
        </button>
</div>
      </form>
    </div>
  );
};

export default CreateVoucher;
