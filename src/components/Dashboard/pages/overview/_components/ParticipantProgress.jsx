import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGetHuntProgressQuery } from "../../../../../redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";

const ParticipantProgress = ({ participants = [], hunts }) => {
  const maxValue =
    hunts?.results?.length > 0
      ? Math.max(...hunts.results.map((item) => item.hunters || 0))
      : 0;

  const [openIndex, setOpenIndex] = useState(null);
  const currentHuntId = openIndex !== null ? hunts.results[openIndex]?.id : undefined;

  const { data, isLoading, error } = useGetHuntProgressQuery(currentHuntId ?? skipToken);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Utility for number formatting (optional)
  const formatNumber = (num) => num.toLocaleString();

  return (
    <div className="bg-[#101625] text-white rounded-xl p-6 w-1/2 shadow-lg">
      <h3 className="text-lg popreg font-semibold mb-4">Participant Progress</h3>

      <div className="h-80 mt-1 overflow-y-auto">
        {!hunts?.results?.length ? (
          <p className="text-[#9E9E9E] italic text-center mt-20">No hunts yet</p>
        ) : (
          hunts.results.map((item, index) => {
            const progressPercent =
              maxValue > 0 ? ((item.hunters || 0) / maxValue) * 100 : 0;

            return (
              <div key={item.id ?? index} className="mb-4 last:mb-0 rounded-md">
                <button
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`hunt-panel-${index}`}
                  className="flex items-center justify-between w-full cursor-pointer bg-gray-700  rounded-md px-2 py-1 transition-colors"
                >
                  <div className="flex items-center gap-3 w-full">
                    {/* Background bar container */}
                    <div className="relative flex-grow h-[47px]  rounded overflow-hidden">
                      {/* Animated progress fill */}
                      <div
                        className="bg-[#2E4A5A] h-full rounded transition-all duration-500 ease-in-out"
                        style={{ width: `${progressPercent}%` }}
                        title={`${formatNumber(item.hunters || 0)} hunters`}
                      />
                      <span className="text-sm absolute top-1/2 left-3 transform -translate-y-1/2 whitespace-nowrap font-medium select-none">
                        {item.title}
                      </span>
                    </div>

                    {/* Hunters count */}
                    <span className="min-w-[32px] text-right font-semibold select-none">
                      {formatNumber(item.hunters || 0)}
                    </span>
                  </div>

                  {/* Dropdown Icon */}
                  <div
                    className="text-xl text-gray-400 select-none ml-3"
                    aria-hidden="true"
                  >
                    {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </button>

                {/* Accordion Content */}
                {openIndex === index && (
                  <section
                    id={`hunt-panel-${index}`}
                    role="region"
                    aria-labelledby={`hunt-header-${index}`}
                    className="p-4 text-gray-300 rounded-b mt-2 bg-gradient-to-br from-[#1a1f3a] to-[#16212e] border border-gray-700"
                  >
                    {isLoading && <p>Loading progress data...</p>}
                    {error && <p className="text-red-500">Error loading data</p>}
                    {data ? (
                      <>
                        {/* Finished Hunt Badge */}
                        {data.finished_hunt ? (
                          <span className="inline-block mb-2 px-3 py-1 bg-green-600 text-green-100 rounded-full text-xs font-semibold">
                            Finished Hunt
                          </span>
                        ) : null}

  <div className="space-y-2">
  {data?.clue_progress?.length > 0 ? (
    data.clue_progress.map((clueObj, idx) => {
      const clueName = Object.keys(clueObj)[0];
      const clueValue = clueObj[clueName];
      return (
        <div
          key={idx}
          className="flex justify-between gap-8 border-gray-600 py-1"
        >
          <p className="font-medium">{clueName}:</p>
          <p className="font-mono text-right text-[#38bdf8]">
            {clueValue}%
          </p>
        </div>
      );
    })
  ) : (
    <p className="italic text-gray-500">No clues available</p>
  )}
</div>

                      </>
                    ) : (
                      !isLoading && <p>No data available.</p>
                    )}
                  </section>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ParticipantProgress;
