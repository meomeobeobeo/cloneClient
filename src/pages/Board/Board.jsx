import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailProject } from "../../action/projectAction";
import NotFont from "../NotFond/NotFont";
import BoardContent from "./BoardContent";
import BoardFilter from "./BoardFilter";
import BoardHeader from "./BoardHeader";
import styles from "./styles.module.scss";

const Board = () => {
  
  const {projectId} = useParams()
  if(!projectId){
    return <NotFont/>
  }
  useEffect(() =>{
    dispatch(getDetailProject(projectId));
  },[])

  const dispatch = useDispatch();
  

  return (
    <div className={styles.body}>
      <BoardHeader />
      <BoardFilter />
      <BoardContent />
    </div>
  );
};

export default React.memo(Board)
