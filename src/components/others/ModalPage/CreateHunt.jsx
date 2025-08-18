import React, { useState, useEffect } from "react";
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
import { useCreateHuntsMutation } from "../../../redux/slices/apiSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import imageCompression from "browser-image-compression";

const { TextArea } = Input;

const mimeToExt = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/x-icon": "ico",
};

const baseName = (name) =>
  name && name.includes(".")
    ? name.slice(0, name.lastIndexOf("."))
    : "upload";

const CreateHunt = ({ handleCancel, handleCreate, refetch,onCancel }) => {
  const [huntTitle, setHuntTitle] = useState("");
  const [city, setCity] = useState("");
  const [prizeAmount, setPrizeAmount] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [fileList, setFileList] = useState([]);
  const [compressing, setCompressing] = useState(false);
// mutation hook
const [createHunts, { isLoading }] = useCreateHuntsMutation();


  // Reset form
  const resetForm = () => {
    setHuntTitle("");
    setCity("");
    setPrizeAmount("");
    setDescription("");
    setRules("");
    setStartDate(null);
    setStartTime(null);
    setEndDate(null);
    setEndTime(null);
    setIsPremium(false);
    setDuration("");
    setStatus("");
    setDifficulty("");
    setFileList([]);
  };

  // Cleanup URLs
  useEffect(() => {
    return () => {
      fileList.forEach((f) => f?.preview && URL.revokeObjectURL(f.preview));
    };
  }, [fileList]);

  const handleRemove = () => {
    fileList.forEach((f) => f?.preview && URL.revokeObjectURL(f.preview));
    setFileList([]);
  };

  // Compress if > 1MB
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
    return new File([blob], name, {
      type: blob.type,
      lastModified: Date.now(),
    });
  };

  const handleChange = async ({ fileList: newFileList }) => {
    if (!newFileList?.length) {
      setFileList([]);
      return;
    }

    const item = newFileList[0];

    if (item?.originFileObj) {
      setCompressing(true);
      try {
        const raw = item.originFileObj;

        let finalFile = raw;
        if (raw.size / 1024 / 1024 > 1) {
          // compress only if >1MB
          finalFile = await compressImage(raw);
        }

        const previewURL = URL.createObjectURL(finalFile);
        const updated = {
          ...item,
          name: finalFile.name,
          type: finalFile.type,
          size: finalFile.size,
          originFileObj: finalFile,
          preview: previewURL,
          status: "done",
          uid: item.uid || `${Date.now()}`,
        };

        if (item.preview && item.preview !== previewURL) {
          URL.revokeObjectURL(item.preview);
        }

        setFileList([updated]);
      } catch (err) {
        console.error("Image handling error:", err);
      } finally {
        setCompressing(false);
      }
    } else {
      setFileList(newFileList);
    }
  };

  const handleSubmit = async () => {
    const startDateTime =
      startDate && startTime
        ? `${startDate.format("YYYY-MM-DD")}T${startTime.format(
            "HH:mm"
          )}:00.000Z`
        : null;
    const endDateTime =
      endDate && endTime
        ? `${endDate.format("YYYY-MM-DD")}T${endTime.format(
            "HH:mm"
          )}:00.000Z`
        : null;

const parseDuration = (input) => {
  const regex = /^([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/; // HH:MM:SS
  if (!regex.test(input)) {
    return "00:00:00"; // fallback if invalid
  }
  return input;
};


    const formData = new FormData();
    formData.append("title", huntTitle);
    formData.append("city", city);
    formData.append("prize_amount", String(prizeAmount || ""));
    formData.append("description", description);
    formData.append("rules", rules);
    formData.append("start_date", startDateTime);
    formData.append("end_date", endDateTime);
    formData.append("is_premium_only", String(isPremium));
    formData.append("duration", parseDuration(duration));
    formData.append("status", status);
    formData.append("difficulty_level", difficulty);
    formData.append("label", "none");

    const imgFile = fileList[0]?.originFileObj;
    if (imgFile) {
      formData.append("image", imgFile, imgFile.name);
    }

    try {
      const res = await createHunts(formData).unwrap();
      console.log("Hunt created:", res);
      refetch();
      resetForm();
      handleCreate?.();
      onCancel()
    } catch (err) {
      console.error("Failed to create hunt:", err);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="text-white text-[16px] block mb-1">Hunt Title</label>
          <Input
            placeholder="Enter Hunt title"
            value={huntTitle}
            onChange={(e) => setHuntTitle(e.target.value)}
            className="custom-dark-input placeholder-[#9E9E9E]"
          />
        </div>

        {/* City & Prize */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-[16px] block mb-1">City</label>
            <Input
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="custom-dark-input placeholder-[#9E9E9E]"
            />
          </div>
          <div>
            <label className="text-white text-[16px] block mb-1">
              Prize Amount (৳)
            </label>
            <Input
              placeholder="Enter Prize amount"
              type="number"
              value={prizeAmount}
              onChange={(e) => setPrizeAmount(e.target.value)}
              className="custom-dark-input placeholder-[#9E9E9E]"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-white text-[16px] block mb-2">Description</label>
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="custom-dark-input resize-none placeholder-[#9E9E9E]"
          />
        </div>

        {/* Rules */}
        <div>
          <label className="text-white text-[16px] block mb-2">Rules</label>
          <TextArea
            rows={4}
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Enter Hunt rules and guidelines"
            className="custom-dark-input resize-none placeholder-[#9E9E9E]"
          />
        </div>

        {/* Start & End */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-[16px] block mb-1">Start time</label>
            <div className="flex gap-2">
              <DatePicker
                className="custom-dark-input w-full"
                value={startDate}
                onChange={(v) => setStartDate(v)}
              />
              <TimePicker
                className="custom-dark-input w-full"
                value={startTime}
                onChange={(v) => setStartTime(v)}
              />
            </div>
          </div>
          <div>
            <label className="text-white text-[16px] block mb-2">End time</label>
            <div className="flex gap-2">
              <DatePicker
                className="custom-dark-input w-full"
                value={endDate}
                onChange={(v) => setEndDate(v)}
              />
              <TimePicker
                className="custom-dark-input w-full"
                value={endTime}
                onChange={(v) => setEndTime(v)}
              />
            </div>
          </div>
        </div>

        {/* Premium */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
            className="custom-dark-input w-4 h-4"
          />
          <label className="text-white text-[16px]">Premium Only?</label>
        </div>

        {/* Duration */}
        <div>
          <label className="text-white text-[16px] block mb-2">Duration</label>
<Input
  placeholder="HH:MM:SS"
  value={duration}
  onChange={(e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // keep only digits
    if (value.length > 6) value = value.slice(0, 6); // max 6 digits (HHMMSS)

    // Auto-format to HH:MM:SS
    let formatted = value;
    if (value.length >= 5) {
      formatted = `${value.slice(0, 2)}:${value.slice(2, 4)}:${value.slice(4, 6)}`;
    } else if (value.length >= 3) {
      formatted = `${value.slice(0, 2)}:${value.slice(2, 4)}`;
    } else if (value.length >= 1) {
      formatted = value;
    }

    setDuration(formatted);
  }}
  maxLength={8} // HH:MM:SS = 8 chars
  className="custom-dark-input placeholder-[#9E9E9E]"
/>

        </div>

        {/* Status & Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-[16px] block mb-2">Status</label>
            <div className="relative w-full">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full custom-dark-input text-white border-none pr-10"
              >
                <option value="" disabled>
                  Select Interval
                </option>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {/* <RiArrowDropDownLine className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2" /> */}
            </div>
          </div>
          <div>
            <label className="text-white text-[16px] block mb-2">
              Difficulty
            </label>
            <div className="relative w-full">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full custom-dark-input text-white border-none pr-10"
              >
                <option value="" disabled>
                  Select Interval
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {/* <RiArrowDropDownLine className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2" /> */}
            </div>
          </div>
        </div>

        {/* Upload */}
        <div>
          <label className="text-white text-[16px] block mb-2">
            Hunt Picture
          </label>
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length === 0 ? (
              <Button   style={{
    color: compressing ? "white" : "red", // white for compressing, red for normal
    opacity: 1, // override disabled opacity
  }} className="text-red-600" icon={<UploadOutlined />} disabled={compressing}>
                {compressing ? "Compressing..." : "Upload Photo"}
              </Button>
            ) : (
              <div style={{ position: "relative" }}>
                <Spin spinning={compressing}>
                  <Image
                    width={120}
                    src={fileList[0].preview}
                    alt="Uploaded Image"
                  />
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

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="w-[135px] h-[52px] bg-black border border-[#9E9E9E] text-white hover:bg-white hover:text-black hover:border-black"
          >
            Cancel
          </button>
<button
  onClick={handleSubmit}
  disabled={compressing || isLoading}
  className="bg-[#2C739E] w-[135px] h-[52px] border border-blue-600 text-white hover:bg-[#1e5a7d] flex items-center justify-center"
>
  {isLoading ? (
    <Spin size="small" className="text-white" />
  ) : (
    "Create Hunt"
  )}
</button>

        </div>
      </div>
    </div>
  );
};

export default CreateHunt;
