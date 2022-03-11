import React from "react";
import { Typography } from "@mui/material";

export default function Error(props) {
  return (
    <Typography variant="h6" color="error" sx={{ p: 2 }}>
      Error: {props.error.message}
    </Typography>
  );
}
