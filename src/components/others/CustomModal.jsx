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
import EditHunt from "./ModalPage/EditHunt";
import CreateHunt from "./ModalPage/CreateHunt";



const CustomModal = ({ open, onCancel, edit }) => {


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
          
   <EditHunt handleCreate={handleCreate} handleCancel={handleCancel} />
        ) : (
<CreateHunt handleCreate={handleCreate} handleCancel={handleCancel} />
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
