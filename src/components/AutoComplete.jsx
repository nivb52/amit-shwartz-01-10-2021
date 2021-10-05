import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoComplete({
  noOptionsText,
  options,
  label,
  onChange,
  onInputChange
}) {


  const handleChange=()=>{

  }
  return (
    <Autocomplete
      onInputChange={onInputChange}
      onChange={onChange}
      noOptionsText={noOptionsText}
      // disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
