import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import {
  AiFillCheckSquare,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createNewIssue } from "../../action/projectAction";
import { GlobalContex } from "../../App";
import Avatar from "../../components/Avata/Avatar";
import CustomSelectMuiltil from "../../components/Select/CustomSelectMuiltil";
import CustomSelectOne from "../../components/Select/CustomSelectOne";
import TextEditer from "../../components/TextEditer/TextEditer";
import NotFont from "../NotFond/NotFont";
import styles from "./styles.module.scss";





const CreateIssue = () => {
  const navigate = useNavigate();
  const typeIssueSelectOption = [
    { value: "task", label: "Task" },
    { value: "bug", label: "Bug" },
    { value: "story", label: "Story" },
  ];
  const prioritySelectOption = [
    { value: "1", label: "Lowest" },
    { value: "2", label: "Low" },
    { value: "3", label: "Medium" },
    { value: "4", label: "Hight" },
    { value: "5", label: "Highest" },
  ];
  const dispatch = useDispatch()
  const [title , setTitle] = useState("")
  const [typeChoose, setTypeChoose] = useState("");
  const [description, setDescription] = useState("");
  const [reporterId, setReporterId] = useState("");
  const [priority, setPriority] = useState("");
  const [assigneesId, setAssigneesId] = useState([]);
  const listUserInfor = useSelector(
    (state) => state.project.projectInfor?.users
  );
  if(!listUserInfor){
    return <NotFont/>
  }

  const userSelecOptionForSelectOne = listUserInfor.map((user, index) => {
    return {
      value: user.id,
      label: (
        <div className="flex items-center gap-2 ">
          <Avatar size="20px" imageUrl={user.avatarUrl} />
          <spam className="">{user.name}</spam>
        </div>
      ),
    };
  });

  const userSelecOptionForMultiSelect = listUserInfor.map((user, index) => {
    return {
      value: user.id,
      label: (
        <div className="flex items-center gap-2 h-[36px] p-2 bg-gray-200 rounded-sm  ">
          <Avatar size="20px" imageUrl={user.avatarUrl} />
          <spam className="">{user.name}</spam>
        </div>
      ),
    };
  });

  const getOptionLabelTypeIssue = (option) => (
    <div className="flex items-center gap-2 ">
      {option.value === "task" && (
        <AiFillCheckSquare className="text-blue-500 " size={"20px"} />
      )}
      {option.value === "bug" && (
        <MdError className="text-red-500 " size={"20px"} />
      )}
      {option.value === "story" && (
        <BsFillBookmarkFill className="text-green-500 " size={"20px"} />
      )}
      <span>{option.label}</span>
    </div>
  );


const {projectId} = useParams()
if(!projectId) {
  return <NotFont/>
}


const currenUserId = useContext(GlobalContex)?.user?.user?.id


const formData = {
  title : title,
  type : typeChoose?.value,
  priority : priority?.value,
  userCreateId : currenUserId,
  description : description,
  reporterId : reporterId.value,
  assigneesId : assigneesId.map(data => data.value)

  
}


  // function
   

  function handleGoKaban() {
    navigate(`/project/board/${projectId}`,{replace :true});
  }

  const handleCreateIssues = async ()=>{
    
    dispatch(createNewIssue({projectId  , formData }))
    navigate(`/project/board/${projectId}`,{replace :true});
    
  }


  return (
    <div className={styles.modal}>
      <div onClick={handleGoKaban} className={styles.modalBackground}></div>
      <div className={clsx(styles.modalContainer, "flex-col")}>
        <h1 className="mb-[16px]">Create issue</h1>
        {/* issue type */}
        <div className="flex flex-col gap-1 my-4">
          <div className="text-gray-500 text-[13px] font-semibold">
            Issue Type
          </div>
          <CustomSelectOne
            options={typeIssueSelectOption}
            value={typeChoose}
            setValue={setTypeChoose}
            getOptionLabel={getOptionLabelTypeIssue}
          />
          <span className="text-gray-500 text-[13px]">
            Start typing to get a list of possible matches.
          </span>
        </div>
        <div className="w-full bg-gray-400 h-[2px] my-[24px]"></div>
        {/* short summary */}
        <div className="flex flex-col gap-1 my-4">
          <div className="text-gray-500 text-[13px] font-semibold">
            Short summary
          </div>
          <div className="h-[32px] w-full ">
            <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className="w-full h-[100%] px-[8px] text-[#172b4d] text-[15px] bg-[#f4f5f7] border-[1px] border-solid border-[#f4f5f7] focus-within:outline-blue-400" />
          </div>

          <span className="text-gray-500 text-[13px]">
            Concisely summarize the issue in one or two sentences.
          </span>
        </div>
        {/* Description  */}
        <div className="flex flex-col gap-1 my-4">
          <div className="text-gray-500 text-[13px] font-semibold">
            Description
          </div>
          <div className="w-full h-[164px]">
            <TextEditer
              content={description}
              setContent={setDescription}
              height={"120px"}
            />
          </div>

          <span className="text-gray-500 text-[13px]">
            Describe the issue in as much detail as you'd like.
          </span>
        </div>

        {/* choose reporterId */}
        <div className="flex flex-col gap-1 my-4">
          <div className="text-gray-500 text-[13px] font-semibold">
            ReporterId
          </div>
          <CustomSelectOne
            options={userSelecOptionForSelectOne}
            value={reporterId}
            setValue={setReporterId}
          />
        </div>

        {/* choose assigneesId */}
        <div className="flex flex-col gap-1 my-4">
          <div className="text-gray-500 text-[13px] font-semibold">
            assigneesId
          </div>
          <CustomSelectMuiltil
            options={userSelecOptionForMultiSelect}
            values={assigneesId}
            setValues={setAssigneesId}
          />
        </div>
        {/* choose the priority */}
        <div className="flex flex-col gap-1 my-4  mb-[100px]">
          <div className="text-gray-500 text-[13px] font-semibold">
            Priority
          </div>
          <CustomSelectOne
            options={prioritySelectOption}
            value={priority}
            setValue={setPriority}
          />
        </div>
        {/* submit and cancel button */}
        <div className="flex gap-2 mb-5 ">
          <div className="w-[80%]"></div>
          {/* button create issues */}
          <div onClick={()=>{handleCreateIssues()}} className="bg-blue-700 text-white text-sm font-normal py-2 px-2 hover:opacity-70 cursor-pointer rounded-[4px] ">Create Issue</div>
          {/* button cancel : go kaban */}
          <div onClick={()=>{handleGoKaban()}} className="bg-gray-300 text-gray-800 text-sm font-normal py-2 px-2 hover:opacity-70 cursor-pointer rounded-[4px] ">Calcel</div>

        </div>
      </div>
    </div>
  );
};

export default CreateIssue;
