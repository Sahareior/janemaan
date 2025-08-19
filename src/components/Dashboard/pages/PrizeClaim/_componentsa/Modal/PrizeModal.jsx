import React, { useRef, useState } from "react";
import { Modal, Input, Button } from "antd";
import Swal from "sweetalert2";
import "leaflet/dist/leaflet.css";
import "./modal.css";
import EditableClaims from "./modalPage/EditableClaims";
import Review from "./modalPage/Review";

const { TextArea } = Input;

const PrizeModal = ({ open, onCancel,location,id,selectedClaim }) => {


  return (
<Modal
  open={open}
  onCancel={onCancel}
  footer={null}
  className="custom-dark-modal"
  width="90%"
  style={{ maxWidth: "550px" }}
  title={
    <div className="space-y-2 mt-4 pb-4">
      <h2 className="text-white text-base sm:text-lg md:text-xl popmed font-bold">
        Claim Review
      </h2>
      <p className="text-gray-400 text-sm sm:text-base popreg">
        Review claim details and verification photos
      </p>
    </div>
  }
>
{
  location ==="edit"? <EditableClaims id={id} /> : <Review selectedClaim={selectedClaim} />
}
</Modal>

  );
};

export default PrizeModal;
