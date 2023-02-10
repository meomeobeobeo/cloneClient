import React from 'react'
import styles from './styles.module.scss'
import {AiFillGithub} from 'react-icons/ai'

const BoardHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.infor}>
                <div>
                    <div className={styles.nameProject}>Projects / singulary 1.0 / Kaban Board</div>

                </div>
                <h2>Kanban board</h2>

            </div>
            <div className={styles.gitButton}>
                <AiFillGithub size={"24px"}/>
                <span style={{paddingLeft: "4px"}}>Github Repo</span>

            </div>
        </div>
    )
}

export default BoardHeader
