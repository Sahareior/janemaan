import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Input,
  DatePicker,
  TimePicker,
  Upload,
  Image,
  Button,
  Spin,
} from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import imageCompression from "browser-image-compression";
import {
  useGetHuntsQuery,
  useUpdateHuntMutation,
} from "../../../redux/slices/apiSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import Swal from "sweetalert2";

const { TextArea } = Input;

const mimeToExt = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const baseName = (filename) =>
  filename.substring(0, filename.lastIndexOf(".")) || filename;

const EditHunt = ({ handleCancel, handleCreate,onCancel, data }) => {
  const [updateHunt, {isLoading}] = useUpdateHuntMutation();
  const { refetch } = useGetHuntsQuery();

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
  const [compressing, setCompressing] = useState(false);
  const [loading, setLoading] = useState(false);

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
        label: data.label || " "
      });

      if (data.image) {
        setFileList([
          {
            uid: "-1",
            name: "existing_image.jpg",
            status: "done",
            url: data.image,
            preview: data.image,
          },
        ]);
      }
    }
  }, [data]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLabelChange =(name,value) =>{
    setFormData({
      ...formData, [name]: value
    })
  }

  const handleSelectChange = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleDateChange = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleCheckboxChange = (e) =>
    setFormData({ ...formData, isPremium: e.target.checked });

  const handleRemove = () => setFileList([]);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };
    const blob = await imageCompression(file, options);
    const extFromMime = mimeToExt[blob.type];
    const originalExt = (file.name?.split(".").pop() || "").toLowerCase();
    const chosenExt = extFromMime || originalExt || "jpg";
    const name = `${baseName(file.name)}.${chosenExt}`;
    return new File([blob], name, { type: blob.type, lastModified: Date.now() });
  };

  const handleChange = async ({ fileList: newFileList }) => {
    if (newFileList.length === 0) return setFileList([]);

    setCompressing(true);
    try {
      const compressedFile = await compressImage(newFileList[0].originFileObj);
      const preview = URL.createObjectURL(compressedFile);
      setFileList([{ uid: newFileList[0].uid, name: compressedFile.name, originFileObj: compressedFile, preview }]);
    } catch (err) {
      console.error("Compression error:", err);
    } finally {
      setCompressing(false);
    }
  };

  const startDateTime =
    formData.startDate && formData.startTime
      ? dayjs(`${formData.startDate.format("YYYY-MM-DD")} ${formData.startTime.format("HH:mm:ss")}`).toISOString()
      : null;

  const endDateTime =
    formData.endDate && formData.endTime
      ? dayjs(`${formData.endDate.format("YYYY-MM-DD")} ${formData.endTime.format("HH:mm:ss")}`).toISOString()
      : null;

const handleUpdate = async () => {
  setLoading(true);
  try {
    const formDataObj = new FormData();
    Object.entries({
      title: formData.title,
      description: formData.description,
      rules: formData.rules,
      prize_amount: formData.prize,
      difficulty_level: formData.difficulty,
      duration: formData.duration,
      city: formData.city,
      label: formData.label,
      status: formData.status,
      start_date: startDateTime || "",
      end_date: endDateTime || "",
      is_premium_only: formData.isPremium,

    }).forEach(([key, value]) => formDataObj.append(key, value));

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formDataObj.append("image", fileList[0].originFileObj);
    }

    await updateHunt({ id: data.id, formData: formDataObj }).unwrap();

    await Swal.fire({
      title: "Done!",
      text: "Hunt updated successfully.",
      icon: "success",
      background: "#1e1e2f",
      color: "#fff",
      confirmButtonText: "OK",
      draggable: true,
    });

    refetch();
    onCancel();
  } catch (err) {
    console.error("Update failed:", err);
    Swal.fire({
      title: "Update failed",
      text:
        err?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.",
      icon: "error",
      background: "#1e1e2f",
      color: "#fff",
      confirmButtonText: "OK",
      draggable: true,
    });
  } finally {
    setLoading(false);
  }
};

  const payload = {
    ...formData,
    start_date: startDateTime,
    end_date: endDateTime,
    image: fileList[0]?.originFileObj ?? fileList[0]?.url ?? null,
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="text-white text-[16px] block mb-1">Edit Hunt Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter Hunt title"
          className="custom-dark-input placeholder-[#9E9E9E]"
        />
      </div>

      {/* City & Prize */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white text-[16px] block mb-2">City</label>
          <Input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter City"
            className="custom-dark-input placeholder-[#9E9E9E]"
          />
        </div>
        <div>
          <label className="text-white text-[16px] block mb-2">Prize</label>
          <Input
            name="prize"
            value={formData.prize}
            onChange={handleInputChange}
            placeholder="Enter Prize amount"
            className="custom-dark-input placeholder-[#9E9E9E]"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-white text-[16px] block mb-2">Edit Description</label>
        <TextArea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter Description"
          className="custom-dark-input resize-none placeholder-[#9E9E9E]"
        />
      </div>

      {/* Rules */}
      <div>
        <label className="text-white text-[16px] block mb-2">Edit Rules</label>
        <TextArea
          name="rules"
          rows={4}
          value={formData.rules}
          onChange={handleInputChange}
          placeholder="Enter Hunt rules and guidelines"
          className="custom-dark-input placeholder-[#9E9E9E] resize-none"
        />
      </div>

      {/* Start & End DateTime */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white text-[16px] block mb-1">Edit Start Time</label>
          <div className="flex gap-2">
            <DatePicker
              value={formData.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
              className="custom-dark-input w-full"
            />
            <TimePicker
              value={formData.startTime}
              onChange={(time) => handleDateChange("startTime", time)}
              className="custom-dark-input w-full"
            />
          </div>
        </div>
        <div>
          <label className="text-white text-[16px] block mb-1">Edit End Time</label>
          <div className="flex gap-2">
            <DatePicker
              value={formData.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
              className="custom-dark-input w-full"
            />
            <TimePicker
              value={formData.endTime}
              onChange={(time) => handleDateChange("endTime", time)}
              className="custom-dark-input w-full"
            />
          </div>
        </div>
      </div>

      {/* Premium */}
      <div className="flex items-center gap-2">
        <Input
          type="checkbox"
          checked={formData.isPremium}
          onChange={handleCheckboxChange}
          className="custom-dark-input w-4 h-4"
        />
        <label className="text-white text-[14px] block">Subscriber Only?</label>
      </div>

      {/* Duration */}
      <div>
        <label className="text-white text-[16px] block mb-1">Edit Duration</label>
        <Input
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          placeholder="e.g., 2h 30m or 150 minutes"
          className="custom-dark-input placeholder-[#9E9E9E]"
        />
      </div>

      {/* Status & Difficulty */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Status */}
  <div>
    <label className="text-white text-[16px] block mb-2">Status</label>
    <div className="relative w-full">
      <select
        value={formData.status}
        onChange={(e) => handleSelectChange("status", e.target.value)}
        className="w-full custom-dark-input text-white border-none focus:outline-none appearance-none pr-10"
      >
        <option value="" disabled>Select Status</option>
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <RiArrowDropDownLine className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  </div>

  {/* Level */}
  <div>
    <label className="text-white text-[16px] block mb-2">Level</label>
    <div className="relative w-full">
      <select
        value={formData.label}
        onChange={(e) => handleLabelChange("label", e.target.value)}
        className="w-full custom-dark-input text-white border-none pr-10"
      >
        <option value="" disabled>Select Level</option>
        <option value="none">None</option>
        <option value="featured">Featured</option>
        <option value="new">New</option>
        <option value="popular">Popular</option>
      </select>
    </div>
  </div>

  {/* Difficulty */}
  <div>
    <label className="text-white text-[16px] block mb-2">Difficulty</label>
    <div className="relative w-full">
      <select
        value={formData.difficulty}
        onChange={(e) => handleSelectChange("difficulty", e.target.value)}
        className="w-full custom-dark-input text-white border-none focus:outline-none appearance-none pr-10"
      >
        <option value="" disabled>Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <RiArrowDropDownLine className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
</div>


      {/* Image Upload */}
      <div>
        <label className="text-white text-[16px] block mb-1">Hunt Picture</label>
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length === 0 ? (
            <Button icon={<UploadOutlined />} disabled={compressing}>
              {compressing ? "Compressing..." : "Upload Photo"}
            </Button>
          ) : (
            <div style={{ position: "relative" }}>
              <Spin spinning={compressing}>
                <Image width={120} src={fileList[0].preview} alt="Uploaded Image" />
              </Spin>
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

      {/* Footer */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleCancel}
          className="w-[135px] h-[45px] bg-black hover:bg-slate-400 border border-[#9E9E9E]"
        >
          Cancel
        </button>
<button
  onClick={handleUpdate}
  disabled={compressing || isLoading}
  className="bg-[#2C739E] w-[135px] h-[45px] border border-blue-600 text-white hover:bg-[#1e5a7d] flex items-center justify-center"
>
  {isLoading ? (
    <Spin size="small" className="text-white" />
  ) : (
    "Update Hunt"
  )}
</button>
      </div>
    </div>
  );
};

export default EditHunt;
