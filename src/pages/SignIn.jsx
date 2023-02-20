import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "../action/authAction";
import { GlobalContex } from "../App";
import ModalCreateIssue from "../components/ModalCreateIssue/ModalCreateIssue";

const SignIn = () => {
  console.log('sign in')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const setUser = useContext(GlobalContex).setUser
  const navigate = useNavigate();
  
 
  // notify
  

  const handleSignIn = (data) => {
    dispatch(signIn({data , navigate}));
   
  };
  return (
    <div className="flex flex-col w-[70%] h-[100vh] mx-auto bg-slate-50  ">

      {/* form */}
      <div className="flex flex-col m-auto pb-[160px]">
        <ModalCreateIssue/>
        <div className="flex flex-col mx-auto mb-[42px]   ">
          <h1 className="text-[40px] ">Sign in</h1>
          <div className="text-sm text-gray-400">hello please sign in.</div>
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
          <div className=" mb-2">Password</div>
          <input
            value={password}
            className="w-[240px] outline-slate-400 h-8 border-slate-300 pl-2"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="text-slate-400 text-sm mt-1 mb-4">
          if you don't have an account .{" "}
          <Link to="/signUp">
            <span className="text-sm text-red-500 ">Sign up</span>
          </Link>
        </div>
        <div>
          <div
            onClick={() => {
              handleSignIn({ email: email, password: password });
            }}
            className="bg-blue-500 text-[#fff] text-[24px]  rounded-md hover:opacity-[0.5] m-auto w-[240px] flex justify-center items-center p-1 "
          >
            <span>Sign In</span>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default SignIn;
