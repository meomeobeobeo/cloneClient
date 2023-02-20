import React from "react";
import chroma from "chroma-js";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data";
import Select from "react-select";

const animatedComponents = makeAnimated();

const CustomSelectMuiltil = ({
  options,
  values,
  setValues,
  getOptionLabel,
}) => {
  const handleChange = (options) => {
    setValues(options);
  };

  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={options}
      onChange={handleChange}
      value={values}
      components={animatedComponents}
    />
  );
};

export default CustomSelectMuiltil;
