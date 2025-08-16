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

const { TextArea } = Input;
const { Option } = Select;

const EditHunt = ({ handleCancel, handleCreate,data}) => {
  const [updateHunt ] = useUpdateHuntMutation()
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

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };



  // import dayjs from "dayjs";

const startDateTime = 
  formData.startDate && formData.startTime
    ? dayjs(`${formData.startDate.format("YYYY-MM-DD")} ${formData.startTime.format("HH:mm:ss")}`).toISOString()
    : null;

const endDateTime = 
  formData.endDate && formData.endTime
    ? dayjs(`${formData.endDate.format("YYYY-MM-DD")} ${formData.endTime.format("HH:mm:ss")}`).toISOString()
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
  image: fileList.length > 0
    ? (fileList[0].originFileObj ?? fileList[0].url) // <--- always prefer originFileObj
    : null,
};




const items ={
data:data.id , payload
}

const handleUpdate = async () => {
  try {
    const formDataObj = new FormData();

    // Append all form fields
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

    // Handle Image - only append if it's a new file
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formDataObj.append("image", fileList[0].originFileObj);
    }

    // For debugging - view all FormData entries
    for (let [key, value] of formDataObj.entries()) {
      console.log(key, value);
    }

    // Call the mutation with both ID and formData
    const res = await updateHunt({
      id: data.id, 
      formData: formDataObj
    }).unwrap();

    refetch();
    console.log("Hunt updated:", res);
  } catch (error) {
    console.error("Update failed:", error);
  }
};




  return (
    <div className="space-y-6">
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

      {/* City & Prize Amount */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="text-white text-[16px] block mb-2 " htmlFor="">City</label>
          <Input
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Enter City"
          className="custom-dark-input placeholder-[#9E9E9E]"
        />
    </div>
<div>
  <label className=" text-white text-[16px] block mb-2" htmlFor="">Price</label>
          <Input
          name="prize"
          value={formData.prize}
          onChange={handleInputChange}
          placeholder="Enter Prize amount"
          className="custom-dark-input placeholder-[#9E9E9E]"
        />
</div>
      </div>

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

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white text-[16px] block mb-1">Edit Start time</label>
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
          <label className="text-white text-[16px] block mb-1">Edit End time</label>
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
        <label className="text-white text-[14px] block">Edit Premium Only?</label>
      </div>

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
    


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="relative w-full">
  <select
    value={formData.status}
    onChange={(e) => handleSelectChange("status", e.target.value)}
    className="w-full custom-dark-input custom-select-placeholder text-white border-none focus:outline-none appearance-none pr-10"
  >
    <option value="" disabled>
      Select Status
    </option>
    <option value="draft">Draft</option>
    <option value="active">Active</option>
    <option value="completed">Completed</option>
    {/* <option value="cancelled">Cancelled</option> */}
  </select>
  <RiArrowDropDownLine
    className="text-white text-3xl absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
    aria-hidden="true"
  />
</div>

<div className="relative w-full">
  <select
    value={formData.difficulty}
    onChange={(e) => handleSelectChange("difficulty", e.target.value)}
    className="w-full custom-dark-input custom-select-placeholder text-white border-none focus:outline-none appearance-none pr-10"
  >
    <option value="" disabled>
      Select Difficulty
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
            handleUpdate()
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
