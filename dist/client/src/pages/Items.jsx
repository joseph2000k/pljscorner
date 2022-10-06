"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("@apollo/client");
const Container_1 = __importDefault(require("@mui/material/Container"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const ItemTable_1 = __importDefault(require("../components/ItemTable"));
const CreateItem_1 = __importDefault(require("../components/CreateItem"));
const InputLabel_1 = __importDefault(require("@mui/material/InputLabel"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const Select_1 = __importDefault(require("@mui/material/Select"));
const CategoryQuery_1 = require("../graphql/query/CategoryQuery");
const ItemQuery_1 = require("../graphql/query/ItemQuery");
const ProgressBar_1 = __importDefault(require("../components/ProgressBar"));
//for Dial
const SpeedDial_1 = __importDefault(require("@mui/material/SpeedDial"));
const SpeedDialIcon_1 = __importDefault(require("@mui/material/SpeedDialIcon"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
const Create_1 = __importDefault(require("@mui/icons-material/Create"));
//for Modal
const Modal_1 = __importDefault(require("@mui/material/Modal"));
const Backdrop_1 = __importDefault(require("@mui/material/Backdrop"));
const Fade_1 = __importDefault(require("@mui/material/Fade"));
function Items() {
    //Modal Transition
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = (0, react_1.useState)("All Items");
    const { loading, error, data } = (0, client_1.useQuery)(CategoryQuery_1.GET_CATEGORIES);
    const getItems = (0, client_1.useQuery)(ItemQuery_1.GET_ALL_ITEMS);
    getItems.refetch();
    const getItemsByCategory = (0, client_1.useQuery)(ItemQuery_1.GET_ITEMS_BY_CATEGORY, {
        variables: {
            categoryId: category,
        },
    });
    let items = [];
    if (category === "All Items" && !getItems.loading && !getItems.error) {
        items = getItems.data.getItems;
    }
    else if (!getItemsByCategory.loading && !getItemsByCategory.error) {
        items = getItemsByCategory.data.getItemsByCategory;
    }
    if (loading)
        return <ProgressBar_1.default />;
    if (error)
        return <p>Something Went Wrong...</p>;
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    //Modal Style
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 24,
        p: 4,
    };
    return (<>
      {!loading && !error && (<Container_1.default>
          <Box_1.default sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "100px",
            }}>
            <div>
              <Box_1.default sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "100%",
                marginBottom: 2,
            }}>
                <Box_1.default>
                  <Typography_1.default sx={{ flex: "1 1 100%" }} variant="h5" id="tableTitle" component="div">
                    Items
                  </Typography_1.default>
                </Box_1.default>
                <Box_1.default sx={{ width: 200 }}>
                  <FormControl_1.default fullWidth>
                    <InputLabel_1.default id="category-select-label">
                      Categories
                    </InputLabel_1.default>
                    <Select_1.default labelId="category-label" id="category-select" value={category} label="Categories" onChange={handleChange} defaultValue="All Items">
                      <MenuItem_1.default value="All Items">All Items</MenuItem_1.default>
                      {data.getCategory.map((category) => (<MenuItem_1.default key={category._id} value={category._id}>
                          {category.categoryName}
                        </MenuItem_1.default>))}
                    </Select_1.default>
                  </FormControl_1.default>
                </Box_1.default>
              </Box_1.default>

              {<ItemTable_1.default items={items}/>}
            </div>
          </Box_1.default>
        </Container_1.default>)}
      <Box_1.default sx={{
            position: "fixed",
            bottom: 0,
            right: "1%",
            zIndex: "modal",
        }}>
        <Tooltip_1.default title="Create Item" placement="top" TransitionComponent={Fade_1.default} TransitionProps={{ timeout: 600 }}>
          <SpeedDial_1.default ariaLabel="SpeedDial" sx={{ position: "absolute", bottom: 16, right: 20 }} icon={<SpeedDialIcon_1.default openIcon={<Create_1.default />}/>} onClick={handleOpen}></SpeedDial_1.default>
        </Tooltip_1.default>
      </Box_1.default>

      <div>
        <Modal_1.default aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop_1.default} BackdropProps={{
            timeout: 500,
        }}>
          <Fade_1.default in={open}>
            <Box_1.default sx={style}>
              <CreateItem_1.default displayedCategory={category}/>
            </Box_1.default>
          </Fade_1.default>
        </Modal_1.default>
      </div>
    </>);
}
exports.default = Items;
