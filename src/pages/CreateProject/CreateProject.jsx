import React, { useState } from "react";
import ReactQuill from "react-quill";
import CustomSelectOne from "../../components/Select/CustomSelectOne";
import TextEditer from "../../components/TextEditer/TextEditer";
import { useDispatch, useSelector } from "react-redux";
import NotFont from "../NotFond/NotFont";
import {listProjectsSlice} from '../../redux/listProjectsSlice'
import * as api from'../../../api/index'

const CreateProject = () => {
  //  description content

  const userCreateId = JSON.parse(localStorage.getItem("auth"))?.user?.id;
  if (!userCreateId) {
    return <NotFont />;
  }

  const optionsForSelectProjectCategory = [
    { value: "software", label: "Software" },
    { value: "bussiness", label: "Bussiness" },
    { value: "marketing", label: "Marketing" },
  ];

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const dispatch = useDispatch();
  const formData = {
    name: name,
    url: url,
    description: description,
    category: projectCategory?.value,
    userCreateId :userCreateId
  };
  const handleCreateProject = async ()=>{
    try {
        const newProject = (await api.createNewProject({formData:formData})).data
        console.log(newProject)
        setName('')
        setUrl('')
        setDescription('')
        setProjectCategory('')
        dispatch(listProjectsSlice.actions.addProjectIdToListProject(newProject?.id))
        
    } catch (error) {
        
    }
  }

  return (
    <div className="flex flex-col w-[70%] h-[100vh] mx-auto">
      {/* header */}
      <div className="text-gray-500 text-[15px] font-normal text-sm mt-2 mb-4">
        Project / Create / Hello
      </div>
      <div className="font-bold text-xl mb-5 "> Project Details</div>
      {/* form detail */}
      <div className="w-full flex flex-col gap-3">
        <div className="">
          <div className="w-full text-gray-500 text-[15px]">Name</div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full rounded-[4px] h-[28px] text-gray-900 outline-none border-slate-300 border-2 bg-slate-200 focus:border-blue-500 mt-2 focus:bg-[#fff]  "
          ></input>
        </div>

        <div className="">
          <div className="w-full text-gray-500 text-[15px]">URL</div>
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className="w-full rounded-[4px] h-[28px] text-gray-900 outline-none border-slate-300 border-2 bg-slate-200 focus:border-blue-500 mt-2 focus:bg-[#fff]  "
          ></input>
        </div>

        <div className="">
          <div className="w-full text-gray-500 text-[15px]">Description</div>
        </div>
        <div className="w-full h-[150px]">
          <TextEditer
            height={"120px"}
            content={description}
            setContent={setDescription}
          />
        </div>
        <div className="text-xs text-gray-500">
          Describe the project in as much detail as you'd like.
        </div>
        {/* category */}
        <div className="w-full">
          <div className="w-full mb-2 text-gray-500 text-[13px]">
            Project Category
          </div>
          <CustomSelectOne
            value={projectCategory}
            setValue={setProjectCategory}
            options={optionsForSelectProjectCategory}
          />
        </div>
        {/* button save change */}
        <div
          onClick={() => {
            handleCreateProject()
          }}
          className="bg-blue-600 w-[120px] p-2 text-[15px] text-[#fff] rounded-md mt-3 cursor-pointer hover:bg-blue-400 "
        >
          <span className="m-auto">Create Project</span>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
