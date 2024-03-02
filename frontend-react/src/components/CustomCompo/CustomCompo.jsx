import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export const CustomCompo = ({
  options,
  label,
  id,
  name,
  value,
  setValue,
  required,
  multiple,
  ...rest
}) => {
  return (
    <Autocomplete
      disablePortal
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      id={id}
      freeSolo
      options={options}
      multiple={multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          name={name}
          onChange={(ev) => {
            if (!multiple) {
              setValue(ev.target.value);
            }
          }}
          label={label}
        />
      )}
      {...rest}
    />
  );
};
