import React from "react";

const Projectinfor = () => {
    return (
        <div className="flex flex-col w-[70%] h-[100vh] mx-auto">
            {/* header */}
            <div className="text-gray-500 text-[15px] font-normal text-sm mt-2 mb-4">
                Project / singularity / Project Details
            </div>
            <div className="font-bold text-xl mb-5 "> Project Details</div>
            {/* form detail */}
            <div className="w-full flex flex-col gap-3">
                <div className="">
                    <div className="w-full text-gray-500 text-[15px]">Name</div>
                    <input
                        value={"singularity 1.0"}
                        className="w-full rounded-[4px] h-[28px] text-gray-900 outline-none border-slate-300 border-2 bg-slate-200 focus:border-blue-500 mt-2 focus:bg-[#fff]  "
                    ></input>
                </div>

                <div className="">
                    <div className="w-full text-gray-500 text-[15px]">URL</div>
                    <input
                        value={"https://www.atlassian.com/software/jira"}
                        className="w-full rounded-[4px] h-[28px] text-gray-900 outline-none border-slate-300 border-2 bg-slate-200 focus:border-blue-500 mt-2 focus:bg-[#fff]  "
                    ></input>
                </div>

                <div className="">
                    <div className="w-full text-gray-500 text-[15px]">Description</div>
                    <div className="w-full bg-[#fff]  border-gray-300 border-2">
                        {/* control  */}
                        <div className="w-full mx-2 mt-3 mb-6">{/* icons */}</div>
                        <textarea className="w-full mx-[8px] focus:outline-none focus:border-none "/>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    Describe the project in as much detail as you'd like.
                </div>
                {/* category */}
                <div className="w-full">
                    <div className="w-full mb-2 text-gray-500 text-[13px]">Project Category</div>
                    <select className="w-full bg-slate-200 h-[28px] rounded-md p-1">
                        <option value="SorfWare"
                                className="bg-[#fff] border-l-1 border-blue-500 mt-2 text-sm">SorfWare
                        </option>
                        <option value="Bussiness"
                                className="bg-[#fff] border-l-1 border-blue-500 mt-2 text-sm">Bussiness
                        </option>
                        <option value="Makettting"
                                className="bg-[#fff] border-l-1 border-blue-500 mt-2 text-sm">Maketting
                        </option>
                    </select>
                </div>
                {/* button save change */}
                <div
                    className="bg-blue-600 w-[120px] p-2 text-[15px] text-[#fff] rounded-md mt-3 cursor-pointer hover:bg-blue-400 ">
                    <span className="m-auto">Save Changes</span></div>
            </div>
        </div>
    );
};

export default Projectinfor;
