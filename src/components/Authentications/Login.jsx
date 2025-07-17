import { Button, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-1/3 rounded-[25px]  h-auto md:h-[708px] p-6 flex flex-col gap-7 bg-[#111827]  shadow-lg mx-auto mt-10">
      {/* Logo */}
      <div className="flex justify-center">
        <img
          className="w-[206px] h-[122px] object-contain"
          src="/images/auth/logo.png"
          alt="App Logo"
        />
      </div>

      {/* Heading */}
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
          <Input
            className="w-full mt-2 h-[48px] rounded-md"
            placeholder="Enter your email or username"
          />
        </div>
      </div>

      {/* Forget Password */}
      <div className="text-right">
        <a
          href="#"
          className="text-[#9E9E9E]  -mt-2 text-[16px] hover:underline"
        >
          Forgot password?
        </a>
      </div>

      {/* Login Button */}
<Link to='/overview'>
      <Button
        type="primary"
        className="w-full h-[48px] bg-[#123d74] rounded-md text-white text-lg font-medium"
      >
        Login
      </Button>
</Link>
    </div>
  );
};

export default Login;
