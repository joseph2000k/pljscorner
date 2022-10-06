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
const React = __importStar(require("react"));
const react_1 = require("react");
const Tabs_1 = __importDefault(require("@mui/material/Tabs"));
const Tab_1 = __importDefault(require("@mui/material/Tab"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const CategoryQuery_1 = require("../graphql/query/CategoryQuery");
const smdiscount_1 = require("../graphql/query/smdiscount");
const client_1 = require("@apollo/client");
const ProgressBar_1 = __importDefault(require("./ProgressBar"));
const ItemQuery_1 = require("../graphql/query/ItemQuery");
const PosItems_1 = __importDefault(require("./PosItems"));
function Products() {
    const [value, setValue] = (0, react_1.useState)(0);
    const [categoryId, setCategoryId] = (0, react_1.useState)("All Items");
    const { loading, error, data } = (0, client_1.useQuery)(CategoryQuery_1.GET_CATEGORIES);
    const getDiscount = (0, client_1.useQuery)(smdiscount_1.GET_DISCOUNT);
    const getItems = (0, client_1.useQuery)(ItemQuery_1.GET_ALL_ITEMS);
    const getItemsByCategory = (0, client_1.useQuery)(ItemQuery_1.GET_ITEMS_BY_CATEGORY, {
        variables: {
            categoryId: categoryId,
        },
    });
    if (getDiscount.loading)
        return <ProgressBar_1.default />;
    if (loading)
        return <ProgressBar_1.default />;
    function createData(_id, categoryName) {
        return { _id, categoryName };
    }
    let items = [];
    if (categoryId === "All Items" && !getItems.loading && !getItems.error) {
        items = getItems.data.getItems;
    }
    else if (!getItemsByCategory.loading && !getItemsByCategory.error) {
        items = getItemsByCategory.data.getItemsByCategory;
    }
    let discountedItems = [];
    if (categoryId === "Buy 3 for 100" &&
        !getDiscount.loading &&
        !getDiscount.error) {
        discountedItems = getDiscount.data.getSMDiscounts;
    }
    console.log(discountedItems);
    const categories = data.getCategory.map((category) => {
        return createData(category._id, category.categoryName);
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            setCategoryId("All Items");
        }
        else if (newValue !== categories.length + 1) {
            setCategoryId(categories[newValue - 1]._id);
        }
        else if (newValue === categories.length + 1) {
            setCategoryId("Buy 3 for 100");
        }
    };
    return (<>
      <Box_1.default sx={{ maxWidth: { xs: 600, sm: 1000, md: 1500, lg: 1500 } }}>
        <Tabs_1.default value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="">
          <Tab_1.default label="All Items"/>
          {categories.map((row) => (<Tab_1.default key={row._id} label={row.categoryName}/>))}
          <Tab_1.default label="Buy 3 for 100"/>
        </Tabs_1.default>
      </Box_1.default>
      <Box_1.default>
        <PosItems_1.default items={items} discountedItems={discountedItems}/>
      </Box_1.default>
    </>);
}
exports.default = Products;
