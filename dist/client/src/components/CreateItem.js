"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
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
        return (0, jsx_runtime_1.jsx)(ProgressBar_1.default, {});
    if (error)
        return (0, jsx_runtime_1.jsx)("p", { children: "Something Went Wrong..." });
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(styles_1.ThemeProvider, Object.assign({ theme: theme }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ component: "form", sx: {
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }, onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.default, Object.assign({ sx: { m: 1, bgcolor: "secondary.main" } }, { children: (0, jsx_runtime_1.jsx)(Create_1.default, {}) })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ id: "transition-modal-title", variant: "h5", component: "h2" }, { children: "Create Item" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            marginTop: 1,
                        } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h6", gutterBottom: true }, { children: "Item Details" })), (0, jsx_runtime_1.jsxs)(Grid_1.default, Object.assign({ container: true, spacing: 3 }, { children: [(0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 12 }, { children: (0, jsx_runtime_1.jsx)(TextField_1.default, { required: true, id: "itemName", name: "name", label: "Item Name", fullWidth: true, autoComplete: "given-name", variant: "standard", onChange: handleChange }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 12 }, { children: (0, jsx_runtime_1.jsxs)(FormControl_1.default, Object.assign({ fullWidth: true, variant: "standard" }, { children: [(0, jsx_runtime_1.jsx)(InputLabel_1.default, Object.assign({ id: "category-select-label" }, { children: "Categories" })), (0, jsx_runtime_1.jsx)(Select_1.default, Object.assign({ labelId: "category-label", id: "category-select", name: "category", value: category, label: "Categories", onChange: handleChangeCategory, defaultValue: "Categories" }, { children: data.getCategory.map((category) => ((0, jsx_runtime_1.jsx)(MenuItem_1.default, Object.assign({ value: category._id }, { children: category.categoryName }), category._id))) }))] })) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 6 }, { children: (0, jsx_runtime_1.jsx)(TextField_1.default, { required: true, id: "price", name: "price", label: "Price", type: "number", fullWidth: true, autoComplete: "given-name", variant: "standard", onChange: handleChange }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 6 }, { children: (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "cost", name: "cost", label: "Cost", type: "number", fullWidth: true, autoComplete: "family-name", variant: "standard", onChange: handleChange }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 6 }, { children: (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "sku", name: "sku", label: "SKU", fullWidth: true, autoComplete: "given-name", variant: "standard", onChange: handleChange }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 6 }, { children: (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "barcode", name: "barcode", label: "Barcode", fullWidth: true, autoComplete: "family-name", variant: "standard", onChange: handleChange }) }))] })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 6, marginTop: 3 }, { children: (0, jsx_runtime_1.jsx)(material_1.Divider, { children: (0, jsx_runtime_1.jsx)(FormLabel_1.default, Object.assign({ component: "legend" }, { children: "Inventory" })) }) })), (0, jsx_runtime_1.jsxs)(Grid_1.default, Object.assign({ container: true, spacing: 3 }, { children: [(0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 6 }, { children: (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "stock", name: "stock", label: "Stock", type: "number", fullWidth: true, autoComplete: "family-name", variant: "standard", onChange: handleChange }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, marginTop: 2 }, { children: (0, jsx_runtime_1.jsx)(FormControlLabel_1.default, { value: "start", control: (0, jsx_runtime_1.jsx)(Switch_1.default, { color: "primary", defaultChecked: true }), label: "Track Inventory", labelPlacement: "start" }) }))] })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 12, marginTop: 2 }, { children: (0, jsx_runtime_1.jsxs)(Button_1.default, Object.assign({ variant: "contained", component: "label", fullWidth: true }, { children: ["Upload Image\u00A0", (0, jsx_runtime_1.jsx)("input", { type: "file", onChange: handleUploadChange })] })) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 12, marginTop: 2 }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: loading }, { children: "Create Item" })) }))] }))] })) })) }));
}
exports.default = CreateItem;
