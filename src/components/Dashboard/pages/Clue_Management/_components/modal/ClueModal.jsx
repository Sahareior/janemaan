import React, { useEffect } from "react";
import { Modal, Input, Button } from "antd";

import "leaflet/dist/leaflet.css";
import "./modal.css";
import Swal from "sweetalert2";
import EditClue from "./modalPage/EditClue";
import CreateClue from "./modalPage/CreateClue";
import EditQrPage from "../../../QrCode_Management/_components/EditQrPage";


const { TextArea } = Input;

const ClueModal = ({ open, onCancel, edit,huntId,data,position }) => {

  console.log(data)
 
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="custom-dark-modal p-1 sm:p-8"
      width="45%"
      style={{ maxWidth: "960px", top: 20 }}
      title={
        <div>
<p className="text-[30px] popreg text-center">Create New Clue</p>
<p className="text-[17px] popreg text-center text-[#9E9E9E]">Design a clue for participants</p>
        </div>
      }
    >
{
  edit ? (
    position ? (
      <EditQrPage data={data} />
    ) : (
      <EditClue data={data} huntId={huntId} />
    )
  ) : (
    <CreateClue huntId={huntId} />
  )
}

    </Modal>
  );
};

export default ClueModal;
