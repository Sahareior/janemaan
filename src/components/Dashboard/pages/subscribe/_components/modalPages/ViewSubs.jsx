import React from 'react';

const ViewSubs = ({ data }) => {
  if (!data) return null;

  const formattedPrice = (data.price / 100).toFixed(2); // Convert cents → dollars
  const formattedInterval =
    data.interval?.charAt(0).toUpperCase() + data.interval?.slice(1);

  return (
    <div className="bg-[#101522] text-white p-8 rounded-lg w-full mx-auto shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">View Plan</h2>
      </div>

      <p className="text-sm text-gray-400 mb-6">
        View the details of your subscription plan
      </p>

      <h3 className="text-lg font-bold mb-4">Plan Name: {data.name}</h3>

      <p className="text-gray-300 mb-6">
        <span className="font-semibold">Description: </span> {data.description}
      </p>

      <ul className="space-y-2">
        <li>
          <span className="font-semibold">Price: </span> ${formattedPrice}
        </li>
        <li>
          <span className="font-semibold">Currency: </span>{" "}
          {data.currency?.toUpperCase()}
        </li>
        <li>
          <span className="font-semibold">Interval: </span> {formattedInterval}
        </li>
        <li>
          <span className="font-semibold">Discount: </span>{" "}
          {data.discount_percent}%
        </li>
      </ul>
    </div>
  );
};

export default ViewSubs;
