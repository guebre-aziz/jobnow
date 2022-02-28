import React from "react";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";

export default function LinkTab(props) {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        navigate(props.href);
      }}
      {...props}
    />
  );
}
