"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const DashboardContent_1 = __importDefault(require("../components/DashboardContent"));
//For Date Picker
const dayjs_1 = __importDefault(require("dayjs"));
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
const AdapterDayjs_1 = require("@mui/x-date-pickers/AdapterDayjs");
const MobileDatePicker_1 = require("@mui/x-date-pickers/MobileDatePicker");
function Dashboard() {
    //For Date (From)
    const [valueFrom, setValueFrom] = react_1.default.useState((0, dayjs_1.default)().startOf("day"));
    const handleChangeDatePickerFrom = (newValue) => {
        setValueFrom(newValue);
    };
    //For Date Pickers (To)
    const [valueTo, setValueTo] = react_1.default.useState((0, dayjs_1.default)().endOf("day"));
    const handleChangeDatePickerTo = (newValue) => {
        setValueTo(newValue);
    };
    return (<Container_1.default>
      <Grid_1.default display="flex" justifyContent="center" alignItems="center" marginTop="80px">
        <Box_1.default margin="20px">
          <LocalizationProvider_1.LocalizationProvider dateAdapter={AdapterDayjs_1.AdapterDayjs}>
            <Stack_1.default spacing={3}>
              <MobileDatePicker_1.MobileDatePicker label="Sold Item From:" inputFormat="MM/DD/YYYY" value={valueFrom} onChange={handleChangeDatePickerFrom} renderInput={(params) => <TextField_1.default {...params}/>}/>
            </Stack_1.default>
          </LocalizationProvider_1.LocalizationProvider>
        </Box_1.default>
        <Box_1.default margin="20px">
          <LocalizationProvider_1.LocalizationProvider dateAdapter={AdapterDayjs_1.AdapterDayjs}>
            <Stack_1.default spacing={3}>
              <MobileDatePicker_1.MobileDatePicker label="Sold Item To:" inputFormat="MM/DD/YYYY" value={valueTo} onChange={handleChangeDatePickerTo} renderInput={(params) => <TextField_1.default {...params}/>}/>
            </Stack_1.default>
          </LocalizationProvider_1.LocalizationProvider>
        </Box_1.default>
      </Grid_1.default>
      <Grid_1.default>
        <DashboardContent_1.default from={valueFrom} to={valueTo}/>
      </Grid_1.default>
    </Container_1.default>);
}
exports.default = Dashboard;
