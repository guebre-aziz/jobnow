import React from "react";

export default function Error(props) {
  return <h6>Error: {props.error.message}</h6>;
}
