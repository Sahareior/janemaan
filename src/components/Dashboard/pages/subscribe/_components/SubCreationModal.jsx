import React from "react";
import { Modal } from "antd";
import EditSubs from "./modalPages/EditSubs";
import CreateSubs from "./modalPages/CreateSubs";
import ViewSubs from "./modalPages/ViewSubs";

const SubCreationModal = ({ open, onCancel, edit }) => {
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
            {edit === "edit"
              ? "Edit Subscription Plan"
              : edit === "view"
              ? "View Subscription Plan"
              : "Create New Subscription Plan"}
          </h2>
          <p className="text-gray-400 text-sm text-center sm:text-base popreg">
            {edit === "view"
              ? "Details of the subscription plan."
              : "Fill in the details to create a new subscription plan."}
          </p>
        </div>
      }
    >
      {edit === "view" ? (
        <ViewSubs />
      ) : edit === "edit" ? (
        <EditSubs />
      ) : (
        <CreateSubs />
      )}
    </Modal>
  );
};

export default SubCreationModal;
