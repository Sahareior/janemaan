import { Button, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-1/3 rounded-[25px] h-auto md:h-[708px] p-6 flex flex-col gap-7 bg-[#111827] shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            className="w-[206px] h-[122px] object-contain"
            src="/images/auth/logo.png"
            alt="App Logo"
          />
        </div>

        {showForgotPassword ? (
          /* Forgot Password Section */
          <>
            <h4 className="text-[28px] text-white font-semibold text-center">
              Reset Password
            </h4>

            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-[#9E9E9E]">Your Email</h4>
                <Input
                  className="w-full mt-2 h-[48px] rounded-md"
                  placeholder="Enter your registered email"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 h-[48px] rounded-md text-black text-lg font-medium border border-gray-500"
              >
                Back
              </Button>
              <Button
                type="primary"
                className="flex-1 h-[48px] bg-[#123d74] rounded-md text-white text-lg font-medium"
              >
                Send Reset Link
              </Button>
            </div>
          </>
        ) : (
          /* Login Section */
          <>
            <h4 className="text-[28px] text-white font-semibold text-center">
              Login
            </h4>

            {/* Input Fields */}
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-[#9E9E9E]">Your Email</h4>
                <Input
                  className="w-full mt-2 h-[48px] rounded-md"
                  placeholder="Enter your email or username"
                />
              </div>
              <div>
                <h4 className="text-[#9E9E9E]">Your Password</h4>
                <Input.Password
                  className="w-full mt-2 h-[48px] rounded-md"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Forget Password */}
            <div className="text-right">
              <span
                onClick={() => setShowForgotPassword(true)}
                className="text-[#9E9E9E] -mt-2 text-[16px] hover:underline cursor-pointer"
              >
                Forgot password?
              </span>
            </div>

            {/* Login Button */}
            <Link to="/overview">
              <Button
                type="primary"
                className="w-full h-[48px] bg-[#123d74] rounded-md text-white text-lg font-medium"
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;