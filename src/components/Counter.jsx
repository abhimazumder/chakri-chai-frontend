/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "@fontsource/montserrat";

const styles = {
  counterStyle: {
    color: "#ED1C24",
    fontSize: "0.8rem",
    fontFamily: "Montserrat, sans-serif",
  },
};

const Counter = ({ handleShowCountdownFalse }) => {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) handleShowCountdownFalse();
  }, [counter, handleShowCountdownFalse]);
  return <Box style={styles.counterStyle}>{`Didn't receive? Wait for ${counter} seconds before retrying`}</Box>;
};

export default Counter;
