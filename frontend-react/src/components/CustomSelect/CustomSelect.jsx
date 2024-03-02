import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const CustomSelect = ({
  state,
  setState,
  label,
  options,
  id,
  name,
  ...rest
}) => {
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          id={id}
          value={state}
          label={label}
          autoWidth
          name={name}
          onChange={handleChange}
          {...rest}
        >
          <MenuItem value={"default"}>
            <em>اختر شيء</em>
          </MenuItem>
          {options.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.arValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
