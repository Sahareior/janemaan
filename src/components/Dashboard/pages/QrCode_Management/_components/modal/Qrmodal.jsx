import React from 'react';
import { Modal } from 'antd';
import 'leaflet/dist/leaflet.css';
import './modal.css'; // your dark mode styles

const Qrmodal = ({ open, onCancel, data }) => {
  const handleDownload = () => {
    if (data?.qr_image) {
      const link = document.createElement('a');
      link.href = data.qr_image;
      link.download = `${data.code || 'QR_Code'}.png`; // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="90%"
      style={{ maxWidth: '700px' }}
      title={
        <div className='px-8 py-6'>
          <h4 className="text-lg sm:text-xl md:text-2xl popmed text-white">
            QR CODE - <span className="text-blue-400">{data?.code}</span>
          </h4>
        </div>
      }
    >
      <div className="flex flex-col justify-center px-20 py-10 gap-10 text-white text-sm sm:text-base md:text-lg">
        {/* QR Image */}
        <div className="w-full flex justify-center">
          <img
            className="w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-md border border-gray-600 object-contain"
            src={data?.qr_image}
            alt="QR Code"
          />
        </div>

        {/* Download Button */}
        <div className='flex justify-center mt-6'>
          <button
            onClick={handleDownload}
            className='bg-[#2C739E] hover:bg-[#1f5471] transition-all duration-300 text-white w-full sm:w-[135px] h-[46px] rounded-md shadow-md hover:shadow-lg'
          >
            Download
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Qrmodal;
