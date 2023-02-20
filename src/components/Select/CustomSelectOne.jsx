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


const CustomSelectOne = ({ options , value , setValue , getOptionLabel }) => {

  const handleChange = (selectedOption, action) => {
    setValue(selectedOption);
    
  }

  return (
    <Select getOptionLabel={getOptionLabel}  value={value} onChange = {handleChange} className="custom-select" options={options} styles={customStyles} />
  );
};

export default CustomSelectOne;
