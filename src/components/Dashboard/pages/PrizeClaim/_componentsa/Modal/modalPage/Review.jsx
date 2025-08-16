import React from 'react';
import Swal from 'sweetalert2';

const Review = ({ selectedClaim }) => {



  if (!selectedClaim) {
    return <div className="text-white">No claim selected.</div>;
  }

  return (
    <div>
      <div className="space-y-8 mt-5 text-sm sm:text-base md:text-[17px] px-2 pb-10 sm:px-4">
        {/* User Details */}
        <div className="space-y-3 popmed">
          <h3 className="text-white">
            User Name: <span className="text-[#97BECA]">{selectedClaim?.user?.name}</span>
          </h3>
          <h3 className="text-white">
            Email: <span className="text-[#97BECA]">{selectedClaim?.user?.email}</span>
          </h3>
          <h3 className="text-white">
            Plan: <span className="text-[#97BECA]">{selectedClaim?.user?.plan?.name}</span>
          </h3>
          <h3 className="text-white">
            Current Status:{" "}
            <span className="text-yellow-400 font-semibold capitalize">
              {selectedClaim?.status}
            </span>
          </h3>
        </div>

        <h3 className="text-white">
          Voucher ID: <span className="text-[#97BECA]">{selectedClaim?.voucher}</span>
        </h3>

        {/* Verification Picture */}
        <div className="space-y-4">
          <h3 className="text-white font-medium">Verification Picture</h3>

          <div className="w-2/3 h-[180px] rounded-lg bg-[#1F2937] overflow-hidden">
            <img
              src={selectedClaim?.claimed_photo}
              alt="Claim Verification"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Review;
