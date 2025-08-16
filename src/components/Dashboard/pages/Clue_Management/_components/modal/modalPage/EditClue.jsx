import React from "react";
import Swal from "sweetalert2";
import { Input, Button } from "antd";
import { data } from "react-router-dom";
import { useGetHuntsQuery, useUpdateCluesMutation } from "../../../../../../../redux/slices/apiSlice";
const { TextArea } = Input;

const EditClue = ({data}) => {
  const [isQrcodeOpen, setIsQrcodeOpen] = React.useState(false);
  const [updateClues] = useUpdateCluesMutation()
   const { data: huntData, isLoading,refetch } = useGetHuntsQuery();

  const [clueData, setClueData] = React.useState({
    name: "",
    riddle: "",
    hint: "",
    order: "",
    qr_code: {
      latitude: 0,
      longitude: 0,
      is_active: true,
    },
    is_final_clue: false,
  });

  // Initialize clueData state from incoming data prop on mount or when data changes
React.useEffect(() => {
  if (data) {
    setClueData({
      name: data.name || "",
      riddle: data.riddle || "",
      hint: data.hint || "",
      order: data.order || "",
      qr_code: {
        latitude: data.qr_code?.latitude ?? 0,    // ✅ nested path
        longitude: data.qr_code?.longitude ?? 0,  // ✅ nested path
        is_active: data.qr_code?.is_active ?? true,
      },
      is_final_clue: data.is_final_clue || false,
    });
  }
}, [data]);


  // Handle main fields
  const handleChange = (field, value) => {
    setClueData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle qr_code nested fields
  const handleQrChange = (field, value) => {
    setClueData((prev) => ({
      ...prev,
      qr_code: { ...prev.qr_code, [field]: value },
    }));
  };

const handleCreate = async () => {
  const editData = {
    id: data?.id,
    clueData,
  };

  try {
    const res = await updateClues(editData).unwrap();
    console.log("Sending edit clue data:", clueData);
    console.log("Response:", res);

    Swal.fire({
      title: "Clue Updated!",
      icon: "success",
      background: "#1e1e2f",
      color: "#fff",
      draggable: true,
    });

    refetch();
  } catch (error) {
    console.error("Failed to update clue:", error);

    Swal.fire({
      title: "Error",
      text: error?.data?.message || "Failed to update clue.",
      icon: "error",
      background: "#1e1e2f",
      color: "#fff",
      draggable: true,
    });
  }
};

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "#1e1e2f",
      color: "#fff",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelled!",
          text: "Done.",
          background: "#1e1e2f",
          color: "#fff",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="h-[65vh] pb-9 overflow-y-auto ">
        <div className="flex justify-center my-5 items-center gap-14 text-[23px]">
          <h3 className={isQrcodeOpen ? "" : "text-[#97BECA]"}>Step 1: Edit Clue</h3>
          <h3 className={isQrcodeOpen ? "text-[#97BECA]" : ""}>Step 2: Edit Qr Code</h3>
        </div>

        {isQrcodeOpen ? (
          <div className="space-y-6 p-5">
            <div className="mt-6">
              <p className="text-[#9E9E9E]">
                Set the location and status for your treasure hunt QR code
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-[16px] block mb-1">
                    Edit Latitude
                  </label>
                  <Input
                    placeholder="Enter Latitude"
                    value={clueData.qr_code.latitude}
                    onChange={(e) =>
                      handleQrChange("latitude", parseFloat(e.target.value) || 0)
                    }
                    className="custom-dark-input placeholder-[#9E9E9E]"
                  />
                </div>
                <div>
                  <label className="text-white text-[16px] block mb-1">
                    Edit Longitude
                  </label>
                  <Input
                    placeholder="Enter Longitude"
                    value={clueData.qr_code.longitude}
                    onChange={(e) =>
                      handleQrChange("longitude", parseFloat(e.target.value) || 0)
                    }
                    className="custom-dark-input placeholder-[#9E9E9E]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Input
                  type="checkbox"
                  checked={clueData.qr_code.is_active}
                  onChange={(e) =>
                    handleQrChange("is_active", e.target.checked)
                  }
                  className="custom-dark-input w-4 h-4"
                />
                <label className="text-[#97BECA] text-[16px] block mb-1">
                  Active QR Code?
                </label>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                <button
                  onClick={handleCreate}
                  className="bg-[#2C739E] hover:bg-[#1f5471] transition-all duration-300 text-white w-full  h-[46px] rounded-md shadow-md hover:shadow-lg"
                >
                  Edit Clue
                </button>
                <button
                  onClick={() => setIsQrcodeOpen(false)}
                  className="w-full  h-[46px] bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col p-3 mt-6 gap-8">
            <h5 className="text-[20px] popmed">✅ QR Code Created</h5>

            <div>
              <label className="text-white block mb-1 popmed text-sm sm:text-base">
                Edit Clue Order
              </label>
              <Input
                placeholder="Enter Clue Order"
                value={clueData.order}
                onChange={(e) => handleChange("order", e.target.value)}
                className="mt-2 placeholder-[#9E9E9E]"
                type="number"
                style={{
                  backgroundColor: "#030712",
                  color: "white",
                  height: "60px",
                  paddingLeft: "16px",
                }}
              />
            </div>

            <div>
              <label className="text-white block mb-1 popmed text-sm sm:text-base">
                Edit Clue Name
              </label>
              <Input
                placeholder="Enter Clue Name"
                value={clueData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-2 placeholder-[#9E9E9E]"
                style={{
                  backgroundColor: "#030712",
                  color: "white",
                  height: "60px",
                  paddingLeft: "16px",
                }}
              />
            </div>

            <div>
              <label className="text-white block mb-2 popmed text-sm sm:text-base">
                Edit Riddle
              </label>
              <TextArea
                placeholder="Enter Riddle"
                rows={5}
                value={clueData.riddle}
                onChange={(e) => handleChange("riddle", e.target.value)}
                className="resize-none placeholder-[#9E9E9E]"
                style={{
                  backgroundColor: "#030712",
                  color: "white",
                  padding: "12px 16px",
                }}
              />
            </div>

            <div>
              <label className="text-white block mb-2 popmed text-sm sm:text-base">
                Edit Hints
              </label>
              <TextArea
                placeholder="Enter hints or notes"
                rows={3}
                value={clueData.hint}
                onChange={(e) => handleChange("hint", e.target.value)}
                className="resize-none placeholder-[#9E9E9E]"
                style={{
                  backgroundColor: "#030712",
                  color: "white",
                  padding: "12px 16px",
                }}
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Input
                  type="checkbox"
                  checked={clueData.is_final_clue}
                  onChange={(e) =>
                    handleChange("is_final_clue", e.target.checked)
                  }
                  className="custom-dark-input rounded-full w-5 h-5"
                />
                <label className="text-[#97BECA] text-[16px] block mb-1">
                  Is it Final Clue?
                </label>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button
                  onClick={() => setIsQrcodeOpen(true)}
                  className="bg-[#2C739E] hover:bg-[#1f5471] transition-all duration-300 text-white w-full sm:w-[135px] h-[46px] rounded-md shadow-md hover:shadow-lg"
                >
                  Edit Create Clue
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-[135px] h-[46px] bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditClue;
