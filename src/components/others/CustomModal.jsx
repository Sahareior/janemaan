import React from 'react';
import { Modal, Input, Button } from 'antd';
import './modal.css'; // 👈 Important for custom dark styles

const CustomModal = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null} // 👈 Remove default footer buttons
      className="custom-dark-modal"
       width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      title={
        <div>
          <h2 className="text-white text-[28px] popmed font-semibold">Create New Hunt</h2>
          <p className="text-gray-400 popreg text-[18px]">Set up a new hunt with necessary details</p>
        </div>
      }
    >
      <div className="space-y-4 p-6">
        {/* Hunt Title */}
        <div>
          <label className="text-white text-[20px] popmed block mb-1">Hunt Title</label>
          <Input   style={{
      backgroundColor: '#030712',
      color: 'white',
      height: '50px',
      paddingLeft: '32px',
      
    }} placeholder="Enter Hunt title" className="custom-dark-input" />
        </div>

        {/* City & Prize Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-[20px] popmed block mb-1">City</label>
            <Input   style={{
      backgroundColor: '#030712',
      color: 'white',
      height: '50px',
      paddingLeft: '32px',
      
    }} placeholder="Enter City" className="custom-dark-input" />
          </div>
          <div>
            <label className="text-white text-[20px] popmed block mb-1">Prize Amount (RS)</label>
            <Input   style={{
      backgroundColor: '#030712',
      color: 'white',
      height: '50px',
      paddingLeft: '32px',
      
    }} placeholder="Enter Prize amount" className="custom-dark-input" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-white text-[20px] popmed block mb-1">Description</label>
          <Input.TextArea
            style={{
      backgroundColor: '#030712',
      color: 'white',
    
      paddingLeft: '32px',
      
    }}
            rows={4}
            placeholder="Enter Description"
            className="custom-dark-input resize-none"
          />
        </div>

        {/* Rules */}
        <div>
          <label className="text-white text-[20px] popmed block mb-1">Rules</label>
          <Input.TextArea
            style={{
      backgroundColor: '#030712',
      color: 'white',
   
      paddingLeft: '32px',
      
    }}
            rows={5}
            placeholder="Enter Hunt rules and guidelines"
            className="custom-dark-input resize-none"
          />
        </div>

      <div className='flex justify-end mt-4'>
          <Button>Save</Button>
      </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
