import React from "react";
import { CiLocationOn } from "react-icons/ci";
import dayjs from "dayjs";

const Activity = ({ topHunts }) => {
  return (
    <div className="w-full md:w-1/2 bg-[#111827] rounded-xl p-6 text-white shadow-lg">
      {/* Title */}
      <h4 className="text-[18px] popreg font-semibold mb-4 border-b border-gray-700 pb-2">
        Top Hunts
      </h4>

      {/* Scrollable List */}
      <div className="h-80 overflow-y-auto pr-1 custom-scrollbar">
        {topHunts?.length > 0 ? (
          topHunts.map(({ id, title, ratings, start_date, end_date, location }) => {
            const formattedStart = dayjs(start_date).format("MMM D, YYYY h:mm A");
            const formattedEnd = dayjs(end_date).format("MMM D, YYYY h:mm A");

            return (
              <div
                key={id}
                className="flex justify-between items-center bg-[#1f2937] p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 mb-4 group"
              >
                {/* Left: Details */}
                <div className="space-y-2">
                  <h3 className="text-[18px] popmed group-hover:text-[#38bdf8] transition">
                    {title}
                  </h3>
                  <p className="text-[15px] popreg text-[#97BECA]">⭐ {ratings}</p>
                  {location && (
                    <p className="flex items-center text-[13px] text-gray-400">
                      <CiLocationOn className="mr-1" /> {location}
                    </p>
                  )}
                </div>

                {/* Right: Dates with labels */}
                <div className="text-right flex flex-col items-end space-y-1">
                  <span className="text-[13px] text-gray-300">
                    <span className="font-semibold text-gray-400">Start Date: </span>
                    {formattedStart}
                  </span>
                  <span className="text-[13px] text-gray-300">
                    <span className="font-semibold text-gray-400">End Date: </span>
                    {formattedEnd}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center mt-10">No activity found.</p>
        )}
      </div>
    </div>
  );
};

export default Activity;
