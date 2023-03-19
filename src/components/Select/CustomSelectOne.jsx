import React from "react";
import "./custom-select-styles.scss";
import Select from 'react-select';
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    borderColor: state.isFocused ? "#000" : "#ccc",
  }),
};


const CustomSelectOne = ({ options , value , setValue , getOptionLabel , defaultValue  }) => {
 
  
  const handleChange = (selectedOption, action) => {
    setValue(selectedOption);
    
  }

  return (
   
    <Select defaultValue={defaultValue} getOptionLabel={getOptionLabel}  value={value} onChange = {(e)=>{
      
      handleChange(e)
    }} className="custom-select" options={options} styles={customStyles} />
  );
};

export default CustomSelectOne;
