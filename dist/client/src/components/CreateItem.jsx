"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
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
const hooks_1 = require("../utility/hooks");
const CategoryQuery_1 = require("../graphql/query/CategoryQuery");
const addItem_1 = require("../graphql/mutation/addItem");
const uploadimage_1 = require("../graphql/mutation/uploadimage");
const ItemQuery_1 = require("../graphql/query/ItemQuery");
const ProgressBar_1 = __importDefault(require("../components/ProgressBar"));
function CreateItem({ displayedCategory }) {
    const [singleUpload] = (0, react_hooks_1.useMutation)(uploadimage_1.UPLOAD_IMAGE);
    const [category, setCategory] = (0, react_1.useState)("");
    const [imageName, setImageName] = (0, react_1.useState)("");
    const [file, setFile] = (0, react_1.useState)();
    const { error, data } = (0, client_1.useQuery)(CategoryQuery_1.GET_CATEGORIES);
    const theme = (0, styles_1.useTheme)();
    const handleUploadChange = (event) => {
        if (!event.target.files)
            return;
        const file = event.target.files[0];
        setImageName(file.name);
        setFile(file);
        /* singleUpload({ variables: { file } }); */
    };
    function addItemCallback() {
        addItem();
        if (file) {
            singleUpload({ variables: { file } });
        }
    }
    const { handleChange, handleSubmit, formData } = (0, hooks_1.useForm)(addItemCallback, {
        name: "",
        price: 0,
        cost: 0,
        sku: "",
        stock: 0,
        barcode: "",
    });
    const { name, price, cost, sku, stock, barcode } = formData;
    const [addItem, { loading }] = (0, react_hooks_1.useMutation)(addItem_1.ADD_ITEM, {
        variables: {
            itemInput: {
                name,
                price,
                cost,
                sku,
                stock,
                barcode,
                image: imageName,
                category: category,
            },
        },
        update(cache, { data: { addItem } }) {
            const { getItems } = cache.readQuery({ query: ItemQuery_1.GET_ALL_ITEMS });
            cache.writeQuery({
                query: ItemQuery_1.GET_ALL_ITEMS,
                data: { getItems: [...getItems, addItem] },
            });
            if (displayedCategory !== "All Items") {
                const { getItemsByCategory } = cache.readQuery({
                    query: ItemQuery_1.GET_ITEMS_BY_CATEGORY,
                    variables: { categoryId: category },
                });
                cache.writeQuery({
                    query: ItemQuery_1.GET_ITEMS_BY_CATEGORY,
                    variables: { categoryId: category },
                    data: { getItemsByCategory: [...getItemsByCategory, addItem] },
                });
            }
        },
        onError(err) {
            console.log(err);
        },
    });
    if (loading)
        return <ProgressBar_1.default />;
    if (error)
        return <p>Something Went Wrong...</p>;
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    return (<>
      <styles_1.ThemeProvider theme={theme}>
        <Box_1.default component="form" sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }} onSubmit={handleSubmit}>
          <Avatar_1.default sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Create_1.default />
          </Avatar_1.default>
          <Typography_1.default id="transition-modal-title" variant="h5" component="h2">
            Create Item
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
                <TextField_1.default required id="itemName" name="name" label="Item Name" fullWidth autoComplete="given-name" variant="standard" onChange={handleChange}/>
              </Grid_1.default>

              <Grid_1.default item xs={12} sm={12}>
                <FormControl_1.default fullWidth variant="standard">
                  <InputLabel_1.default id="category-select-label">Categories</InputLabel_1.default>
                  <Select_1.default labelId="category-label" id="category-select" name="category" value={category} label="Categories" onChange={handleChangeCategory} defaultValue="Categories">
                    {data.getCategory.map((category) => (<MenuItem_1.default key={category._id} value={category._id}>
                        {category.categoryName}
                      </MenuItem_1.default>))}
                  </Select_1.default>
                </FormControl_1.default>
              </Grid_1.default>

              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default required id="price" name="price" label="Price" type="number" fullWidth autoComplete="given-name" variant="standard" onChange={handleChange}/>
              </Grid_1.default>
              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default id="cost" name="cost" label="Cost" type="number" fullWidth autoComplete="family-name" variant="standard" onChange={handleChange}/>
              </Grid_1.default>

              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default id="sku" name="sku" label="SKU" fullWidth autoComplete="given-name" variant="standard" onChange={handleChange}/>
              </Grid_1.default>
              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default id="barcode" name="barcode" label="Barcode" fullWidth autoComplete="family-name" variant="standard" onChange={handleChange}/>
              </Grid_1.default>
            </Grid_1.default>

            <Grid_1.default item xs={12} sm={6} marginTop={3}>
              <material_1.Divider>
                <FormLabel_1.default component="legend">Inventory</FormLabel_1.default>
              </material_1.Divider>
            </Grid_1.default>
            <Grid_1.default container spacing={3}>
              <Grid_1.default item xs={12} sm={6}>
                <TextField_1.default id="stock" name="stock" label="Stock" type="number" fullWidth autoComplete="family-name" variant="standard" onChange={handleChange}/>
              </Grid_1.default>

              <Grid_1.default item marginTop={2}>
                <FormControlLabel_1.default value="start" control={<Switch_1.default color="primary" defaultChecked/>} label="Track Inventory" labelPlacement="start"/>
              </Grid_1.default>
            </Grid_1.default>

            <Grid_1.default item xs={12} sm={12} marginTop={2}>
              <Button_1.default variant="contained" component="label" fullWidth>
                Upload Image&nbsp;
                <input type="file" onChange={handleUploadChange}/>
              </Button_1.default>
            </Grid_1.default>

            <Grid_1.default item xs={12} sm={12} marginTop={2}>
              <Button_1.default type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
                Create Item
              </Button_1.default>
            </Grid_1.default>
          </Box_1.default>
        </Box_1.default>
      </styles_1.ThemeProvider>
    </>);
}
exports.default = CreateItem;
