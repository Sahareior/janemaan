import { Button } from 'antd';
import React from 'react';
import { CiLocationOn } from "react-icons/ci";

// Sample activities data
const activities = [
  {
    id: 1,
    title: 'Treasure Hunt in Cape Town',
    location: 'Capetown Center Hall',
    city: 'Cape Town',
    time: 'Just Now',
    status: 'joined',
  },
  {
    id: 2,
    title: 'Historical Riddle Adventure',
    location: 'Bo-Kaap Museum',
    city: 'Cape Town',
    time: '2 mins ago',
    status: 'participating',
  },
  {
    id: 3,
    title: 'Sunset Puzzle Trail',
    location: 'Table Mountain Base',
    city: 'Cape Town',
    time: '5 mins ago',
    status: 'dropped',
  },
  {
    id: 4,
    title: 'Sunset Puzzle Trail',
    location: 'Table Mountain Base',
    city: 'Cape Town',
    time: '5 mins ago',
    status: 'dropped',
  },
  {
    id: 5,
    title: 'Sunset Puzzle Trail',
    location: 'Table Mountain Base',
    city: 'Cape Town',
    time: '5 mins ago',
    status: 'dropped',
  },
];


const statusStyles = {
  joined: {
    label: 'Joined',
    bg: 'bg-[#2765A1]',
  },
  participating: {
    label: 'Participating',
    bg: 'bg-[#995900]',
  },
  dropped: {
    label: 'Dropped Out',
    bg: 'bg-[#E33629]',
  },
};

const Activity = () => {
  return (
    <div className="w-full md:w-1/2 bg-[#111827] rounded-xl p-6 text-white shadow-md">
      <h4 className="text-[18px] popreg font-semibold mb-4 border-b border-gray-700 pb-2">
        Real Time Activity
      </h4>

<div className='h-80 overflow-y-auto'>
          {activities.map((activity) => {
        const status = statusStyles[activity.status];

        return (
          <div
            key={activity.id}
            className="flex justify-between items-center bg-[#1f2937] p-4 rounded-lg shadow-sm hover:shadow-md transition mb-9"
          >
            <div className="space-y-2">
              <h3 className="text-[18px] popmed">{activity.title}</h3>
              <p className="text-[17px] popreg text-[#97BECA]">{activity.location}</p>
              <div className="flex items-center gap-1 text-xs text-gray-300 mt-1">
                <CiLocationOn  size={16} />
                <span className="text-[12px] popreg">{activity.city}</span>
              </div>
            </div>

            <div className="text-right flex flex-col items-center justify-center">
              <Button
                size="small"
                className={`mb-2 h-[32px] px-11 text-white rounded-[32px] ${status.bg} popbold border-none hover:!bg-[${status.bg}] hover:!text-white hover:!border-none`}
              >
                {status.label}
              </Button>
              <p className="text-[13px] text-gray-400">{activity.time}</p>
            </div>
          </div>
        );
      })}
</div>
    </div>
  );
};

export default Activity;
