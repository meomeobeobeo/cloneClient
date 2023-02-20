import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  AiFillCheckSquare,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { MdError } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import Avatar from "../Avata/Avatar";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import DetailIssues from "../../pages/DetailIssue/DetailIssues";
import { useSelector } from "react-redux";

const Issue = ({ snapshot, item }) => {
  

  const [issue_type_status, set_issue_type_status] = useState({
    task: false,
    bug: false,
    story: false,
  });
  const [priority_status, set_priority_status] = useState({
    medium: false,
    high: false,
    highest: false,
    low: false,
    lowest: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // check issue
    if (item.type === "task") {
      set_issue_type_status({ ...issue_type_status, task: true });
    } else if (item.type === "bug") {
      set_issue_type_status({ ...issue_type_status, bug: true });
    } else {
      set_issue_type_status({ ...issue_type_status, story: true });
    }
    // check priority
    if (item.priority === "3") {
      set_priority_status({ ...priority_status, medium: true });
    } else if (item.priority === "4") {
      set_priority_status({ ...priority_status, high: true });
    } else if (item.priority === "5") {
      set_priority_status({ ...priority_status, highest: true });
    } else if (item.priority === "2") {
      set_priority_status({ ...priority_status, low: true });
    } else {
      set_priority_status({ ...priority_status, lowest: true });
    }
  }, [item]);

  return (
    <>
      <div
        className={clsx(
          "bg-[#fff] flex flex-col touch-manipulation p-2 rounded-[4px] shadow-sm hover:bg-gray-300 my-1 mx-1 transition duration-100 ease-in delay-[0ms] select-none  ",
          { "rotate-[4deg] scale-[1.1] ": snapshot.isDragging }
        )}
        onClick={() => {
          navigate(`?issueId=${item.id}`, { replace: true });
          // action to go Detail issues
    
        }}
      >
        <span className="text-sm text-gray-800 font-[500] text-[15px] w-full normal-case leading-[1.4285rem] ">
          {item.title}
        </span>
        <div className="flex flex-row justify-between mt-3 items-center">
          {/* type and priority */}
          <div className="flex flex-row gap-1 ">
            {/* issue type */}
            {issue_type_status.task && (
              <AiFillCheckSquare className="text-blue-500" size={"16px"} />
            )}
            {issue_type_status.bug && (
              <MdError className="text-red-500" size={"16px"} />
            )}
            {issue_type_status.story && (
              <BsFillBookmarkFill className="text-green-500" size={"16px"} />
            )}

            {/* priority */}
            {priority_status.highest && (
              <AiOutlineArrowUp className="text-red-600" size={"16px"} />
            )}
            {priority_status.high && (
              <AiOutlineArrowUp className="text-red-400" size={"16px"} />
            )}
            {priority_status.medium && (
              <AiOutlineArrowUp className="text-orange-500" size={"16px"} />
            )}
            {priority_status.low && (
              <AiOutlineArrowDown className="text-green-400" size={"16px"} />
            )}
            {priority_status.lowest && (
              <AiOutlineArrowDown className="text-green-600" size={"16px"} />
            )}
          </div>
          {/* list avatar */}
          <div>
            <Avatar size={"20px"} />
          </div>
        </div>
      </div>
    </>
  );
};

Issue.propTypes = {
  issue_type: PropTypes.string,
  short_summary: PropTypes.string,
  description: PropTypes.string,
  reporter: PropTypes.string,
  assigness: PropTypes.string,
  priority: PropTypes.string,
};

export default Issue;
