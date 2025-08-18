import React from "react";
import { Modal } from "antd";
import CreateVoucher from "../../Clue_Management/_components/modal/modalPage/CreateVoucher";
import UpdateVoucher from "./pages/UpdateVoucher";


const VoucherModal = ({ open,huntId, onCancel, edit,data }) => {

  console.log("dada",data)
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal"
      width="90%"
      style={{ maxWidth: "700px" }}

    >
        {
            edit? <UpdateVoucher voucher={data}  huntId={huntId} />:<CreateVoucher huntId={huntId} />
        }
     
    </Modal>
  );
};

export default VoucherModal;
