import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const listProject = useSelector((state) => state.listProjects.listInfor);
  console.log(listProject);
  const [listProjectFilter, setListProjectFilter] = useState([]);
 
  useEffect(()=>{
    setListProjectFilter(listProject)
  },[])
  useEffect(() => {
    if(searchText == ''){
      setListProjectFilter([]);
    }
    const filter = listProject?.filter((project) => {
      return project.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setListProjectFilter(filter);
  }, [searchText]);
  console.log(listProjectFilter);
 

  return (
    <div className="w-full ml-4 mt-2">
      <h1 className="">Hello , This is projects you are admin.</h1>
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
          placeholder="project search"
          className={
            "p-0 m-0 w-[200px] border-none bg-[#eee] h-[22px] rounded-sm focus:border-none focus:outline-none "
          }
        ></input>
      </div>
      {/* table */}
      <div className="">
        <table className="mt-4">
          <thead>
            <tr>
              <th className="px-16 py-2 border-gray-300 border-solid border-2 bg-blue-100 rounded-md">
                Name project
              </th>
              <th className="px-16 py-2 border-gray-300 border-solid border-2 bg-blue-100 rounded-md">
                Created At
              </th>
              <th className="px-16 py-2 border-gray-300 border-solid border-2 bg-blue-100 rounded-md">
                Updated At
              </th>
              <th className="px-16 py-2 border-gray-300 border-solid border-2 bg-blue-100 rounded-md">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {listProjectFilter.map((project) => {
              return (
                <tr
                  key={project.id}
                  onClick={() => {
                    navigate(`/project/board/${project.id}`);
                  }}
                  className="hover:bg-blue-200"
                >
                  <td className="px-1 py-1 border-solid border-2 rounded-md cursor-pointer hover:bg-red-200 ">
                    {project.name}
                  </td>
                  <td className="px-1 py-1 border-solid border-2 rounded-md cursor-pointer hover:bg-red-200 ">
                    {moment(project.createdAt).calendar()}
                  </td>
                  <td className="px-1 py-1 border-solid border-2 rounded-md cursor-pointer hover:bg-red-200 ">
                    {moment(project.updatedAt).calendar()}
                  </td>
                  <td className="px-1 py-1 border-solid border-2 rounded-md cursor-pointer hover:bg-red-200 ">
                    Action hi hi
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
