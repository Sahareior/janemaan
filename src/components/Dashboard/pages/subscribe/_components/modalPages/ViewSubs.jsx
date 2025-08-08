import React from 'react';

const ViewSubs = () => {
    return (
        <div>
             <div className="bg-[#101522] text-white p-8 rounded-lg w-full max-w-md mx-auto shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">View Plan</h2>
        <button className="text-gray-400 hover:text-gray-200 text-xl">&times;</button>
      </div>
      <p className="text-sm text-gray-400 mb-6">View plan that have created</p>

      <h3 className="text-lg font-bold mb-4">Plan Name: Basic Monthly</h3>

      <p className="text-gray-300 mb-6">
        <span className="font-semibold">Description :</span> A subscription plan is a payment model in which individuals or companies pay recurring fees at set intervals in exchange for access to goods or services. This model is commonly used for streaming services, digital storage, meal delivery kits, and personal care products.
      </p>

      <ul className="space-y-2">
        <li>
          <span className="font-semibold">Prize:</span> $ 29.99
        </li>
        <li>
          <span className="font-semibold">Currency:</span> USD
        </li>
        <li>
          <span className="font-semibold">Interval:</span> Monthly
        </li>
        <li>
          <span className="font-semibold">Discount:</span> 17%
        </li>
      </ul>
    </div>
        </div>
    );
};

export default ViewSubs;