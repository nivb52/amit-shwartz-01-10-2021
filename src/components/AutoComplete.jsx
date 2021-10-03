import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ noOptionsText, options, label, onChange }) {
  return (
    <Autocomplete
      onChange={onChange}
      noOptionsText={noOptionsText}
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
