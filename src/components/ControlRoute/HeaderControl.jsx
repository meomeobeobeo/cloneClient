import clsx from "clsx";
import React, { useState } from "react";
import { AiFillControl } from "react-icons/ai";
import Listproject from "./Listproject";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const HeaderControl = ({ nameProject, project_category }) => {
  const [isOpen, setIsopen] = useState(false);
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
        <div className={styles.infor_name}>{nameProject}</div>
        <div className={styles.infor_category}>{project_category}</div>
      </div>
    </div>
  );
};
HeaderControl.prototype = {
  nameProject: PropTypes.string,
  project_category: PropTypes.string,
};
HeaderControl.defaultProps = {
  nameProject: "Hello",
  project_category: "xin chao",
};

export default HeaderControl;
