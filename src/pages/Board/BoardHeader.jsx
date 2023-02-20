import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AiFillGithub } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import clsx from "clsx";
import * as api from "../../../api/index";
import Avatar from "../../components/Avata/Avatar";
import { MdAdd } from "react-icons/md";
import { addUserToProject } from "../../action/projectAction";

// userSearch component
const UserSearch = ({ searchText, setIsOpen, isOpen }) => {
const dispatch = useDispatch()  
const [users, setUsers] = useState([]);
const project = useSelector(state => state.project.projectInfor)
  console.log(users);

  const handleAddUserToProject = (userId) => {
    dispatch(addUserToProject({userId: userId, projectId: project?.id}))

  };

  useEffect(() => {
    const data = api.getListUserFind(searchText);
    data.then((res) => {
      setUsers(res.data);
    });
  }, [searchText]);
  return (
    <>
      {isOpen && (
        <div
          style={{ top: 28 }}
          className={clsx(
            "w-[240px] h-[300px] bg-slate-200 absolute  z-[9999]  shadow-md p-2 "
          )}
        >
          {users.map((user, index) => {
            return (
              <div
                key={user.id}
                className="flex flex-row  items-center p-2 px-4 rounded-[2px] cursor-pointer gap-2 relative border-b-2 border-gray-500 hover:bg-slate-400"
              >
                <Avatar imageUrl = {user.avatarUrl} size={"24px"} />
                <span className="">{user.name}</span>
                <MdAdd
                    onClick={()=>{
                        handleAddUserToProject(user?.id )
                        setIsOpen(false)
                        
                    }}
                  size={"24px"}
                  className="text-blue-500 hover:bg-slate-100 rounded-full absolute right-0 "
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const BoardHeader = () => {
  const project = useSelector((state) => state.project.projectInfor);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (searchText == "") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [searchText]);
  return (
    <div className={styles.header}>
      <div className={styles.infor}>
        <div>
          <div className={styles.nameProject}>
            Projects / {project?.name} / Kaban Board
          </div>
        </div>
        <h2>Kanban board</h2>
      </div>
      {/* userSearch  */}
      {project && (
        <div
          className={
            "w-[240px] flex justify-center items-center h-[28px] bg-[#eee] rounded-[4px] border-2 border-solid border-[#ccc] focus-within:border-2 focus-within:border-solid focus-within:border-blue-500 relative "
          }
        >
          <BsSearch size={"14px"} className={"w-[40px]"} />
          <input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="user search"
            className={
              "p-0 m-0 w-[200px] border-none bg-[#eee] h-[22px] rounded-sm focus:border-none focus:outline-none "
            }
          ></input>

          {/*user search result */}
          <UserSearch
            searchText={searchText}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
      )}

      <div className={styles.gitButton}>
        <AiFillGithub size={"24px"} />
        <span style={{ paddingLeft: "4px" }}>Github Repo</span>
      </div>
    </div>
  );
};

export default React.memo(BoardHeader);
