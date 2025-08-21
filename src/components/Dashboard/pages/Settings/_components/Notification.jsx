import React, { useState } from "react";
import {
  useGetHuntsQuery,
  useGetUsersQuery,
  useNotificationSendMutation,
} from "../../../../../redux/slices/apiSlice";
import { FaUserFriends, FaBullhorn, FaFlag, FaRocket } from "react-icons/fa";
import { GiBowArrow } from "react-icons/gi";
import { Button } from "antd";

const Notification = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: huntData, isLoading: huntsLoading } = useGetHuntsQuery();
  const [notificationSend, { isLoading: notificationLoading }] =
    useNotificationSendMutation();

  const [formData, setFormData] = useState({
    user_ids: [],
    hunt_ids: [],

    title: "",
    message: "",
    notification_type: "general",
    send_push: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUserSelect = (id) => {
    setFormData((prev) => ({
      ...prev,
      user_ids: prev.user_ids.includes(id)
        ? prev.user_ids.filter((uid) => uid !== id)
        : [...prev.user_ids, id],
    }));
  };

  const handleHuntSelect = (id) => {
    setFormData((prev) => ({
      ...prev,
      hunt_ids: prev.hunt_ids.includes(id)
        ? prev.hunt_ids.filter((hid) => hid !== id)
        : [...prev.hunt_ids, id],
    }));
  };

  const handleSubmit = async () => {
    console.log("Final Payload:", formData);
    const res = await notificationSend(formData);
    console.log(res);
  };

  return (
    <div className="p-6 bg-gray-950 text-gray-100 rounded-xl max-w-5xl mx-auto border border-gray-800 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/5 rounded-full blur-xl"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2 relative z-10">
        <div className="relative">
          <FaBullhorn className="text-cyan-400 animate-pulse" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          TRANSMIT NOTIFICATION
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* Left Column */}
        <div className="flex flex-col justify-between">
          {/* Title Input */}
<div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-lg">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 block">
              TITLE PULSE
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter transmission title"
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Message Input */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-lg">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 block">
              MESSAGE STREAM
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Encode your notification message..."
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
              rows={5}
            />
          </div>

          {/* Notification Type */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-lg">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FaFlag className="text-sm" /> TRANSMISSION TYPE
            </label>
            <select
              name="notification_type"
              value={formData.notification_type}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
            >
              <option value="hunt_release">Hunt Release</option>
              <option value="clue_unlocked">Clue Unlocked</option>
              <option value="hunt_completed">Hunt Completed</option>
              <option value="prize_approved">Prize Approved</option>
              <option value="prize_rejected">Prize Rejected</option>
              <option value="subscription_expiry">Subscription Expiry</option>
              <option value="general">General Broadcast</option>
            </select>
          </div>
</div>
      {/* Submit Button */}
      <div className="mt-8 relative z-10">
        <button
          onClick={handleSubmit}
          disabled={notificationLoading}
          className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div className="relative flex items-center justify-center gap-2">
            {notificationLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>TRANSMITTING...</span>
              </>
            ) : (
              <>
                <FaRocket className="group-hover:animate-pulse" />
                <span>INITIATE TRANSMISSION</span>
              </>
            )}
          </div>
        </button>
      </div>
        </div>

        {/* Right Column */}
        <div className="">
          {/* Flags Section */}


          {/* Users Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-lg">
            <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FaUserFriends className="text-sm" /> TARGET RECIPIENTS
            </h3>
            {usersLoading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-500"></div>
                <p className="text-gray-400 text-sm mt-2">Loading user database...</p>
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-800 bg-gray-900/50 p-2 space-y-1">
                {users?.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 cursor-pointer transition-all group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.user_ids.includes(user.id)}
                        onChange={() => handleUserSelect(user.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 ${formData.user_ids.includes(user.id) ? 'bg-cyan-500 border-cyan-500' : 'border-gray-600'} rounded-sm transition-all group-hover:border-cyan-400 flex items-center justify-center`}>
                        {formData.user_ids.includes(user.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm">
                      {user.name}
                      <span className="text-gray-400 text-xs block">{user.email}</span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Hunts Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-lg">
            <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <GiBowArrow className="text-sm" /> TARGET HUNTS
            </h3>
            {huntsLoading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-500"></div>
                <p className="text-gray-400 text-sm mt-2">Loading hunt database...</p>
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-800 bg-gray-900/50 p-2 space-y-1">
                {huntData?.results?.map((hunt) => (
                  <label
                    key={hunt.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50 cursor-pointer transition-all group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.hunt_ids.includes(hunt.id)}
                        onChange={() => handleHuntSelect(hunt.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 ${formData.hunt_ids.includes(hunt.id) ? 'bg-cyan-500 border-cyan-500' : 'border-gray-600'} rounded-sm transition-all group-hover:border-cyan-400 flex items-center justify-center`}>
                        {formData.hunt_ids.includes(hunt.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm">
                      {hunt.title}
                      <span className="text-gray-400 text-xs block">{hunt.city}</span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Notification;