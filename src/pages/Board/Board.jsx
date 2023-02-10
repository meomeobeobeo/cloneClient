import React from "react";
import {useDispatch} from "react-redux";
import BoardContent from "./BoardContent";
import BoardFilter from "./BoardFilter";
import BoardHeader from "./BoardHeader";
import styles from "./styles.module.scss";

const Board = () => {
    const dispath = useDispatch();

    return (
        <div className={styles.body}>
            <BoardHeader/>
            <BoardFilter/>
            <BoardContent/>

        </div>
    );
};

export default Board;
