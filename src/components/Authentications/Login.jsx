import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../redux/slices/apiSlice";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Please enter both email and password");
      return;
    }

    try {
      const res = await signIn({ email, password }).unwrap();
      message.success("Login successful!");
      // Store token if needed
      if(res){
      localStorage.setItem("token", res?.access_token);
      navigate('/dashboard')
      }
      console.log(res)
      
    } catch (err) {
      message.error(err?.data?.message || "Login failed. Please try again.");
    }
  };

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
          <>
            <h4 className="text-[28px] text-white font-semibold text-center">
              Login
            </h4>

            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-[#9E9E9E]">Your Email</h4>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 h-[48px] rounded-md"
                  placeholder="Enter your email or username"
                />
              </div>
              <div>
                <h4 className="text-[#9E9E9E]">Your Password</h4>
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 h-[48px] rounded-md"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="text-right">
              <span
                onClick={() => setShowForgotPassword(true)}
                className="text-[#9E9E9E] -mt-2 text-[16px] hover:underline cursor-pointer"
              >
                Forgot password?
              </span>
            </div>

            <Button
              type="primary"
              loading={isLoading}
              onClick={handleLogin}
              className="w-full h-[48px] bg-[#123d74] rounded-md text-white text-lg font-medium"
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
