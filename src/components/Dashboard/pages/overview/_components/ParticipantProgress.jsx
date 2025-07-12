import React from 'react';

const ParticipantProgress = () => {
  const data = [
    { label: 'Clue 1', value: 78, color: 'bg-[#2E4A5A]', pattern: true },
    { label: 'Clue 2', value: 45, color: 'bg-[#1C5C4B]' },
    { label: 'Clue 3', value: 24, color: 'bg-[#3451C4]' },
    { label: 'Hunt', value: 12, color: 'bg-[#C17A1E]' },
  ];

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-[#101625] text-white rounded-xl p-6 w-1/2 shadow-lg">
      <h3 className="text-lg popreg font-semibold">Participant Progress</h3>
      <p className="text-sm popreg text-[#9E9E9E] mb-6">
        Hunt Name : <span className="">Treasure Trail Cape town</span>
      </p>

      {data.map((item, idx) => (
        <div key={idx} className="mb-4 flex flex-row-reverse gap-3">
          <div className="flex  items-center justify-between mb-1">
            
            <span className="text-sm">({item.value})</span>
          </div>
          <div className="w-full h-[47px] bg-gray-700 rounded overflow-hidden relative">
            <div
              className={`${item.color} h-full rounded`}
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            ></div>
            {item.pattern && (
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22><path d=%22M0,4 L4,0 M-1,1 L1,-1 M3,5 L5,3%22 stroke=%22%23ffffff33%22 stroke-width=%221%22/></svg>')] opacity-50"></div>
            )}
            <span className="text-sm absolute top-4 left-3">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParticipantProgress;
