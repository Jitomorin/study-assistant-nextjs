"use client";

import { Stack } from "@mui/material";

import { useTimerStore } from "../store/timerStore";

import { ButtonGroup } from "./ButtonGroup";
import React from "react";

export const Settings = () => {
  const { breakLength, workLength, changeLength } = useTimerStore();

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      color="#4A4E69"
    >
      <ButtonGroup
        label="Session Length"
        value={workLength}
        onDecrement={() => changeLength("work", workLength - 1)}
        onIncrement={() => changeLength("work", workLength + 1)}
      />
      <ButtonGroup
        label="Break Length"
        value={breakLength}
        onDecrement={() => changeLength("break", breakLength - 1)}
        onIncrement={() => changeLength("break", breakLength + 1)}
      />
    </Stack>
  );
};
