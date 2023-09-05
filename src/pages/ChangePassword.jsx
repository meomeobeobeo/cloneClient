import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSlice } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../action/authAction";
import { toast } from "react-toastify";
import * as api from '../../api/index'
const  ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword , setNewPassword] = useState('')
  console.log(newPassword)
  
  const navigate = useNavigate();

  // action sign up
  const handleChangePassWord = async (data) => {
    
    const response = await api.changePassword({email : email , password : password , newPassword : newPassword})
    if(response.data?.errorCode === 0){
        toast.success("change password sucess")
    }else{
        toast.error(response.data?.message)
    }
    
    // navigate("/signIn", { replace: true });
  };

  return (
    <div className="flex flex-col w-[70%] h-[100vh] mx-auto bg-slate-50  ">
      {/* form */}
      <div className="flex flex-col m-auto pb-[160px]">
        <div className="flex flex-col mx-auto mb-[42px]   ">
          <h1 className="text-[40px] ">Change password</h1>
          <div className="text-sm text-gray-400">hello you need change password</div>
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

        <div>
          <div className=" mb-2">New Password</div>
          <input
            value={newPassword}
            className="w-[240px] outline-slate-400 h-8 border-slate-300 pl-2"
            placeholder="Enter your new password"
            type="text"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          ></input>
        </div>

        
        <div>
          <div
            onClick={() => {
              handleChangePassWord({ email: email, password: password , newPassword : newPassword });
            }}
            className="bg-blue-500 text-[#fff] text-[24px]  rounded-md hover:opacity-[0.5] m-auto w-[240px] flex justify-center items-center p-1 mt-4 "
          >
            <span>Change password</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
