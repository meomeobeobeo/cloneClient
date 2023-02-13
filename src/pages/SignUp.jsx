import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSlice } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../action/authAction";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispath = useDispatch();
  const navigate = useNavigate();

  // action sign up
  const handleSignUp = (data) => {
    dispath(signUp(data));
    navigate("/signIn", { replace: true });
  };

  return (
    <div className="flex flex-col w-[70%] h-[100vh] mx-auto bg-slate-50  ">
      {/* form */}
      <div className="flex flex-col m-auto pb-[160px]">
        <div className="flex flex-col mx-auto mb-[42px]   ">
          <h1 className="text-[40px] ">Sign up</h1>
          <div className="text-sm text-gray-400">hello please sign up.</div>
        </div>

        <div className="mb-2">
          <div className="mb-2 ">Email</div>

          <input
            value={email}
            className="w-[240px] outline-slate-400 h-8 border-slate-300 pl-2 "
            placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        {/* password */}
        <div>
          <div className=" mb-2">Name</div>
          <input
            value={name}
            className="w-[240px] outline-slate-400 h-8 border-slate-300 pl-2"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="text-slate-400 text-sm mt-1 mb-4">
          if you have an account .{" "}
          <Link to="/signIn">
            <span className="text-sm text-red-500 ">Sign in</span>
          </Link>
        </div>
        <div>
          <div
            onClick={() => {
              handleSignUp({ email: email, name: name });
            }}
            className="bg-blue-500 text-[#fff] text-[24px]  rounded-md hover:opacity-[0.5] m-auto w-[240px] flex justify-center items-center p-1 "
          >
            <span>Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
