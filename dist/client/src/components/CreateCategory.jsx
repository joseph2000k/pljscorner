"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
    return (<styles_1.ThemeProvider theme={theme}>
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
          Create Category
        </Typography_1.default>
        <Box_1.default sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "cent",
            marginTop: 1,
        }}>
          <Grid_1.default item xs={12} sm={12}>
            <TextField_1.default required id="itemName" name="categoryName" label="Category Name" fullWidth autoComplete="given-name" variant="standard" onChange={handleChange}/>
          </Grid_1.default>

          <Grid_1.default item xs={12} sm={12} marginTop={2}>
            <Button_1.default type="submit" fullWidth variant="contained" color="primary">
              Create Category
            </Button_1.default>
          </Grid_1.default>
        </Box_1.default>
      </Box_1.default>
    </styles_1.ThemeProvider>);
}
exports.default = CreateCategory;
