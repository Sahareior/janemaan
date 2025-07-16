import React, { useRef, useState } from "react";
import { Modal, Input, Button } from "antd";
import Swal from "sweetalert2";
import "leaflet/dist/leaflet.css";
import "./modal.css";

const { TextArea } = Input;

const PrizeModal = ({ open, onCancel }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    Swal.fire({
      title: "Approved!",
      background: "#1e1e2f",
      color: "#fff",
      icon: "success",
      draggable: true,
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "#1e1e2f",
      color: "#fff",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          background: "#1e1e2f",
          color: "#fff",
          icon: "success",
        });
      }
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = null;
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="90%"
      style={{ maxWidth: "550px" }}
      title={
        <div>
          <h2 className="text-white text-base sm:text-lg md:text-xl popmed font-bold">
            Claim Review - CRM-001
          </h2>
          <p className="text-gray-400 text-sm sm:text-base popreg">
            Review claim details and verification photos
          </p>
        </div>
      }
    >
      <div className="space-y-6 text-sm sm:text-base md:text-[17px]">
        {/* User Details */}
        <div className="space-y-2 popmed">
          <h3 className="text-white">
            User Name: <span className="text-[#97BECA]">Hennah</span>
          </h3>
          <h3 className="text-white">
            Email: <span className="text-[#97BECA]">hennah@example.com</span>
          </h3>
          <h3 className="text-white">
            Prize: <span className="text-[#97BECA]">Rs 6,65,0531</span>
          </h3>
          <h3 className="text-white">
            Current Status:{" "}
            <span className="text-yellow-400 font-semibold capitalize">
              Pending
            </span>
          </h3>
        </div>

        <h3 className="text-white">
          Serial Number: <span className="text-[#97BECA]">892 356 3735</span>
        </h3>

        {/* Verification Section */}
<div className="space-y-6">
  <h3 className="text-white font-medium">Verification Picture</h3>

  <div
    className="w-2/3 mx-auto h-[180px]  rounded-lg bg-[#1F2937] relative cursor-pointer overflow-hidden"
    onClick={handleImageClick}
  >
    {imagePreview ? (
      <>
        <img
          src={imagePreview}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-md"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveImage();
          }}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full text-xs px-2 py-1 hover:bg-red-700 z-10"
        >
          ✕
        </button>
      </>
    ) : (
      <div className="w-full h-full flex items-center justify-center text-gray-500 text-center px-4">
        Click to upload image
      </div>
    )}
  </div>

  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleFileChange}
    className="hidden"
  />
</div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between flex-col sm:flex-row">
          <Button
            onClick={handleClick}
            className="w-full sm:w-1/2 h-[48px] border-none popreg sm:h-[54px] bg-[#2C739E] text-[17px] text-white"
          >
            Approve Claim
          </Button>
          <Button
            onClick={handleReject}
            className="w-full sm:w-1/2 h-[48px] border-none popreg sm:h-[54px] bg-[#E33629]/55 text-[17px] text-white"
          >
            Reject Claim
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PrizeModal;
