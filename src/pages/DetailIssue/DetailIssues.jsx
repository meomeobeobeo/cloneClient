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
import { useSelector } from "react-redux";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import TextEditor from "../../components/TextEditer/TextEditer";
import CustomSelectOne from "../../components/Select/CustomSelectOne";
import CustomSelectMuiltil from "../../components/Select/CustomSelectMuiltil";

const DetailIssues = ({}) => {
  const [issueData, setIssueData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // get issueId from query
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const issueId = searchParams.get("issueId");
  console.log(issueId);
  const projectId = useSelector((state) => state.project.projectInfor?.id);
  const navigate = useNavigate();
  console.log(isLoading);

  // set up component

  const handleSetTitle = (e) => {
    setIssueData({
      ...issueData,
      title: e.target.value,
    });
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // load data effect
  useEffect(() => {
    const reqTogetData = api.getDetailIssue(issueId);
    reqTogetData.then((data) => {
      setIsLoading(!isLoading);
      setIssueData(data.data);
    });
  }, []);

  console.log(issueData);

  const navigateKaban = () => {
    setIsLoading(!isLoading);
    navigate(`/project/board/${projectId}`, { replace: true });
  };

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
          <div className={styles.modalContainer}>
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
                      value={issueData?.title}
                      onChange={(e) => {
                        handleSetTitle(e);
                      }}
                      className="w-full h-[auto] rounded-lg mt-4 p-3 leading-[1.28rem] text-[24px] outline-none focus:border-solid focus:border-2 focus:border-blue-400 overflow-hidden "
                    />
                  </div>
                  {/* description */}
                  <div className="h-[400px] flex flex-col">
                    <TextEditor
                      content={issueData?.description}
                      setContent={() => {}}
                      height={"300px"}
                    />
                  </div>
                  {/* save description */}
                  <div className="flex gap-2 ">
                    <div className="bg-blue-500 text-white py-1 px-2 cursor-pointer hover:opacity-[0.8] w-[100px] rounded-md flex shadow ">
                      <span className="m-auto">Save</span>
                    </div>
                    <div className=" text-gray-700 py-1 px-2 cursor-pointer hover:bg-slate-400 w-[100px] rounded-md flex shadow ">
                      <span className="m-auto">Cancel</span>
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
                      <FiSend size={"20px"} />
                      <span>Give feedback</span>
                    </div>
                    <div className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
                      <BiLink size={"20px"} />
                      <span>Copy Link</span>
                    </div>
                    <div className="bg-white hover:bg-gray-300 p-1 rounded-[4px] h-[32px] flex flex-row justify-center items-center cursor-pointer ">
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
                  <div className="w-[50%]">
                    <span className="font-semibold mb-1">Status</span>
                    <CustomSelectOne />
                  </div>
                  {/* assignees */}
                  <div className="w-[50%]">
                    <span className="font-semibold mb-1">Assignees</span>
                    <CustomSelectMuiltil />
                  </div>
                  {/* reporter */}
                  <div className="w-[50%]">
                    <span className="font-semibold mb-1">Priority</span>
                    <CustomSelectOne />
                  </div>
                  {/* original estimate : as expire time / hour*/}
                  <div className="w-[80%]">
                    <span className="font-semibold mb-1 ">
                      Original estimate
                    </span>
                    <input className="w-full h-[32px] mt-1 outline-none border-solid border-[1px] border-gray-400 bg-slate-300 rounded-md focus:border-2 focus:border-blue-500 " />
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
                navigateKaban();
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
