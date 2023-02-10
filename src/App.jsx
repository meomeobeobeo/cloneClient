import {useEffect} from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import ControlRoute from "./components/ControlRoute/ControlRoute";
import {Route, Routes} from "react-router-dom";
import Board from "./pages/Board/Board";
import Projectinfor from "./pages/Projectinfor";
import {useDispatch, useSelector} from "react-redux";
import {backlogSlice} from "./redux/backlogSlice";
import {selectedSlice} from "./redux/selectedSlice";
import {doneSlice} from "./redux/doneSlice";
import {inprogressSlice} from "./redux/inprogressSlice";
import {fetchProjects} from "../api/index"

function App() {

    useEffect( ()=>{
        const data = fetchProjects()
        data.then(data => {
            console.log(data.data)
        })
    })
    console.log("rerender")
    const data = useSelector((state) => state.project.issues)
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(backlogSlice.actions.updateDataFromProject(data))
        dispatch(selectedSlice.actions.updateDataFromProject(data))
        dispatch(doneSlice.actions.updateDataFromProject(data))
        dispatch(inprogressSlice.actions.updateDataFromProject(data))

    }, [data])


    return (
        <div className="App">
            <NavBar/>
            <ControlRoute/>

            <div style={{width: '76%'}}>
                <Routes>
                    <Route path="/" element={<Board/>}/>
                    <Route path="/project/board" element={<Board/>}></Route>
                    <Route path="/project/settings" element={<Projectinfor/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
