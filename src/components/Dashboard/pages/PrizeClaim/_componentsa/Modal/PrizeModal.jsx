import React from 'react';
import { Modal, Input, Button } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './modal.css';

const { TextArea } = Input;

const PrizeModal = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="90%"
      style={{ maxWidth: '500px' }} // Mobile first, max width for desktop
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
            Current Status: <span className="text-yellow-400 font-semibold capitalize">Pending</span>
          </h3>
        </div>

        <h3 className="text-white">
          Serial Number: <span className="text-[#97BECA]">892 356 3735</span>
        </h3>

        {/* Verification Section */}
        <div className="space-y-2">
          <h3 className="text-white font-medium">Verification Picture</h3>
          <div className="w-full h-[180px] rounded-lg bg-[#1F2937] flex items-center justify-center text-gray-500 text-center px-4">
            {/* Replace with actual image */}
            Image Preview Placeholder
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between flex-col sm:flex-row">
          <Button className="w-full sm:w-1/2 h-[48px] sm:h-[54px] bg-[#2C739E] text-white">
            Approve Claim
          </Button>
          <Button className="w-full sm:w-1/2 h-[48px] sm:h-[54px] bg-[#E33629]/25 text-white">
            Reject Claim
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PrizeModal;
