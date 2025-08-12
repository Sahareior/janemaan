import React, { useState } from "react";
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
import { useCreateHuntsMutation } from "../../../redux/slices/apiSlice";
import { RiArrowDropDownLine } from "react-icons/ri";

const { TextArea } = Input;
const { Option } = Select;

const CreateHunt = ({ handleCancel, handleCreate, refetch }) => {
  // Add state for each input
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
  const [createHunts] = useCreateHuntsMutation();

  const handleRemove = () => {
    setFileList([]);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Gather and send data on create
  const handleSubmit = async () => {
    const startDateTime =
      startDate && startTime
        ? `${startDate.format("YYYY-MM-DD")}T${startTime.format(
            "HH:mm"
          )}:00.000Z`
        : null;

    const endDateTime =
      endDate && endTime
        ? `${endDate.format("YYYY-MM-DD")}T${endTime.format("HH:mm")}:00.000Z`
        : null;

    const parseDuration = (input) => {
      const regex = /(?:(\d+)h)?\s*(?:(\d+)m)?/i;
      const match = input.match(regex);

      if (!match) return "00:00:00";

      const hours = match[1] ? String(match[1]).padStart(2, "0") : "00";
      const minutes = match[2] ? String(match[2]).padStart(2, "0") : "00";

      return `${hours}:${minutes}:00`;
    };

    const formData = new FormData();
    formData.append("title", huntTitle);
    formData.append("city", city);
    formData.append("prize_amount", prizeAmount.toString());
    formData.append("description", description);
    formData.append("rules", rules);
    formData.append("start_date", startDateTime);
    formData.append("end_date", endDateTime);
    formData.append("is_premium_only", isPremium);
    formData.append("duration", parseDuration(duration));
    formData.append("status", status);
    formData.append("difficulty_level", difficulty);
    formData.append("label", "none");

    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const res = await createHunts(formData).unwrap();
      console.log("Hunt created:", res);
      refetch();
      handleCreate?.(); // If you have a callback
    } catch (error) {
      console.error("Failed to create hunt:", error);
    }
    const formDataObj = {};
    for (const [key, value] of formData.entries()) {
      formDataObj[key] = value;
    }
    const res = await createHunts(formDataObj).unwrap();
    console.log("Hunt created:", res);
    console.log("FormData contents:", formDataObj);
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Hunt Title */}
        <div>
          <label className="text-white text-[16px] block mb-1">
            Hunt Title
          </label>
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
          <label className="text-white text-[16px] block mb-2">
            Description
          </label>
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

        {/* Start & End Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-[16px] block mb-1">
              Start time
            </label>
            <div className="flex gap-2">
              <DatePicker
                className="custom-dark-input w-full"
                value={startDate}
                onChange={(value) => setStartDate(value)}
              />
              <TimePicker
                className="custom-dark-input w-full"
                value={startTime}
                onChange={(value) => setStartTime(value)}
              />
            </div>
          </div>
          <div>
            <label className="text-white text-[16px] block mb-2">
              End time
            </label>
            <div className="flex gap-2">
              <DatePicker
                className="custom-dark-input w-full"
                value={endDate}
                onChange={(value) => setEndDate(value)}
              />
              <TimePicker
                className="custom-dark-input w-full"
                value={endTime}
                onChange={(value) => setEndTime(value)}
              />
            </div>
          </div>
        </div>

        {/* Premium Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
            className="custom-dark-input w-4 h-4"
          />
          <label className="text-white text-[16px] block mb-1">
            Premium Only?
          </label>
        </div>

        {/* Duration */}
        <div>
          <label className="text-white text-[16px] block mb-2">Duration</label>
          <Input
            placeholder="e.g., 2h 30m or 150 minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
                className="w-full custom-dark-input custom-select-placeholder text-white  border-none focus:outline-none appearance-none pr-10"
                // appearance-none removes default arrow, pr-10 for space for custom icon
              >
                <option value="" disabled>
                  Select Interval
                </option>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <RiArrowDropDownLine
                className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
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
                className="w-full custom-dark-input custom-select-placeholder text-white  border-none focus:outline-none appearance-none pr-10"
                // appearance-none removes default arrow, pr-10 for space for custom icon
              >
                <option value="" disabled>
                  Select Interval
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <RiArrowDropDownLine
                className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-white text-[16px] block mb-2">
            Hunt Picture
          </label>
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
            className="w-[135px] h-[52px] bg-black border border-[#9E9E9E] text-white hover:bg-white hover:text-black hover:border-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#2C739E] w-[135px] h-[52px] border border-blue-600 text-white hover:bg-[#1e5a7d]"
          >
            Create Hunt
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHunt;
