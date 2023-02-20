import React, { useState } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
const TextEditer = ({content , setContent , height}) => {
  

 
  

  const modules = {
    toolbar: [
    //   [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ size: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill style={{height: `${height}`}}  value={content} onChange={setContent} modules={modules} />
  );
};

export default TextEditer;
