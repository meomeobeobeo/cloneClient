import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import moment from "moment";
import styles from "./styles.module.scss";
import { FiSend } from "react-icons/fi";
import { BiLink } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { AiFillCheckSquare, AiOutlineClose } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import * as api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TextEditor from "../../components/TextEditer/TextEditer";
import CustomSelectOne from "../../components/Select/CustomSelectOne";
import CustomSelectMuiltil from "../../components/Select/CustomSelectMuiltil";
import CoundownTime from "./CoundownTime.jsx";
import clsx from "clsx";
import Avatar from "../../components/Avata/Avatar";
import { deleteIssues } from "../../action/projectAction";

const ListInfor = ({ listUserIds }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const req = api.getUserInforFromListUserId(listUserIds);
    req.then((data) => {
      setUsers(data.data);
    });
  }, []);
  return (
    <>
      {users.map((user) => {
        return (
          <div key={user?.id} className="flex items-center gap-2 ">
            <Avatar size="20px" imageUrl={user?.avatarUrl} />
            <span className="">{user?.name}</span>
          </div>
        );
      })}
    </>
  );
};

const DetailIssues = ({}) => {
  const [issueData, setIssueData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("auth"))?.user;
  // get issueId from query
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const issueId = searchParams.get("issueId");
  // infor
  const projectId = useSelector((state) => state.project.projectInfor?.id);
  // hook use
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneesId, setAssigneesId] = useState([]);
  const [reporterId, setReporterId] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [commentData, setCommentData] = useState([]);
  console.log(commentData);

  const [createCommentContent, setCreateCommentContent] = useState("");
  const commentForm = {
    issueId: issueId,
    content: createCommentContent,
    avatarUrl: userData?.avatarUrl,
    userId: userData?.id,
  };
  useEffect(() => {
    const res = api.getComment({ issueId: issueId });
    res.then((data) => {
      setCommentData(data.data);
    });
  }, []);

  const assigneesArr = assigneesId.map((data) => {
    return data?.value;
  });

  const notify = () => {
    toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  // data update
  const formData = {
    title: title,
    status: status?.value,
    priority: priority?.value,
    description: description,
    reporterId: reporterId?.value,
  };

  // load data effect
  useEffect(() => {
    const reqTogetData = api.getDetailIssue(issueId);
    reqTogetData.then((data) => {
      setIsLoading(!isLoading);
      setIssueData(data.data);

      //
      setTitle(data.data?.title);
      setDescription(data.data?.description);

      setAssigneesId(data.data?.assigneesId);
      setReporterId(data.data?.reporterId);
      setPriority(data.data?.priority);

      setStatus(data.data?.status);

      // setDefaultvalue({status :data.data?.status,assigneesId : data.data?.assigneesId , priority : data.data?.priority , reporterId : data.data?.reporterId   })
    });
  }, []);

  const originalEstimate = moment.duration(
    moment(issueData?.expireTime).diff(moment(issueData?.createdAt))
  );
  // set up data of select type
  const listUserInfor = useSelector(
    (state) => state.project.projectInfor?.users
  );
  if (!listUserInfor) {
    return <NotFont />;
  }

  // set up data component
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
  const prioritySelectOption = [
    { value: "1", label: "Lowest" },
    { value: "2", label: "Low" },
    { value: "3", label: "Medium" },
    { value: "4", label: "High" },
    { value: "5", label: "Highest" },
  ];
  const statusSelectOptions = [
    { value: "backlog", label: "Backlog" },
    { value: "selected", label: "Selected" },
    { value: "inprogress", label: "Inprogress" },
    { value: "done", label: "Done" },
  ];

  // function

  const navigateKaban = () => {
    setIsLoading(!isLoading);
    navigate(`/project/board/${projectId}`, { replace: true });
  };
  const handleUpdateIssue = async () => {
    try {
      await api.updateIssue({ id: issueId, formData: formData });
      notify();
      navigateKaban();
    } catch (error) {
      console.error(error);
    }
  };
  const updateAssignees = async () => {
    console.log(assigneesArr);
    try {
      await api.updateIssue({
        id: issueId,
        formData: { assigneesId: assigneesArr },
      });
      navigateKaban();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteIssue = async () => {
    try {
      dispatch(deleteIssues({ issueId: issueId, project_id: projectId }));
      navigateKaban();
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateComment = async () => {
    try {
      const newComment = (await api.createComment({ formData: commentForm })).data;
      setCommentData([newComment, ...commentData]);
      setCreateCommentContent("");
    } catch (error) {}
  };
  const handleDeleteComment = async (id)=>{
    try {
      const res = (await api.deleteComment({id:id})).data
      const commentDataAfter = commentData.filter((comment)=>{
        return comment.id !== res.id
      })
      setCommentData(commentDataAfter)

      
    } catch (error) {
      
    }
  }

  return (
    <>
      {true && (
        <div className={styles.modal}>
          <div
            onClick={() => {
              navigateKaban();
            }}
            className={styles.modalBackground}
          ></div>

          {/* container  */}
          <div
            className={clsx(styles.modalContainer, { "": issueData?.isExpire })}
          >
            {isLoading ? (
              <div className="flex flex-row  w-full h-[full] gap-6 ">
                {/* content and description */}
                <div className="flex flex-col p-1 w-[60%] h-full">
                  {/* issues type and id */}
                  <div className="bg-white max-w-[300px] hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
                    <div className="w-8">
                      {issueData?.type === "task" && (
                        <AiFillCheckSquare
                          className="text-blue-500"
                          size={"20px"}
                        />
                      )}
                      {issueData?.type === "bug" && (
                        <MdError className="text-red-500" size={"20px"} />
                      )}
                      {issueData?.type === "story" && (
                        <BsFillBookmarkFill
                          className="text-green-500"
                          size={"20px"}
                        />
                      )}
                    </div>
                    <span>
                      {issueData?.type} - {issueData?.id}
                    </span>
                  </div>
                  {/* title */}
                  <div className="h-[auto] w-full ">
                    <textarea
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="w-full h-[auto] rounded-lg mt-4 p-3 leading-[1.28rem] text-[24px] outline-none focus:border-solid focus:border-2 focus:border-blue-400 overflow-hidden "
                    />
                  </div>
                  {/* description */}
                  <div className="h-[400px] flex flex-col">
                    <TextEditor
                      content={description}
                      setContent={setDescription}
                      height={"300px"}
                    />
                  </div>
                  {/* save issues */}
                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        handleUpdateIssue();
                      }}
                      className="bg-blue-500 text-white py-1 px-2 cursor-pointer hover:opacity-[0.8] w-[100px] rounded-md flex shadow "
                    >
                      <span className="m-auto">Save</span>
                    </div>
                    <div className=" text-gray-700 py-1 px-2 cursor-pointer hover:bg-slate-400 w-[100px] rounded-md flex shadow ">
                      <span className="m-auto">Cancel</span>
                    </div>
                  </div>
                  {/* comment box */}
                  <div className="h-[500px] overflow-y-auto w-full flex flex-col bg-slate-100 mt-2 mb-[32px]">
                    <h2>Comments</h2>
                    {/* create comment form */}
                    <div className="flex flex-row w-[90%] gap-2 ml-2">
                      <div className="mt-4">
                        <Avatar imageUrl={userData?.avatarUrl} size={"32px"} />
                      </div>
                      <div className="w-full">
                        <textarea
                          value={createCommentContent}
                          onChange={(e) => {
                            setCreateCommentContent(e.target.value);
                          }}
                          className="w-full h-[auto] rounded-lg mt-4 p-3 leading-[1.28rem] text-[24px] outline-none focus:border-solid focus:border-2 focus:border-blue-400 overflow-hidden "
                        />
                        {/* button save and cancel */}
                        <div className="flex gap-2 mt-2">
                          <div
                            onClick={() => {
                              handleCreateComment();
                            }}
                            className="flex justify-center items-center px-4 py-2 cursor-pointer rounded-md bg-blue-500 text-white hover:opacity-[0.8]"
                          >
                            <span>Save</span>
                          </div>
                          <div className="flex justify-center items-center px-4 py-2 cursor-pointer rounded-md bg-slate-100 text-gray-600 hover:bg-slate-300">
                            <span>Cancel</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* comment content */}
                    <div className="flex flex-col gap-1">
                      {commentData.map((comment) => {
                        return (
                          <div
                            key={comment.id}
                            className="flex flex-row w-[90%] gap-3  ml-2 mt "
                          >
                            <div className="mt-4">
                              <Avatar
                                imageUrl={userData?.avatarUrl}
                                size={"32px"}
                              />
                            </div>
                            <div className="w-full">
                              {/* content */}
                              <div className="flex flex-col mt-4 content-center">
                                <div>{comment?.content}</div>
                                <div className="flex flex-row gap-2">
                                  <div
                                    onClick={() => {}}
                                    className="flex p-1 justify-center items-center cursor-pointer rounded-md bg-slate-100 text-gray-600 text-xs hover:bg-slate-300"
                                  >
                                    <span>Edit</span>
                                  </div>
                                  <div onClick={()=>{handleDeleteComment(comment.id)}} className="flex p-1 justify-center items-center cursor-pointer rounded-md bg-slate-100 text-gray-600 text-xs hover:bg-slate-300">
                                    <span>Delete</span>
                                  </div>
                                  
                                </div>
                              </div>
                              <div className="w-full h-[2px] bg-gray-400 mt-1"></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* status and user */}
                <div className="flex flex-col w-[40%] h-full gap-4">
                  {/* give feedback , copy link , recycle , close  */}
                  <div className="flex flex-row w-full text-slate-700 justify-around items-center p-1 ">
                    <div className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
                      <FiSend size={"20px"} />
                      <span>Give feedback</span>
                    </div>
                    <div className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
                      <BiLink size={"20px"} />
                      <span>Copy Link</span>
                    </div>
                    <div
                      onClick={() => {
                        handleDeleteIssue();
                      }}
                      className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer "
                    >
                      <HiOutlineTrash size={"20px"} />
                    </div>
                    <div
                      onClick={() => {
                        navigateKaban();
                      }}
                      className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer "
                    >
                      <AiOutlineClose size={"20px"} />
                    </div>
                  </div>

                  {/* status  */}
                  <div className="w-[80%]">
                    <span className="font-semibold mb-1">
                      Status
                      <span className="ml-2 text-blue-500">
                        {issueData?.status}
                      </span>
                    </span>
                    <div className="flex flex-col"></div>
                    <CustomSelectOne
                      options={statusSelectOptions}
                      value={status}
                      setValue={setStatus}
                      defaultValue={{ value: "selected", label: "Selected" }}
                    />
                  </div>
                  {/* assignees */}
                  <div className="w-[100%]">
                    <span className="font-semibold mb-1">Assignees</span>
                    <div className="w-full my-2">
                      <ListInfor listUserIds={assigneesId} />
                    </div>
                    <div className="w-[100%] flex flex-row justify-between items-center">
                      <div className="w-[80%]">
                        <CustomSelectMuiltil
                          options={userSelecOptionForMultiSelect}
                          values={assigneesId}
                          setValues={setAssigneesId}
                        />
                      </div>
                      <div
                        onClick={() => {
                          updateAssignees();
                        }}
                        className="p-1 bg-blue-500 text-white w-[15%] rounded-md flex justify-center items-center hover:opacity-[0.8] cursor-pointer "
                      >
                        <span className="">Save</span>
                      </div>
                    </div>
                  </div>
                  {/* reporter */}
                  <div className="w-[80%]">
                    <span className="font-semibold mb-1">Reporter</span>
                    <div className="w-full my-2">
                      <ListInfor listUserIds={[reporterId]} />
                    </div>
                    <CustomSelectOne
                      options={userSelecOptionForSelectOne}
                      value={reporterId}
                      setValue={setReporterId}
                    />
                  </div>
                  <div className="w-[80%]">
                    <span className="font-semibold mb-1">
                      Priority
                      <span className="ml-3 text-blue-500">
                        {issueData?.priority}
                      </span>
                    </span>
                    <CustomSelectOne
                      options={prioritySelectOption}
                      value={priority}
                      setValue={setPriority}
                    />
                  </div>
                  {/* original estimate : as expire time / hour*/}
                  <div className="w-[80%]">
                    <span className="font-semibold mb-1 ">
                      Original estimate
                    </span>
                    <input
                      disabled
                      value={`${Math.floor(originalEstimate.asHours())} hours`}
                      className="w-full h-[32px] mt-1 outline-none border-solid border-[1px] border-gray-400 bg-slate-300 rounded-md focus:border-2 focus:border-blue-500 "
                    />
                  </div>
                  <div className="h-[1px] w-full bg-slate-500"></div>
                  <div className="w-full h-20 ">
                    <CoundownTime
                      isExpire={issueData?.isExpire}
                      expireTime={issueData?.expireTime}
                    />
                  </div>
                  <div className="h-[1px] w-full bg-slate-500"></div>

                  {/* time created */}
                  <div className="flex flex-col ">
                    <span className="text-sm">
                      Created At {moment(issueData?.createdAt).fromNow()}
                    </span>
                    <span className="text-sm  ">
                      Updated At {moment(issueData?.updatedAt).fromNow()}
                    </span>
                  </div>
                </div>
                <ToastContainer />
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const Loading = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row  w-full h-[full] gap-6 ">
        {/* content and description */}
        <div className="flex flex-col p-1 w-[60%] h-full">
          {/* issues type and id */}
          <div className="bg-white max-w-[300px] hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
            <div className="w-8">
              <Skeleton count={3} />
            </div>
          </div>
          {/* title */}
          <div className="h-[auto] w-full ">
            <Skeleton count={5} />
          </div>
          {/* description */}
          <div className="h-[400px] flex flex-col">
            <Skeleton count={10} />
          </div>
          {/* save description */}
          <div className="flex gap-2 ">
            <div className="bg-blue-500 text-white py-1 px-2 cursor-pointer hover:opacity-[0.8] w-[100px] rounded-md flex shadow ">
              <Skeleton count={1} />
            </div>
            <div className=" text-gray-700 py-1 px-2 cursor-pointer hover:bg-slate-400 w-[100px] rounded-md flex shadow ">
              <Skeleton count={1} />
            </div>
          </div>
          {/* comment box */}
          <div className="h-[200px] w-full bg-slate-400 mt-2 mb-[32px]"></div>
        </div>

        {/* status and user */}
        <div className="flex flex-col w-[40%] h-full gap-4">
          {/* give feedback , copy link , recycle , close  */}
          <div className="flex flex-row w-full text-slate-700 justify-around items-center p-1 ">
            <div className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
              <Skeleton count={3} />
            </div>
            <div className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
              <Skeleton count={3} />
            </div>
            <div className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
              <Skeleton count={1} />
            </div>
            <div
              onClick={() => {
                navigate(`/project/board/${projectId}`, { replace: true });
              }}
              className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer "
            >
              <AiOutlineClose size={"20px"} />
            </div>
          </div>

          {/* status  */}
          <div className="w-[50%]">
            <Skeleton count={3} />
          </div>
          {/* assignees */}
          <div className="w-[50%]">
            <Skeleton count={3} />
          </div>
          {/* reporter */}
          <div className="w-[50%]">
            <Skeleton count={3} />
          </div>
          {/* original estimate : as expire time / hour*/}
          <div className="w-[80%]">
            <Skeleton count={3} />
          </div>
          <div className="h-[1px] w-full bg-slate-500"></div>
          {/* time created */}
          <div className="flex flex-col ">
            <Skeleton count={5} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailIssues;
