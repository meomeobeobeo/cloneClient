import React from "react";
import { FiTrash } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { PlusOutlined  } from '@ant-design/icons';
import { MdEmojiEmotions } from "react-icons/md";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
const Icons = ({ iconName, size }) => {
  switch (iconName) {
    case "RxUpdate":
      return <RxUpdate />;

      break;
    case "FiTrash":
      return <FiTrash size={size} />;

      break;
    case "AiOutlineSearch":
      return <AiOutlineSearch size={size} />;

      break;
    case "AiOutlinePlus":
      return <AiOutlinePlus size={size} />

      break;

    default:
      return <MdEmojiEmotions size={size} />;
      break;
  }
};

export default Icons;
