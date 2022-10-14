import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressBar() {
  return (
    <Stack>
      <LinearProgress />
      <LinearProgress color="secondary" />
    </Stack>
  );
}
