import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Input,
  DatePicker,
  TimePicker,
  Upload,
  Select,
  Image,
  Button,
} from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useGetHuntsQuery, useUpdateHuntMutation } from "../../../redux/slices/apiSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import imageCompression from "browser-image-compression"; // ✅ import here

const { TextArea } = Input;

const EditHunt = ({ handleCancel, handleCreate, data }) => {
  const [updateHunt] = useUpdateHuntMutation();
  const { data: e, refetch } = useGetHuntsQuery();

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    prize: "",
    description: "",
    rules: "",
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    isPremium: false,
    duration: "",
    status: "",
    difficulty: "",
  });

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        city: data.city || "",
        prize: data.prize_amount || "",
        description: data.description || "",
        rules: data.rules || "",
        startDate: data.start_date ? dayjs(data.start_date) : null,
        startTime: data.start_date ? dayjs(data.start_date) : null,
        endDate: data.end_date ? dayjs(data.end_date) : null,
        endTime: data.end_date ? dayjs(data.end_date) : null,
        isPremium: data.is_premium_only || false,
        duration: data.duration || "",
        status: data.status || "",
        difficulty: data.difficulty_level || "",
      });

      if (data.image) {
        setFileList([
          {
            uid: "-1",
            name: "existing_image.jpg",
            status: "done",
            url: data.image,
          },
        ]);
      }
    }
  }, [data]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelectChange = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleDateChange = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleCheckboxChange = (e) =>
    setFormData({ ...formData, isPremium: e.target.checked });

  const handleRemove = () => {
    setFileList([]);
  };

  // ✅ Compress image before adding to fileList
  const handleChange = async ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;

      if (file) {
        try {
          const options = {
            maxSizeMB: 1, // target max size
            maxWidthOrHeight: 1920, // resize if too big
            useWebWorker: true,
          };

          const compressedBlob = await imageCompression(file, options);

          // Preserve original extension
          const ext = file.name.split(".").pop();
          const compressedFile = new File([compressedBlob], file.name || `upload.${ext}`, {
            type: compressedBlob.type,
          });

          setFileList([
            {
              uid: file.uid || "-1",
              name: compressedFile.name,
              status: "done",
              originFileObj: compressedFile,
            },
          ]);
        } catch (err) {
          console.error("Image compression failed:", err);
          setFileList(newFileList);
        }
      } else {
        setFileList(newFileList);
      }
    } else {
      setFileList([]);
    }
  };

  // --- Date formatting
  const startDateTime =
    formData.startDate && formData.startTime
      ? dayjs(
          `${formData.startDate.format("YYYY-MM-DD")} ${formData.startTime.format("HH:mm:ss")}`
        ).toISOString()
      : null;

  const endDateTime =
    formData.endDate && formData.endTime
      ? dayjs(
          `${formData.endDate.format("YYYY-MM-DD")} ${formData.endTime.format("HH:mm:ss")}`
        ).toISOString()
      : null;

  const payload = {
    title: formData.title,
    description: formData.description,
    rules: formData.rules,
    prize_amount: formData.prize,
    difficulty_level: formData.difficulty,
    duration: formData.duration,
    city: formData.city,
    label: "none",
    status: formData.status,
    start_date: startDateTime,
    end_date: endDateTime,
    is_premium_only: formData.isPremium,
    image:
      fileList.length > 0
        ? fileList[0].originFileObj ?? fileList[0].url
        : null,
  };

  const handleUpdate = async () => {
    try {
      const formDataObj = new FormData();

      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("rules", formData.rules);
      formDataObj.append("prize_amount", formData.prize);
      formDataObj.append("difficulty_level", formData.difficulty);
      formDataObj.append("duration", formData.duration);
      formDataObj.append("city", formData.city);
      formDataObj.append("label", "none");
      formDataObj.append("status", formData.status);
      formDataObj.append("start_date", startDateTime || "");
      formDataObj.append("end_date", endDateTime || "");
      formDataObj.append("is_premium_only", formData.isPremium);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formDataObj.append("image", fileList[0].originFileObj);
      }

      for (let [key, value] of formDataObj.entries()) {
        console.log(key, value);
      }

      console.log("Final FormData:", formDataObj);

      // const res = await updateHunt({
      //   id: data.id,
      //   formData: formDataObj,
      // }).unwrap();

      // refetch();
      // console.log("Hunt updated:", res);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* ... your JSX stays the same (inputs, selects, etc.) ... */}

      {/* Image Upload */}
      <div>
        <label className="text-white text-[16px] block mb-1">Hunt Picture</label>
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length === 0 ? (
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          ) : (
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
          onClick={handleCancel}
          className="w-[135px] h-[45px] bg-black hover:bg-slate-400 border border-[#9E9E9E] popred"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleCreate(payload, fileList);
            handleUpdate();
          }}
          className="bg-[#2C739E] w-[135px] h-[45px] border-none hover:bg-[#2C739E]/70 popreg text-white"
        >
          Update Hunt
        </button>
      </div>
    </div>
  );
};

export default EditHunt;
