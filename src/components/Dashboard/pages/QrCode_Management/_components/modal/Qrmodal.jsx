import React from 'react';
import { Modal } from 'antd';
import 'leaflet/dist/leaflet.css';
import './modal.css'; // your dark mode styles

const Qrmodal = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="90%" // Responsive default width
      style={{ maxWidth: '480px' }} // Desktop max width
      title={
        <div>
          <h4 className="text-lg sm:text-xl md:text-2xl popmed text-white">
            QR CODE - <span className="text-blue-400">564651463</span>
          </h4>
        </div>
      }
    >
      <div className="flex flex-col justify-center py-10 gap-10 text-white text-sm sm:text-base md:text-lg">
        
        {/* Header Info */}
        <div className="space-y-2 text-left popmed">
          <p>Clue Name: <span className="italic text-gray-300">"The secret box beside the fire"</span></p>
          <p>Clue ID: <span className="text-gray-300 font-medium">CL001</span></p>
        </div>

        {/* QR Image */}
        <div className="w-full flex justify-center">
          <img
            className="w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-md border border-gray-600 object-contain"
            src="/images/image 1.png"
            alt="QR Code"
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 popreg text-sm sm:text-base md:text-lg">
          <div className="space-y-2 text-left">
            <p><span className="font-medium text-gray-400">City:</span> Cape Town</p>
            <p><span className="font-medium text-gray-400">Expires on:</span> 05-09-2025</p>
          </div>
          <div className="space-y-2 text-left">
            <p><span className="font-medium text-gray-400">Status:</span> <span className="text-green-500 font-semibold">Active</span></p>
            <p><span className="font-medium text-gray-400">Scanned:</span> 450 times</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Qrmodal;
