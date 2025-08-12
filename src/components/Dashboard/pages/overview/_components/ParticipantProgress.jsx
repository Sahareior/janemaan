import React from "react";

const ParticipantProgress = ({ participants = [] }) => {
  // Safely transform participants into progress data
  const progressData = participants.map((p, index) => ({
    label: p?.user || `User ${index + 1}`, // fallback if user field is missing
    value: Number(p?.total_time_spent) || 0, // ensure numeric
    color:
      index % 4 === 0
        ? "bg-[#2E4A5A]"
        : index % 4 === 1
        ? "bg-[#1C5C4B]"
        : index % 4 === 2
        ? "bg-[#3451C4]"
        : "bg-[#C17A1E]",
    pattern: index === 0, // example: pattern for first user only
  }));

  // Avoid NaN if no participants
  const maxValue =
    progressData.length > 0
      ? Math.max(...progressData.map((item) => item.value))
      : 0;

  return (
    <div className="bg-[#101625] text-white rounded-xl p-6 w-1/2 shadow-lg">
      <h3 className="text-lg popreg font-semibold">Participant Progress</h3>
      <p className="text-sm popreg text-[#9E9E9E] mb-6">
        Hunt Name :{" "}
        <span className="text-white font-medium">
          Treasure Trail Cape Town
        </span>
      </p>

      {progressData.length === 0 ? (
        <p className="text-[#9E9E9E] italic">No participants yet</p>
      ) : (
        progressData.map((item, idx) => (
          <div key={idx} className="mb-4 flex flex-row-reverse gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">{item.label}</span>
            </div>
            <div className="w-full h-[47px] bg-gray-700 rounded overflow-hidden relative">
              <div
                className={`${item.color} h-full rounded`}
                style={{
                  width:
                    maxValue > 0
                      ? `${(item.value / maxValue) * 100}%`
                      : "0%",
                }}
              ></div>
              {item.pattern && (
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-50"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='4'><path d='M0,4 L4,0 M-1,1 L1,-1 M3,5 L5,3' stroke='%23ffffff33' stroke-width='1'/></svg>\")",
                  }}
                ></div>
              )}
              <span className="text-sm absolute top-1/2 left-3 transform -translate-y-1/2">
                {item.value}s
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ParticipantProgress;
