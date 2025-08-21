import React from "react";
import { Modal } from "antd";
import EditSubs from "./modalPages/EditSubs";
import CreateSubs from "./modalPages/CreateSubs";
import ViewSubs from "./modalPages/ViewSubs";
import Swal from "sweetalert2";

const SubCreationModal = ({ open, onCancel, edit,data }) => {

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
          onCancel()
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

  console.log("dada",data)
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
        <ViewSubs data={data} />
      ) : edit === "edit" ? (
        <EditSubs onCancel={onCancel} handleCancel={handleCancel} data={data} />
      ) : (
        <CreateSubs handleCancel={handleCancel} onCancel={onCancel} />
      )}
    </Modal>
  );
};

export default SubCreationModal;
