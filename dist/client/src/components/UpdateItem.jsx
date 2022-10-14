"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Create_1 = __importDefault(require("@mui/icons-material/Create"));
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const styles_1 = require("@mui/material/styles");
const client_1 = require("@apollo/client");
const Button_1 = __importDefault(require("@mui/material/Button"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Switch_1 = __importDefault(require("@mui/material/Switch"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
const FormLabel_1 = __importDefault(require("@mui/material/FormLabel"));
const InputLabel_1 = __importDefault(require("@mui/material/InputLabel"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const Select_1 = __importDefault(require("@mui/material/Select"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const material_1 = require("@mui/material");
const react_hooks_1 = require("@apollo/react-hooks");
const CategoryQuery_1 = require("../graphql/query/CategoryQuery");
const ItemQuery_1 = require("../graphql/query/ItemQuery");
const addItem_1 = require("../graphql/mutation/addItem");
const ItemQuery_2 = require("../graphql/query/ItemQuery");
function UpdateItem({ itemId, displayedCategory }) {
    const theme = (0, styles_1.useTheme)();
    const [formData, setFormData] = react_1.default.useState({
        name: "",
        price: 0,
        cost: 0,
        sku: "",
        stock: 0,
        barcode: "",
        image: "",
        category: "",
    });
    const [category, setCategory] = (0, react_2.useState)("");
    const { error, data } = (0, client_1.useQuery)(CategoryQuery_1.GET_CATEGORIES);
    const { error: errorItem, data: dataItem, loading: loadingItem, } = (0, client_1.useQuery)(ItemQuery_1.GET_ITEM_BY_ID, {
        variables: { itemId: itemId },
    });
    (0, react_2.useEffect)(() => {
        setFormData({
            name: !(dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.name) ? "" : dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.name,
            price: !(dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.price) ? "" : dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.price,
            cost: !(dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.cost) ? "" : dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.cost,
            sku: !(dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.sku) ? "" : dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.sku,
            stock: !(dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.stock) ? "" : dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.stock,
            barcode: !(dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.barcode) ? "" : dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.barcode,
            image: !(dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.image) ? "" : dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.image,
            category: !(dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.category._id) ? "" : dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.category._id,
        });
    }, [dataItem]);
    const { name, price, cost, sku, stock, barcode, image } = formData;
    console.log(category);
    const [updateItem, { loading }] = (0, react_hooks_1.useMutation)(addItem_1.UPDATE_ITEM, {
        variables: {
            itemId: itemId,
            itemInput: {
                category: dataItem === null || dataItem === void 0 ? void 0 : dataItem.getItem.category._id,
                name,
                price,
                cost,
                sku,
                barcode,
                stock,
                image
            }
        },
        update(cache, { data: { updateItem } }) {
            const { getItems } = cache.readQuery({ query: ItemQuery_2.GET_ALL_ITEMS });
            cache.writeQuery({
                query: ItemQuery_2.GET_ALL_ITEMS,
                data: { getItems: [...getItems, updateItem] },
            });
            if (displayedCategory !== "All Items") {
                const { getItemsByCategory } = cache.readQuery({
                    query: ItemQuery_2.GET_ITEMS_BY_CATEGORY,
                    variables: { categoryId: category },
                });
                cache.writeQuery({
                    query: ItemQuery_2.GET_ITEMS_BY_CATEGORY,
                    variables: { categoryId: category },
                    data: { getItemsByCategory: [...getItemsByCategory, updateItem] },
                });
            }
        },
        onError(err) {
            console.log(err);
        },
    });
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.type === "number"
                ? parseFloat(e.target.value)
                : e.target.value }));
    };
    if (error)
        return <p>Something Went Wrong...</p>;
    if (loadingItem || loading)
        return <div>Loading...</div>;
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    const handleUpdateItem = (e) => {
        e.preventDefault();
        updateItem();
        console.log(dataItem.getItem.category._id);
    };
    return (<>
      <styles_1.ThemeProvider theme={theme}>
        <Box_1.default component="form" sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }} onSubmit={handleUpdateItem}>
          <Avatar_1.default sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Create_1.default />
          </Avatar_1.default>
          <Typography_1.default id="transition-modal-title" variant="h5" component="h2">
            Update Item
          </Typography_1.default>
          <Box_1.default sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            marginTop: 1,
        }}>
            <Typography_1.default variant="h6" gutterBottom>
              Item Details
            </Typography_1.default>
            <Grid_1.default container spacing={3}>
              <Grid_1.default item xs={12} sm={12}>
                <TextField_1.default required id="itemName" name="name" label="Item Name" fullWidth autoComplete="given-name" variant="standard" value={name} onChange={handleChange}/>
              </Grid_1.default>

              <Grid_1.default item xs={12} sm={12}>
                <FormControl_1.default fullWidth variant="standard">
                  <InputLabel_1.default id="category-select-label">Categories</InputLabel_1.default>
                  <Select_1.default labelId="category-label" id="category-select" name="category" value={dataItem.getItem.category._id} label="Categories" onChange={handleChangeCategory}>
                    {data.getCategory.map((category) => (<MenuItem_1.default key={category._id} value={category._id}>
                        {category.categoryName}
                      </MenuItem_1.default>))}
                  </Select_1.default>
                </FormControl_1.default>
              </Grid_1.default>

              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default required id="price" name="price" label="Price" type="number" fullWidth autoComplete="given-name" variant="standard" value={price} onChange={handleChange}/>
              </Grid_1.default>
              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default id="cost" name="cost" label="Cost" type="number" fullWidth autoComplete="family-name" variant="standard" value={cost} onChange={handleChange}/>
              </Grid_1.default>

              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default id="sku" name="sku" label="SKU" fullWidth autoComplete="given-name" variant="standard" value={sku} onChange={handleChange}/>
              </Grid_1.default>
              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default id="barcode" name="barcode" label="Barcode" fullWidth autoComplete="family-name" variant="standard" value={barcode} onChange={handleChange}/>
              </Grid_1.default>
            </Grid_1.default>

            <Grid_1.default item xs={12} sm={6} marginTop={3}>
              <material_1.Divider>
                <FormLabel_1.default component="legend">Inventory</FormLabel_1.default>
              </material_1.Divider>
            </Grid_1.default>
            <Grid_1.default container spacing={3}>
              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default id="stock" name="stock" label="Stock" type="number" fullWidth autoComplete="family-name" variant="standard" value={stock} onChange={handleChange}/>
              </Grid_1.default>

              <Grid_1.default item marginTop={2}>
                <FormControlLabel_1.default value="start" control={<Switch_1.default color="primary" defaultChecked/>} label="Track Inventory" labelPlacement="start"/>
              </Grid_1.default>
            </Grid_1.default>

            {/* <Grid item xs={12} sm={12} marginTop={2}>
          <Button variant="contained" component="label" fullWidth>
            Upload Image&nbsp;
            <input type="file" onChange={handleUploadChange} />
          </Button>
        </Grid> */}

            <Grid_1.default item xs={12} sm={12} marginTop={2}>
              <Button_1.default type="submit" fullWidth variant="contained" color="primary">
                Update Item
              </Button_1.default>
            </Grid_1.default>
          </Box_1.default>
        </Box_1.default>
      </styles_1.ThemeProvider>
    </>);
}
exports.default = UpdateItem;
