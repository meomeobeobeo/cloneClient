import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailProject } from "../../action/projectAction";

const Listproject = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const handleLoadProject = (projectId) => {
    dispatch(getDetailProject(projectId));
  };

  const listProjects = useSelector((state) => state.listProjects.listInfor);
  console.log(listProjects);
  return (
    <div
      className={clsx(
        "bg-white overflow-y-auto overflow-x-hidden w-[210px] h-[300px] left-[-72px] top-[46px] absolute z-500 shadow-slate-700 shadow-md ",
        { hidden: !isOpen }
      )}
    >
      <div className="m-2">
        <span>Choose the project.</span>
        <ul className="mt-2 border-b-2 border-gray-600 ">
          {listProjects?.map((project) => {
            return (
              <li
                key={project?.id}
                onClick={() => {
                  setIsOpen(!isOpen);
                  handleLoadProject(project?.id);
                }}
                className="border-t-2 border-gray-600 py-1 cursor-pointer hover:bg-slate-400 p-2"
              >
                {project.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Listproject;
