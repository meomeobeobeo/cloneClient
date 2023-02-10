import React, {useState} from "react";
import styles from "./styles.module.scss";
import {BiSearch} from "react-icons/bi";
import {MdAdd} from "react-icons/md";
import {AiOutlineProject, AiOutlineQuestionCircle} from "react-icons/ai";
import clsx from 'clsx'

const NavBar = () => {
    const [isExtent, setIsExtent] = useState(false);

    return (
        <div className={clsx(styles.body, {[styles.open]: isExtent})} onMouseEnter={() => {
            setIsExtent(true)
        }} onMouseLeave={() => {
            setIsExtent(false)
        }}>
            <div className={styles.head}>
                <div className={styles.topIcon}>
                    <AiOutlineProject size={"32px"}/>
                </div>
                <div className={styles.action}>
                    <BiSearch size={"28px"} className={styles.icons}/>
                    <p className={clsx(styles.action_text, {[styles.hidden]: !isExtent})}>SEARCH ISSUES</p>
                </div>
                <div className={styles.action}>
                    <MdAdd size={"28px"} className={styles.icons}/>
                    <p className={clsx(styles.action_text, {[styles.hidden]: !isExtent})}>
                        CREATE ISSUES
                    </p>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.action}>
                    <AiOutlineQuestionCircle size={"32px"} className={styles.icons}/>
                    <p className={clsx(styles.action_text, {[styles.hidden]: !isExtent})}>
                        CREATE ISSUES
                    </p>
                </div>
            </div>

        </div>
    );
};

export default NavBar;
