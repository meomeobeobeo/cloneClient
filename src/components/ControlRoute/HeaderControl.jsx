import clsx from "clsx";
import React, { useState } from "react";
import { AiFillControl } from "react-icons/ai";
import Listproject from "./Listproject";
import styles from "./styles.module.scss";

const HeaderControl = ({ nameProject, project_category }) => {
  const [isOpen, setIsopen] = useState(true);
  return (
    <div className={styles.headerControl}>
      <AiFillControl
        onClick={() => {
          setIsopen(!isOpen);
        }}
        size={"48px"}
      />
      <div className={clsx(styles.infor, "relative")}>
        <Listproject isOpen={isOpen} setIsOpen={setIsopen} />
        <div className={styles.infor_name}>singularity 1.0</div>
        <div className={styles.infor_category}>Bussiness project</div>
      </div>
    </div>
  );
};

export default HeaderControl;
