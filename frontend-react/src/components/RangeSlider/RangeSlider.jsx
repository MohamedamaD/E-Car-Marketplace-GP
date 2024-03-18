import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
export const RangeSlider = ({ value, setValue, min, max }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Slider
        getAriaLabel={() => "Car price range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
    </Box>
  );
};
