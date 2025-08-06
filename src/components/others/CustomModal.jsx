import React, { useState } from "react";
import {
  Modal,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Upload,
  Select,
  Image,
} from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import "./modal.css"; // For dark theme customizations
import Swal from "sweetalert2";

const { TextArea } = Input;
const { Option } = Select;

const CustomModal = ({ open, onCancel, edit }) => {
  const [fileList, setFileList] = useState([]);

  const handleRemove = () => {
    setFileList([]);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCreate = () => {
    Swal.fire({
      title: "Done!",
      icon: "success",
      background: "#1e1e2f",
      color: "#fff",
      draggable: true,
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      background: "#1e1e2f",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelled!",
          text: "Done.",
          icon: "success",
          background: "#1e1e2f",
          color: "#fff",
        });
      }
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="45%"
      style={{ top: 20 }}
      title={
        <div>
          {edit ? (
            <div>
              <h2 className="text-white text-[28px] popmed font-semibold">
                Edit Hunt
              </h2>
              <p className="text-gray-400 popreg text-[18px]">
                Edit a new hunt with necessary details
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-white text-[28px] popmed font-semibold">
                Create New Hunt
              </h2>
              <p className="text-gray-400 popreg text-[18px]">
                Set up a new hunt with necessary details
              </p>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-4 p-2 h-[70vh] overflow-y-scroll">
        {edit ? (
          <div className="space-y-6">
            <div>
              <label className="text-white text-[16px] block mb-1">
               Edit Hunt Title
              </label>
              <Input
                placeholder="Enter Hunt title"
                className="custom-dark-input placeholder-[#9E9E9E]"
              />
            </div>

            {/* City & Prize Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-[16px] block mb-1">
                 Edit City
                </label>
                <Input
                  placeholder="Enter City"
                  className="custom-dark-input placeholder-[#9E9E9E]"
                />
              </div>
              <div>
                <label className="text-white text-[16px] block mb-1">
                 Edit Prize Amount (৳)
                </label>
                <Input
                  placeholder="Enter Prize amount"
                  className="custom-dark-input placeholder-[#9E9E9E]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-white text-[16px] block mb-2">
               Edit Description
              </label>
              <TextArea
                rows={4}
                placeholder="Enter Description"
                className="custom-dark-input resize-none placeholder-[#9E9E9E]"
              />
            </div>

            {/* Rules */}
            <div>
              <label className="text-white text-[16px] block mb-2">Edit Rules</label>
              <TextArea
                rows={4}
                placeholder="Enter Hunt rules and guidelines"
                className="custom-dark-input placeholder-[#9E9E9E] resize-none"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-[16px] block mb-1">
                 Edit Start time
                </label>
                <div className="flex gap-2">
                  <DatePicker className="custom-dark-input placeholder-[#9E9E9E] w-full" />
                  <TimePicker className="custom-dark-input placeholder-[#9E9E9E] w-full" />
                </div>
              </div>
              <div>
                <label className="text-white text-[16px] block mb-1">
                 Edit End time
                </label>
                <div className="flex gap-2">
                  <DatePicker
                    className="custom-dark-input w-full"
                    placeholder="Select Date"
                  />
                  <TimePicker
                    className="custom-dark-input w-full"
                    placeholder="Select Time"
                  />
                </div>
              </div>
            </div>
              {/* Is Premium Only? */}
<div className="flex items-center  gap-2">
  <Input type="checkbox" className="custom-dark-input w-4 h-4" />
  <label className="text-white text-[14px] block ">Edit Premium Only?</label>
</div>



{/* Duration & Max Participants */}

  <div>
    <label className="text-white text-[16px] block mb-1">Edit Duration</label>
    <Input
      placeholder="e.g., 2h 30m or 150 minutes"
      className="custom-dark-input placeholder-[#9E9E9E]"
    />
  </div>



            {/* Status & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
  <label className="text-white text-[16px] block mb-1">Edit Status</label>
  <Select
    placeholder="Select Status"
    className="custom-dark-input placeholder-[#9E9E9E] placeholder:text-red-500 w-full"
    dropdownClassName="custom-dark-dropdown"
  >
    <Option value="Draft">Draft</Option>
    <Option value="Active">Active</Option>
    <Option value="Completed">Completed</Option>
    <Option value="Cancelled">Cancelled</Option>
  </Select>
</div>

              <div>
                <label className="text-white text-[16px] block mb-1">
                 Edit Difficulty
                </label>
               <Select
  placeholder="Select Difficulty"
  className="custom-dark-input  w-full"
  dropdownClassName="custom-dark-dropdown"
  style={{ color: 'white' }} // this makes the placeholder text white
>
  <Option value="Easy">Easy</Option>
  <Option value="Medium">Medium</Option>
  <Option value="Hard">Hard</Option>
</Select>

              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-white text-[16px] block mb-1">
                Hunt Picture
              </label>

              <Upload
                showUploadList={false} // Hide default upload list
                beforeUpload={() => false} // Disable automatic upload
                fileList={fileList}
                onChange={handleChange}
              >
                {fileList.length === 0 ? (
                  // Show the upload button when no image is selected
                  <Button icon={<UploadOutlined />}>Upload Photo</Button>
                ) : (
                  // Show the selected image with a cross icon to remove it
                  <div style={{ position: "relative" }}>
                    <Image
                      width={100}
                      src={
                        fileList[0].url ||
                        URL.createObjectURL(fileList[0].originFileObj)
                      }
                      alt="Uploaded Image"
                    />
                    <CloseCircleOutlined
                      onClick={handleRemove}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                )}
              </Upload>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end  gap-4 mt-6">
              <button
                onClick={() => handleCancel()}
                className="w-[135px] h-[45px] bg-black hover:bg-slate-400 border border-[#9E9E9E] popred "
              >
                Cancel
              </button>
              <button
                onClick={() => handleCreate()}
                className="bg-[#2C739E] w-[135px] h-[45px] border-none hover:bg-[#2C739E]/70 popreg text-white"
              >
                Create Hunt
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="text-white text-[16px] block mb-1">
                Hunt Title
              </label>
              <Input
                placeholder="Enter Hunt title"
                className="custom-dark-input placeholder-[#9E9E9E]"
              />
            </div>

            {/* City & Prize Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-[16px] block mb-1">
                  City
                </label>
                <Input
                  placeholder="Enter City"
                  className="custom-dark-input placeholder-[#9E9E9E]"
                />
              </div>
              <div>
                <label className="text-white text-[16px] block mb-1">
                  Prize Amount (৳)
                </label>
                <Input
                  placeholder="Enter Prize amount"
                  className="custom-dark-input placeholder-[#9E9E9E]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-white text-[16px] block mb-2">
                Description
              </label>
              <TextArea
                rows={4}
                placeholder="Enter Description"
                className="custom-dark-input resize-none placeholder-[#9E9E9E]"
              />
            </div>

            {/* Rules */}
            <div>
              <label className="text-white text-[16px] block mb-2">Rules</label>
              <TextArea
                rows={4}
                placeholder="Enter Hunt rules and guidelines"
                className="custom-dark-input placeholder-[#9E9E9E] resize-none"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-[16px] block mb-1">
                  Start time
                </label>
                <div className="flex gap-2">
                  <DatePicker className="custom-dark-input placeholder-[#9E9E9E] w-full" />
                  <TimePicker className="custom-dark-input placeholder-[#9E9E9E] w-full" />
                </div>
              </div>
              <div>
                <label className="text-white text-[16px] block mb-2">
                  End time
                </label>
                <div className="flex gap-2">
                  <DatePicker
                    className="custom-dark-input w-full"
                    placeholder="Select Date"
                  />
                  <TimePicker
                    className="custom-dark-input w-full"
                    placeholder="Select Time"
                  />
                </div>
              </div>
            </div>
              {/* Is Premium Only? */}
<div className="flex items-center gap-2">
  <Input type="checkbox" className="custom-dark-input w-4 h-4" />
  <label className="text-white text-[16px] block mb-1">Premium Only?</label>
</div>



{/* Duration & Max Participants */}

  <div>
    <label className="text-white text-[16px] block mb-2">Duration</label>
    <Input
      placeholder="e.g., 2h 30m or 150 minutes"
      className="custom-dark-input placeholder-[#9E9E9E]"
    />
  </div>



            {/* Status & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
  <label className="text-white text-[16px] block mb-2">Status</label>
  <Select
    placeholder="Select Status"
    className="custom-dark-input placeholder-[#9E9E9E] placeholder:text-red-500 w-full"
    dropdownClassName="custom-dark-dropdown"
  >
    <Option value="Draft">Draft</Option>
    <Option value="Active">Active</Option>
    <Option value="Completed">Completed</Option>
    <Option value="Cancelled">Cancelled</Option>
  </Select>
</div>

              <div>
                <label className="text-white text-[16px] block mb-2">
                  Difficulty
                </label>
               <Select
  placeholder="Select Difficulty"
  className="custom-dark-input  w-full"
  dropdownClassName="custom-dark-dropdown"
  style={{ color: 'white' }} // this makes the placeholder text white
>
  <Option value="Easy">Easy</Option>
  <Option value="Medium">Medium</Option>
  <Option value="Hard">Hard</Option>
</Select>

              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-white text-[16px] block mb-2">
                Hunt Picture
              </label>

              <Upload
                showUploadList={false} // Hide default upload list
                beforeUpload={() => false} // Disable automatic upload
                fileList={fileList}
                onChange={handleChange}
              >
                {fileList.length === 0 ? (
                  // Show the upload button when no image is selected
                  <Button icon={<UploadOutlined />}>Upload Photo</Button>
                ) : (
                  // Show the selected image with a cross icon to remove it
                  <div style={{ position: "relative" }}>
                    <Image
                      width={100}
                      src={
                        fileList[0].url ||
                        URL.createObjectURL(fileList[0].originFileObj)
                      }
                      alt="Uploaded Image"
                    />
                    <CloseCircleOutlined
                      onClick={handleRemove}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                )}
              </Upload>
            </div>

            {/* Footer Buttons */}
<div className="flex justify-end gap-4 mt-6">
  <button
    onClick={() => handleCancel()}
    className="w-[135px] h-[52px] bg-black border border-[#9E9E9E] text-white popred transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black"
  >
    Cancel
  </button>
  <button
    onClick={() => handleCreate()}
    className="bg-[#2C739E] w-[135px] h-[52px] border border-blue-600 text-white popreg transition-all duration-300 ease-in-out hover:bg-[#1e5a7d] hover:shadow-lg"
  >
    Create Hunt
  </button>
</div>


          </div>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
