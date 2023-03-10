import { createContext, useEffect, useState } from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import ControlRoute from "./components/ControlRoute/ControlRoute";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Board from "./pages/Board/Board";
import Projectinfor from "./pages/Projectinfor";
import { useDispatch, useSelector } from "react-redux";
import { backlogSlice } from "./redux/backlogSlice";
import { selectedSlice } from "./redux/selectedSlice";
import { doneSlice } from "./redux/doneSlice";
import { inprogressSlice } from "./redux/inprogressSlice";
import { fetchProjects } from "../api/index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getListProjects } from "./action/projectAction";
import SearchIssue from "./pages/SearchIssue/SearchIssue";
import DetailIssues from "./pages/DetailIssue/DetailIssues";
import CreateIssue from "./pages/CreateIssue/CreateIssue";
import NotFont from "./pages/NotFond/NotFont";
import Home from "./pages/Home/Home";

export const GlobalContex = createContext();
function App() {
  console.log("rerender");
  const data = useSelector((state) => state.project.projectInfor?.issues);
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")));

  useEffect(() => {
    if (user) {
      dispatch(getListProjects(user?.user?.id));
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      dispatch(backlogSlice.actions.updateDataFromProject(data));
      dispatch(selectedSlice.actions.updateDataFromProject(data));
      dispatch(doneSlice.actions.updateDataFromProject(data));
      dispatch(inprogressSlice.actions.updateDataFromProject(data));
    }
  }, [data]);

  return (
    <GlobalContex.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      <div className="App">
        <NavBar />
        <ControlRoute />

        {true && (
          <div style={{ width: "76%" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/board/:projectId" element={<Board />}></Route>
              <Route path="/project/settings" element={<Projectinfor />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path = {`/board/issues/:issueId`} element={<DetailIssues />} />
              <Route path = {`/project/create/:projectId`} element={<CreateIssue />} />
              <Route path="/search/issues/:projectId" element={<SearchIssue />} />
              <Route path="/page/notFond" element={<NotFont />} />
              <Route path="*" element={<NotFont />} />

              

              
            </Routes>
          </div>
        )}
      </div>
    </GlobalContex.Provider>
  );
}

export default App;
