import React from 'react'
import {AiFillControl} from "react-icons/ai"
import styles from "./styles.module.scss";

const HeaderControl = ({nameProject, project_category}) => {
    return (
        <div className={styles.headerControl}>
            <AiFillControl size={"48px"}/>
            <div className={styles.infor}>
                <div className={styles.infor_name}>singularity 1.0</div>
                <div className={styles.infor_category}>Bussiness project</div>

            </div>
        </div>
    )
}

export default HeaderControl
