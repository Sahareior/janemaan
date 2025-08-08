import React, { useRef, useState } from "react";
import { Modal, Input,Select, Button } from "antd";
import Swal from "sweetalert2";
import EditSubs from "./modalPages/EditSubs";
import CreateSubs from "./modalPages/CreateSubs";


const { TextArea } = Input;




const SubCreationModal = ({ open, onCancel,edit }) => {


  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="90%"
      style={{ maxWidth: "700px" }}
      title={
        <div>
          <h2 className="text-white text-base text-center sm:text-lg md:text-xl popmed font-bold">
          {
            edit === true ? "Edit Subscription Plan" : "Create New Subscription Plan"
          }
          </h2>
          <p className="text-gray-400 text-sm text-center sm:text-base popreg">
            Fill in the details to create a new subscription plan.
          </p>
        </div>
      }
    >
{
    edit === true? (
<CreateSubs />
    ): (
      <EditSubs />
    )
}
    </Modal>
  );
};

export default SubCreationModal;
