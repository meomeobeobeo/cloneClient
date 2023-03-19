import React, { useState } from "react";

import * as contruct from "../pages.json";
import Element from "./components/Element";
import Button from "react-bootstrap/Button";
const ChangeUserInfor = () => {
  const [contruct_page, setContruct_page] = useState(
    contruct.change_user_infor
  );
    
  const formData = contruct_page.fields.map(field => {
   return {
    [field.field_key] : field.field_value
   }
  })
  console.log(formData);


  // fuction

  const handleChange = (field_id , event) => {
    const newSetUp = { ...contruct_page };
    newSetUp.fields.forEach((field) => {
        const id = field.field_id
        if(id === field_id) {
            field.field_value = event.target.value
        }
     
    });
    setContruct_page(newSetUp);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-2xl"> {contruct_page.page_label} </h1>

      <div className="flex flex-col mt-4">
        {contruct_page.fields.map((field) => {
          return (
            <Element
              handleChange={handleChange}
              key={field.field_id}
              field_id={field.field_id}
              field_type={field.field_type}
              field_label={field.field_label}
              field_placeholder={field.field_placeholder}
              field_value={field.field_value}

            />
          );
        })}
      </div>
      <div className="flex flex-row gap-2 mt-2">
        <Button
          className=""
          variant={contruct_page.buttons.save_button.variant}
        >
          {contruct_page.buttons.save_button.button_name}
        </Button>
        <Button
          className=""
          variant={contruct_page.buttons.cancel_button.variant}
        >
          {contruct_page.buttons.cancel_button.button_name}
        </Button>
      </div>
    </div>
  );
};

export default ChangeUserInfor;
