import React, { useRef, useState } from "react";
import Quill from "quill";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "../editor/Editor";
import Swal from "sweetalert2";
import { useGetPrivacyQuery,useUpdatePrivacyMutation } from "../../../../../redux/slices/apiSlice";


const Delta = Quill.import("delta");

const Privacy = ({ isText }) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const location = useLocation();
  const [previewHTML, setPreviewHTML] = useState(""); // ✅ Displayed HTML
  const navigate = useNavigate();
  const {data,isLoading,refetch} = useGetPrivacyQuery()
  const [updatePrivacy] = useUpdatePrivacyMutation()

  const quillRef = useRef(null);




  let finalText = data?.content



  const handleUpdate = () => {
    Swal.fire({
      title: "Updated Successfully",
      icon: "success",
      background: "#1e1e2f",
      color: "#fff",
      draggable: true,
    });
  };

const handleLogContent = async () => {
  if (quillRef.current) {
    const html = quillRef.current.root.innerHTML;
    const text = quillRef.current.getText();


    try {
      const res = await updatePrivacy({ content: text }).unwrap();
      if(res){
          handleUpdate();
      }
      refetch()
    } catch (err) {
      console.error("❌ Update failed:", err);
    }
  }
};

  return (
    <div className="settings-container pb-11">
     {isLoading ? (
      <p className="text-white">Loading content...</p>
    ) : (
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta().insert(finalText)}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
    )}

      <div className="settings-controls">
        <button
          className="get-length-btn text-white mt-7 popbold w-[153px] h-[40px] bg-[#2765A1]"
          onClick={() => {
            handleLogContent();
          
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Privacy;