import React, {useState} from "react";
import styles from "./styles.module.scss";
import {BsSearch} from "react-icons/bs";
import Avatar from "../../components/Avata/Avatar";
import clsx from "clsx";

const BoardFilter = () => {
    const [isActiveOnlyMyIssuesBtn, setIsActiveOnlyMyIssuesBtn] = useState(false);
    const [isActiveRecentlyUpdated, setIsActiveRecentlyUpdated] = useState(false);
    return (
        <div className={styles.filter}>
            <div className={styles.search}>
                <BsSearch size={"14px"} className={styles.icon}/>
                <input className={styles.input}></input>
            </div>
            {/* user filter */}
            <div className={styles.members}>
                {/* this is list avartar of user  */}
                <Avatar/>
                <Avatar/>
                <Avatar/>
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
                            className={
                                styles.clearAllBtn
                            }
                            onClick={() => {
                                setIsActiveOnlyMyIssuesBtn(false)
                                setIsActiveRecentlyUpdated(false)
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

export default BoardFilter;
