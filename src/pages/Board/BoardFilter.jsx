import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BsSearch } from "react-icons/bs";
import Avatar from "../../components/Avata/Avatar";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { filterIssuesFromKaban } from "../../../api";
import { useParams } from "react-router-dom";
import {projectSlice} from "../../redux/projectSlice"

const BoardFilter = () => {
  //{searchText , userIds , limit , isCurrent
  const dispatch = useDispatch()
  const [isActiveOnlyMyIssuesBtn, setIsActiveOnlyMyIssuesBtn] = useState(false);
  const [isActiveRecentlyUpdated, setIsActiveRecentlyUpdated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [limit, setLimit] = useState("100");
  const [isCurrent, setIsCurrent] = useState("false");
  const [result , setResult] = useState([])
  const {projectId} = useParams()
  console.log(result)
  const formFilter = {
    searchText: searchText,
    userIds: userIds,
    limit: limit,
    isCurrent: isCurrent,
    projectId : projectId
  };
  
  const listUserInProject = useSelector(
    (state) => state.project.projectInfor?.users
  );
  const filterIssuesWithSearchText = async (e) => {
    setSearchText( e.target.value)
    const res = (await filterIssuesFromKaban({...formFilter , searchText : e.target.value  })).data
    setResult(res)
    dispatch(projectSlice.actions.upDateIssues(res))
    
    
  };
  const filterIssuesWithCurrentTime = async ()=>{
    setIsCurrent("true")
    const res = (await filterIssuesFromKaban({...formFilter , isCurrent : 'true'  })).data
    setResult(res)
    dispatch(projectSlice.actions.upDateIssues(res))
    
  }
  const reloadIssues = async ()=>{
    setIsCurrent('false')
    setSearchText("")
    const res = (await filterIssuesFromKaban({...formFilter , isCurrent : 'false',searchText :''  })).data
    setResult(res)
    dispatch(projectSlice.actions.upDateIssues(res))

  }
  useEffect(()=>{
    if(isActiveRecentlyUpdated){
      filterIssuesWithCurrentTime()
    }
    else{
      setIsCurrent('false')
    }
  },[isActiveRecentlyUpdated])


  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <BsSearch size={"14px"} className={styles.icon} />
        <input
          value={searchText}
          onChange={(e) => {
            filterIssuesWithSearchText(e)
            
          }}
          className={styles.input}
        ></input>
      </div>
      {/* user filter */}
      <div className={styles.members}>
        {/* this is list avartar of user  */}
        {listUserInProject &&
          listUserInProject.map((user) => (
            <Avatar key={user?.id} imageUrl={user?.avatarUrl} />
          ))}
        {/* phan loai */}
        <div
          className={
            isActiveOnlyMyIssuesBtn
              ? clsx(styles.btn, styles.btnActive)
              : styles.btn
          }
          onClick={() => {
            setIsActiveOnlyMyIssuesBtn(!isActiveOnlyMyIssuesBtn);
            
          }}
        >
          <span>Only my Issues</span>
        </div>
        <div
          className={
            isActiveRecentlyUpdated
              ? clsx(styles.btn, styles.btnActive)
              : styles.btn
          }
          onClick={() => {
            setIsActiveRecentlyUpdated(!isActiveRecentlyUpdated);
           
            
          }}
        >
          <span>Recently Updated</span>
        </div>
        {/* clear all button */}
        {(isActiveOnlyMyIssuesBtn || isActiveRecentlyUpdated) && (
          <div>
            <div
              className={styles.clearAllBtn}
              onClick={() => {
                setIsActiveOnlyMyIssuesBtn(false);
                setIsActiveRecentlyUpdated(false);
                reloadIssues()
              }}
            >
              <span>Clear All</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(BoardFilter);
