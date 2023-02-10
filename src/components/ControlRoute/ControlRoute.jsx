import React, {useState} from 'react'
import HeaderControl from './HeaderControl'
import styles from './styles.module.scss'
import {CiKeyboard, CiSettings} from 'react-icons/ci'
import {BsFilter, BsTruck} from 'react-icons/bs'
import {IoMdPaper} from 'react-icons/io'
import {HiOutlineDocumentReport} from 'react-icons/hi'
import {RxComponentBoolean} from 'react-icons/rx'
import {Link, useLocation} from 'react-router-dom'
import clsx from "clsx"


const ControlRoute = () => {
    const [isActive, setIsActive] = useState(false)
    let {pathname} = useLocation()

    return (
        <div className={styles.body}>
            <HeaderControl/>
            <Link to={"/project/board"}>
                <div
                    className={pathname === "/project/board" ? clsx(styles.linkButton, styles.active) : styles.linkButton}>
                    <CiKeyboard size={"24px"}/>
                    <span className={styles.btnContent}> Kaban Board</span>

                </div>
            </Link>
            <Link to={"/project/settings"}>
                <div
                    className={pathname === "/project/settings" ? clsx(styles.linkButton, styles.active) : styles.linkButton}>
                    <CiSettings size={"24px"}/>
                    <span className={styles.btnContent}>Project settings</span>
                </div>
            </Link>
            <div className={styles.linkButton}>
                <BsTruck size={"24px"}/>
                <span className={styles.btnContent}>Realeases</span>
            </div>
            <div className={styles.linkButton}>
                <BsFilter size={"24px"}/>
                <span className={styles.btnContent}>Issues and filters</span>
            </div>
            <div className={styles.linkButton}>
                <IoMdPaper size={"24px"}/>
                <span className={styles.btnContent}>Pages</span>
            </div>
            <div className={styles.linkButton}>
                <HiOutlineDocumentReport size={"24px"}/>
                <span className={styles.btnContent}>Reports</span>
            </div>
            <div className={styles.linkButton}>
                <RxComponentBoolean size={"24px"}/>
                <span className={styles.btnContent}>Component</span>
            </div>
        </div>

    )
}

export default ControlRoute
