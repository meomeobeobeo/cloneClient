import clsx from "clsx";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { BsFillBookmarkFill, BsSearch } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { searchIssuesFromSummaryOrDescription } from "../../../api";
import styles from "./styles.module.scss";
const SearchIssue = () => {

  const { projectId } = useParams();
  console.log("project id : "+projectId);
  

  // return 404 not find when not have choose project id

  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  console.log(searchResult);

  useEffect(() => {
    const req = searchIssuesFromSummaryOrDescription(searchText, projectId);
    req.then((data) => {
      setSearchResult(data.data);
    });
  }, [searchText]);
  const handleNavigateProjectBoard = () => {
    navigate(`/project/board/${projectId}`,{replace :true});
  };

  return (
    <>
      {true && (
        <div className={styles.modal}>
          <div
            onClick={() => {
              handleNavigateProjectBoard();
            }}
            className={styles.modalBackground}
          ></div>
          <div className={styles.modalContainer}>
            <div
              className={styles.modalControl}
              onClick={() => {
                handleNavigateProjectBoard()
              }}
            >
              X
            </div>
            {/* search */}
            <div className="flex flex-row gap-4 w-full items-center">
              <div className="cursor-pointer hover:text-blue-500">
                <BsSearch size={24} />
              </div>
              <input
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                placeholder="Search issues by summary , description "
                className=" outline-none w-[80%] border-b-2 border-blue-700 inline-block h-10 leading-9 placeholder:text-xl tracking-wide text-base "
              />
            </div>
            {/* result of search  */}
            {projectId && (
              <div className="flex flex-col items-center mt-8 gap-2 w-full mb-8">
                {searchResult.length ===0 ? <div>Search result is empty.</div>:<div>Search result is under.</div>}
                {searchResult.map((issue, index) => {
                  return (
                    <div className="w-full" key={issue.id}>
                      <SummaryIssue issue={issue} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// componet summary issue
const SummaryIssue = ({ issue }) => {
  return (
    <div className="flex  items-center w-full py-1 px-[10px] rounded-[4px] cursor-pointer select-none hover:bg-gray-300 ">
      {/* checl type */}
      <div className="w-10">
        {issue.type === "task" && (
          <AiFillCheckSquare className="text-blue-500" size={"24px"} />
        )}
        {issue.type === "bug" && (
          <MdError className="text-red-500" size={"24px"} />
        )}
        {issue.type === "story" && (
          <BsFillBookmarkFill className="text-green-500" size={"24px"} />
        )}
      </div>

      {/* infor  */}
      <div className="text-gray-900 text-md flex flex-col  ">
        <div className="max-w-[480px]">{issue.title}</div>
        <div className="text-gray-500 text-md ">
          {issue.type} - {issue.id}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SearchIssue);
