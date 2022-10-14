import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ItemTable from "../components/ItemTable";
import CreateItem from "../components/CreateItem";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GET_CATEGORIES } from "../graphql/query/CategoryQuery";
import {
  GET_ALL_ITEMS,
  GET_ITEMS_BY_CATEGORY,
} from "../graphql/query/ItemQuery";
import ProgressBar from "../components/ProgressBar";
//for Dial
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Tooltip from "@mui/material/Tooltip";
import CreateIcon from "@mui/icons-material/Create";
//for Modal
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
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
import { Moment } from "moment";
import moment from "moment";

function Items() {
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
  //Modal Transition
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [category, setCategory] = useState("All Items");

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const getItems = useQuery(GET_ALL_ITEMS);
  getItems.refetch();
  const getItemsByCategory = useQuery(GET_ITEMS_BY_CATEGORY, {
    variables: {
      categoryId: category,
    },
  });

  let items = [];
  if (category === "All Items" && !getItems.loading && !getItems.error) {
    items = getItems.data.getItems;
  } else if (!getItemsByCategory.loading && !getItemsByCategory.error) {
    items = getItemsByCategory.data.getItemsByCategory;
  }

  if (loading) return <ProgressBar />;
  if (error) return <p>Something Went Wrong...</p>;

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  //Modal Style
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {!loading && !error && (
        <Container>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "100px",
            }}
          >
            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: "100%",
                  marginBottom: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                  >
                    Items
                  </Typography>
                </Box>
                <Box>
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
                <Box>
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
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="category-select-label">
                      Categories
                    </InputLabel>
                    <Select
                      labelId="category-label"
                      id="category-select"
                      value={category}
                      label="Categories"
                      onChange={handleChange}
                      defaultValue="All Items"
                    >
                      <MenuItem value="All Items">All Items</MenuItem>
                      {data.getCategory.map((category: any) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {
                <ItemTable
                  items={items}
                  from={valueFrom}
                  to={valueTo}
                  displayedCategory={category}
                />
              }
            </div>
          </Box>
        </Container>
      )}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: "1%",
          zIndex: "modal",
        }}
      >
        <Tooltip
          title="Create Item"
          placement="top"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <SpeedDial
            ariaLabel="SpeedDial"
            sx={{ position: "absolute", bottom: 16, right: 20 }}
            icon={<SpeedDialIcon openIcon={<CreateIcon />} />}
            onClick={handleOpen}
          ></SpeedDial>
        </Tooltip>
      </Box>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <CreateItem displayedCategory={category} />
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default Items;
