import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ParticipantProgress = ({ hunts }) => {
  const maxValue =
    hunts?.results?.length > 0
      ? Math.max(...hunts.results.map((item) => item.hunters || 0))
      : 0;

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatNumber = (num) => num.toLocaleString();

  // 🌌 Dark futuristic gradient palette
  const colors = [
    "from-[#0f2027] to-[#2c5364]", // deep teal → steel blue
    "from-[#232526] to-[#414345]", // dark graphite → slate gray
    "from-[#1e3c72] to-[#2a5298]", // deep navy → blue steel
    "from-[#42275a] to-[#734b6d]", // plum → muted violet
    "from-[#16222a] to-[#3a6073]", // dark cyan → steel teal
    "from-[#141e30] to-[#243b55]", // midnight blue gradient
  ];

  return (
    <div className="bg-[#0b0f1a] text-white rounded-xl p-6 w-1/2 shadow-lg">
      <h3 className="text-lg popreg font-semibold mb-4">Participant Progress</h3>

      <div className="h-80 mt-1 overflow-y-auto">
        {!hunts?.results?.length ? (
          <p className="text-[#9E9E9E] italic text-center mt-20">No hunts yet</p>
        ) : (
          hunts.results.map((item, index) => {
            const progressPercent =
              maxValue > 0 ? ((item.hunters || 0) / maxValue) * 100 : 0;

            const colorClass = colors[index % colors.length];

            return (
              <div key={item.id ?? index} className="mb-4 last:mb-0 rounded-md">
                <button
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`hunt-panel-${index}`}
                  className={`flex items-center justify-between w-full cursor-pointer rounded-md px-2 py-1
                  transition-transform transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,180,255,0.25)]
                  bg-gradient-to-r ${colorClass}`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="relative flex-grow h-[47px] rounded overflow-hidden bg-black/30">
                      <div
                        className="h-full rounded transition-all duration-500 ease-in-out bg-gradient-to-r from-[#38bdf8]/30 to-[#9333ea]/30"
                        style={{ width: `${progressPercent}%` }}
                        title={`${formatNumber(item.hunters || 0)} hunters`}
                      />
                      <span className="text-sm absolute top-1/2 left-3 transform -translate-y-1/2 whitespace-nowrap font-medium select-none">
                        {item.title}
                      </span>
                    </div>
                    <span className="min-w-[32px] text-right font-semibold select-none">
                      {formatNumber(item.hunters || 0)}
                    </span>
                  </div>

                  <div
                    className="text-xl text-gray-200 drop-shadow-md select-none ml-3"
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
                    className="p-4 text-gray-300 rounded-b mt-2 
                    bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-gray-700"
                  >
                    {item.clues?.length > 0 ? (
                      <div className="space-y-2">
                        {item.clues.map((clue) => (
                          <div
                            key={clue.id}
                            className="flex justify-between gap-8 border-gray-600 py-1"
                          >
                            <p className="font-medium">{clue.name}</p>
                            <p className="font-mono text-right text-[#38bdf8]">
                              {clue.qr_code?.scan_count ?? 0} scans
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="italic text-gray-500">No clues available</p>
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
