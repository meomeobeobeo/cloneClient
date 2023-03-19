import React from "react";

const Element = ({
  field_value,
  field_type,
  field_id,
  field_placeholder,
  field_label,
  setFormData,
  handleChange
  
}) => {
  console.log(field_type);

  return (
    
      <div className="form-group">
        <label>{field_label}</label>
        <input
          type={field_type}
          className="form-control"
          id={field_id}
          aria-describedby="emailHelp"
          placeholder={field_placeholder}
          value={field_value}
          onChange  = {(e)=>{
            handleChange(field_id , e)
           
          }
          }
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your <span className="text-red-500"  > {field_label}</span> with anyone else.
        </small>
      </div>
    
  );
};

export default Element;
