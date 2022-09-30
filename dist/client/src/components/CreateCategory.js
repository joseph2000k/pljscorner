"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const Create_1 = __importDefault(require("@mui/icons-material/Create"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const hooks_1 = require("../utility/hooks");
const CategoryQuery_1 = require("../graphql/query/CategoryQuery");
const categoryMutation_1 = require("../graphql/mutation/categoryMutation");
const react_hooks_1 = require("@apollo/react-hooks");
function CreateCategory() {
    function addCategoryCallback() {
        addCategory();
    }
    const { handleChange, handleSubmit, formData } = (0, hooks_1.useForm)(addCategoryCallback, {
        categoryName: "",
    });
    const { categoryName } = formData;
    const [addCategory, { loading }] = (0, react_hooks_1.useMutation)(categoryMutation_1.CREATE_CATEGORY, {
        variables: {
            categoryInput: {
                categoryName,
            },
        },
        update(cache, { data: { addCategory } }) {
            const { getCategory } = cache.readQuery({ query: CategoryQuery_1.GET_CATEGORIES });
            cache.writeQuery({
                query: CategoryQuery_1.GET_CATEGORIES,
                data: {
                    getCategory: [...getCategory, addCategory],
                },
            });
        },
        onError(err) {
            console.log(err);
        },
    });
    const theme = (0, styles_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(styles_1.ThemeProvider, Object.assign({ theme: theme }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ component: "form", sx: {
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }, onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.default, Object.assign({ sx: { m: 1, bgcolor: "secondary.main" } }, { children: (0, jsx_runtime_1.jsx)(Create_1.default, {}) })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ id: "transition-modal-title", variant: "h5", component: "h2" }, { children: "Create Category" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "cent",
                        marginTop: 1,
                    } }, { children: [(0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 12 }, { children: (0, jsx_runtime_1.jsx)(TextField_1.default, { required: true, id: "itemName", name: "categoryName", label: "Category Name", fullWidth: true, autoComplete: "given-name", variant: "standard", onChange: handleChange }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 12, marginTop: 2 }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ type: "submit", fullWidth: true, variant: "contained", color: "primary" }, { children: "Create Category" })) }))] }))] })) })));
}
exports.default = CreateCategory;
