import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BiLogIn, BiLogOut, BiSearch } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { AiOutlineProject, AiOutlineQuestionCircle } from "react-icons/ai";
import clsx from "clsx";

import Avatar from "../Avata/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { GlobalContex } from "../../App";
import SearchIssue from "../../pages/SearchIssue/SearchIssue";


const NavBar = () => {
  // const notifyLogOut = () => {
  //   return toast.success("Log out !", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // };
  
  // mở rông navbar
  const [isExtent, setIsExtent] = useState(false);
  const user = useContext(GlobalContex)?.user
  const setUser = useContext(GlobalContex)?.setUser
  // modal search
  const [isOpen , setIsOpen] = useState(false)
  const projectId = useSelector(state => state.project?.projectInfor?.id)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem('auth')))


}, [location])

  const handleLogOut = () => {
    dispatch(authSlice.actions.logout());
    navigate("/signIn", { replace: true });
    console.log("log out");
    setUser(null);
    // notifyLogOut();
  };
  const handleOpenCreateIssue = ()=>{
    if(projectId){
      navigate(`/project/create/${projectId}`, { replace: true });
    }
    else{
      navigate(`/page/notFond`, { replace:true });
    }
  }
  const handleSearchIssues = () => {
   if(projectId){
    navigate(`/search/issues/${projectId}`,{replace:true});
   }
   else{
    navigate(`/page/notFond`, { replace:true });
   }
  }
  
  

  return (
    <div
      className={clsx(styles.body, { [styles.open]: isExtent })}
      onMouseEnter={() => {
        setIsExtent(true);
      }}
      onMouseLeave={() => {
        setIsExtent(false);
      }}
    >
      <div className={styles.head}>
        {/* user information */}
        {user && (
          <div className={"flex flex-row w-full gap-3 mt-4 ml-4 h-[50px]"}>
            <Avatar imageUrl = {user?.user?.avatarUrl} />
            <p
              className={clsx("", {
                [styles.hidden]: !isExtent,
              })}
            >
              {user?.user?.name}
            </p>
          </div>
        )}
        {/* top icons */}
        <div className={clsx(styles.topIcon , 'relative')}>
          <AiOutlineProject onClick={()=>{
            navigate("/",{replace:true})
          }}  size={"32px"} />
            
        </div>
        {/* action  */}
        <div onClick={()=>{
          handleSearchIssues()
          setIsExtent(!isExtent)
          }} className={styles.action}>
          <BiSearch size={"28px"} className={styles.icons} />
          <p
            className={clsx(styles.action_text, { [styles.hidden]: !isExtent })}
          >
            SEARCH ISSUES
          </p>
        </div>
        <div onClick={()=>{
          handleOpenCreateIssue()

        }} className={styles.action}>
          <MdAdd size={"28px"} className={styles.icons} />
          <p
            className={clsx(styles.action_text, { [styles.hidden]: !isExtent })}
          >
            CREATE ISSUES
          </p>
        </div>
        <div onClick={()=>{navigate('/project/create',{replace:true})}} className={styles.action}>
          <MdAdd size={"28px"} className={styles.icons} />
          <p
            className={clsx(styles.action_text, { [styles.hidden]: !isExtent })}
          >
            CREATE PROJECT
          </p>
        </div>

        {user ? (
          <div
            onClick={() => {
              handleLogOut();
            }}
            className={styles.action}
          >
            <BiLogOut size={"28px"} className={styles.icons} />
            <p
              className={clsx(styles.action_text, {
                [styles.hidden]: !isExtent,
              })}
            >
              LOG OUT
            </p>
          </div>
        ) : (
          <div
            onClick={() => {
             navigate('/signIn',{replace:true})
            }}
            className={styles.action}
          >
            <BiLogIn size={"28px"} className={styles.icons} />
            <p
              className={clsx(styles.action_text, {
                [styles.hidden]: !isExtent,
              })}
            >
              LOG IN
            </p>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.action}>
          <AiOutlineQuestionCircle size={"32px"} className={styles.icons} />
          <p
            className={clsx(styles.action_text, { [styles.hidden]: !isExtent })}
          >
            CREATE ISSUES
          </p>
        </div>
      </div>
      
      
    </div>
  );
};

export default NavBar;
