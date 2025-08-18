import React from "react";
import Swal from "sweetalert2";
import { Input } from "antd";
import { useGetQrCodesQuery, useUpdateQrCodeMutation } from "../../../../../redux/slices/apiSlice";

const EditQrPage = ({ data }) => {
  const [qrData, setQrData] = React.useState({
    latitude: "",
    longitude: "",
    is_active: true,
  });

  const id = data?.id;
  const [updateQrCode] = useUpdateQrCodeMutation();
  const { refetch } = useGetQrCodesQuery();

  React.useEffect(() => {
    if (data) {
      setQrData({
        latitude: data.latitude?.toString() ?? "",
        longitude: data.longitude?.toString() ?? "",
        is_active: data.is_active ?? true,
      });
    }
  }, [data]);

  const handleQrChange = (field, value) => {
    // Only allow digits, dot, minus
    if (/^-?\d*\.?\d*$/.test(value) || value === "") {
      setQrData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      // Convert string inputs to floats
      const payload = {
        ...qrData,
        latitude: parseFloat(qrData.latitude),
        longitude: parseFloat(qrData.longitude),
      };

      const res = await updateQrCode({ id, qrData: payload }).unwrap();
      Swal.fire({
        title: "QR Code Updated!",
        icon: "success",
        background: "#1e1e2f",
        color: "#fff",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Failed to update QR Code.",
        icon: "error",
        background: "#1e1e2f",
        color: "#fff",
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Cancelled!",
      text: "No changes were saved.",
      icon: "info",
      background: "#1e1e2f",
      color: "#fff",
    });
  };

  return (
    <div className="space-y-6 p-5">
      <p className="text-[#9E9E9E]">
        Set the location and status for your treasure hunt QR code
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white text-[16px] block mb-1">Edit Latitude</label>
          <Input
            placeholder="Enter Latitude"
            value={qrData.latitude}
            onChange={(e) => handleQrChange("latitude", e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-white text-[16px] block mb-1">Edit Longitude</label>
          <Input
            placeholder="Enter Longitude"
            value={qrData.longitude}
            onChange={(e) => handleQrChange("longitude", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Input
          type="checkbox"
          checked={qrData.is_active}
          onChange={(e) => handleQrChange("is_active", e.target.checked)}
          className="custom-dark-input w-4 h-4"
        />
        <label className="text-[#97BECA] text-[16px] block mb-1">
          Active QR Code?
        </label>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <button
          onClick={handleSave}
          className="bg-[#2C739E] hover:bg-[#1f5471] transition-all duration-300 text-white w-full h-[46px] rounded-md shadow-md hover:shadow-lg"
        >
          Save QR Code
        </button>
        <button
          onClick={handleCancel}
          className="w-full h-[46px] bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditQrPage;
