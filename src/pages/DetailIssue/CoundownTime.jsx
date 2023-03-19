import moment, { duration } from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as api from "../../../api/index";
const CoundownTime = ({ isExpire, expireTime }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const issueId = searchParams.get("issueId");
  if (isExpire) {
    return (
      <div className="h-5 ">
        <div className="">
          <div className="flex text-gray-300 flex-row justify-center items-center h-12 text-base p-2 bg-black rounded-md">
            <span className="w-[100px]">Day : {"00"}</span>
            <span className="w-[100px]">Hour : {"00"}</span>
            <span className="w-[100px]">Minute : {"00"}</span>
            <span className="w-[100px]">Second : {"00"}</span>
          </div>
          <span className="text-red-500 text-lg">This issue  beyond time .</span>
          
        </div>
      </div>
    );
  }
  const timeUp = moment(expireTime);

  const [day, setDay] = useState("01");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  useEffect(() => {
    let interval;

    const startTimer = () => {
      interval = setInterval(() => {
        const timeDown = moment();
        const durationTime = moment.duration(
          moment(timeUp).diff(moment(timeDown))
        );
       

        const day = Math.floor(durationTime.abs()._data.days);
        const hour = Math.floor(durationTime.abs()._data.hours);
        const minute = Math.floor(durationTime.abs()._data.minutes);
        const second = Math.floor(durationTime.abs()._data.seconds);
        
        

        if (moment(timeUp).diff(moment(timeDown)) > 0) {
          setDay(day);
          setHour(hour);
          setMinute(minute);
          setSecond(second);
        } else {
          setDay(0);
          setHour(0);
          setMinute(0);
          setSecond(0);
          clearInterval(interval);
          updateStatusIsExpired();
        }
        if (!issueId) {
          clearInterval(interval);
        }
      }, 1000);
    };
    startTimer();
    return () => {
      clearInterval(interval);
    };
  }, []);

  //   fuction
  const updateStatusIsExpired = async () => {
    await api.updateIssue({ id: issueId, formData: { isExpire: true } });
  };

  return (
    <div className="h-5">
      <div className="">
        <div className="flex text-gray-300 flex-row justify-center items-center h-12 text-base p-2 bg-black rounded-md">
          <span className="w-[100px]">Day : {day}</span>
          <span className="w-[100px]">Hour : {hour}</span>
          <span className="w-[100px]">Minute : {minute}</span>
          <span className="w-[100px]">Second : {second}</span>
        </div>
      </div>
    </div>
  );
};

export default CoundownTime;
