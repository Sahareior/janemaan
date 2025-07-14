import React from 'react';
import { Modal, Input, Button, DatePicker, TimePicker, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './modal.css'; // For dark theme customizations

const { TextArea } = Input;
const { Option } = Select;

const CustomModal = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="50%"
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
          <label className="text-white text-[16px] block mb-1">Hunt Title</label>
          <Input placeholder="Enter Hunt title" className="custom-dark-input" />
        </div>

        {/* City & Prize Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-[16px] block mb-1">City</label>
            <Input placeholder="Enter City" className="custom-dark-input" />
          </div>
          <div>
            <label className="text-white text-[16px] block mb-1">Prize Amount (৳)</label>
            <Input placeholder="Enter Prize amount" className="custom-dark-input" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-white text-[16px] block mb-1">Description</label>
          <TextArea rows={3} placeholder="Enter Description" className="custom-dark-input resize-none" />
        </div>

        {/* Rules */}
        <div>
          <label className="text-white text-[16px] block mb-1">Rules</label>
          <TextArea rows={4} placeholder="Enter Hunt rules and guidelines" className="custom-dark-input resize-none" />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-[16px] block mb-1">Start time</label>
            <div className="flex gap-2">
              <DatePicker className="custom-dark-input w-full" />
              <TimePicker className="custom-dark-input w-full" />
            </div>
          </div>
          <div>
            <label className="text-white text-[16px] block mb-1">End time</label>
            <div className="flex gap-2">
              <DatePicker className="custom-dark-input w-full" />
              <TimePicker className="custom-dark-input w-full" />
            </div>
          </div>
        </div>

        {/* Status & Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-[16px] block mb-1">Status</label>
            <Input placeholder="Enter Status" className="custom-dark-input" />
          </div>
          <div>
            <label className="text-white text-[16px] block mb-1">Difficulty</label>
            <Select placeholder="Select Difficulty" className="custom-dark-input w-full" dropdownClassName="custom-dark-dropdown">
              <Option value="Easy">Easy</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Hard">Hard</Option>
            </Select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-white text-[16px] block mb-1">Hunt Picture</label>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" className="bg-blue-600 border-blue-600 hover:bg-blue-700 text-white">
            Create Hunt
          </Button>
        </div>

      </div>
    </Modal>
  );
};

export default CustomModal;
