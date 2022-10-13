import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DashboardContent from "../components/DashboardContent";

//For Date Picker
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

function Dashboard() {
  //For Date (From)
  const [valueFrom, setValueFrom] = React.useState<Dayjs | null>(
    dayjs().startOf("day")
  );

  const handleChangeDatePickerFrom = (newValue: Dayjs | null) => {
    setValueFrom(newValue);
  };

  //For Date Pickers (To)
  const [valueTo, setValueTo] = React.useState<Dayjs | null>(
    dayjs().endOf("day")
  );

  const handleChangeDatePickerTo = (newValue: Dayjs | null) => {
    setValueTo(newValue);
  };

  return (
    <Container>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="80px"
      >
        <Box margin="20px">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Sold Item From:"
                inputFormat="MM/DD/YYYY"
                value={valueFrom}
                onChange={handleChangeDatePickerFrom}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box margin="20px">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Sold Item To:"
                inputFormat="MM/DD/YYYY"
                value={valueTo}
                onChange={handleChangeDatePickerTo}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
      </Grid>
      <Grid>
        <DashboardContent from={valueFrom} to={valueTo} />
      </Grid>
    </Container>
  );
}

export default Dashboard;
