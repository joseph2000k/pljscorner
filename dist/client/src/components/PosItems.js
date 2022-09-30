"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ImageList_1 = __importDefault(require("@mui/material/ImageList"));
const ImageListItem_1 = __importDefault(require("@mui/material/ImageListItem"));
const ImageListItemBar_1 = __importDefault(require("@mui/material/ImageListItemBar"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const ButtonBase_1 = __importDefault(require("@mui/material/ButtonBase"));
const useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
const cartMutation_1 = require("../graphql/mutation/cartMutation");
const cartQuery_1 = require("../graphql/query/cartQuery");
const styles_1 = require("@mui/material/styles");
const react_hooks_1 = require("@apollo/react-hooks");
const authContext_1 = require("../context/authContext");
const paymentContext_1 = require("../context/paymentContext");
const Skeleton_1 = __importDefault(require("@mui/material/Skeleton"));
function PosItems({ items, discountedItems }) {
    var _a, _b;
    const theme = (0, styles_1.useTheme)();
    const imageSize = (0, useMediaQuery_1.default)(theme.breakpoints.down("md"));
    const { user } = (0, react_1.useContext)(authContext_1.AuthContext);
    const { addTotal, addNumberOfItems } = (0, react_1.useContext)(paymentContext_1.PaymentContext);
    //map discounteditems.items and display _id, price, and image
    const discountedItemsMap = (_b = (_a = discountedItems[0]) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.map((item) => item);
    const { data: cartData, loading: cartLoading, error: cartError, } = (0, react_hooks_1.useQuery)(cartQuery_1.GET_CART, {
        variables: {
            userId: user.id,
        },
    });
    function createData(_id, itemId, item, quantity, price, discount) {
        return { _id, itemId, item, quantity, price, discount };
    }
    //map through cart items and create data for table
    let cartItems = [];
    if (!cartLoading && !cartError) {
        cartItems = cartData.getCart.items
            .map((item) => {
            return createData(item._id, item.itemId, item.item, item.quantity, item.price, item.discount);
        })
            .reverse();
    }
    const [addToCart, { loading }] = (0, react_hooks_1.useMutation)(cartMutation_1.ADD_TO_CART, {
        update(cache, { data: { addToCart } }) {
            cache.modify({
                id: cache.identify({ userId: user.id }),
                fields: {
                    items(existingItems = []) {
                        const newItemRef = cache.writeFragment({
                            data: addToCart,
                            fragment: cartQuery_1.GET_CART,
                        });
                        return [...existingItems, newItemRef];
                    },
                },
            });
        },
    });
    const [addDiscountedItemToCart, { loading: addDiscountedItemToCartLoading }] = (0, react_hooks_1.useMutation)(cartMutation_1.ADD_TO_CART_WITH_DISCOUNT, {
        update(cache, { data: { addDiscountedItemToCart } }) {
            cache.modify({
                id: cache.identify({ userId: user.id }),
                fields: {
                    items(existingItems = []) {
                        const newItemRef = cache.writeFragment({
                            data: addDiscountedItemToCart,
                            fragment: cartQuery_1.GET_CART,
                        });
                        return [...existingItems, newItemRef];
                    },
                },
            });
        },
    });
    const [removeFromCart, { loading: removeFromCartLoading }] = (0, react_hooks_1.useMutation)(cartMutation_1.REMOVE_FROM_CART, {
        update(cache, { data: { removeFromCart } }) {
            cache.modify({
                id: cache.identify({ userId: user.id }),
                fields: {
                    items(existingItems = []) {
                        const newItemRef = cache.writeFragment({
                            data: removeFromCart,
                            fragment: cartQuery_1.GET_CART,
                        });
                        return [...existingItems, newItemRef];
                    },
                },
            });
        },
    });
    const [removeFromCartDiscount, { loading: removeFromCartDiscountLoading }] = (0, react_hooks_1.useMutation)(cartMutation_1.REMOVE_FROM_CART_WITH_DISCOUNT, {
        update(cache, { data: { removeFromCartDiscount } }) {
            cache.modify({
                id: cache.identify({ userId: user.id }),
                fields: {
                    items(existingItems = []) {
                        const newItemRef = cache.writeFragment({
                            data: removeFromCartDiscount,
                            fragment: cartQuery_1.GET_CART,
                        });
                        return [...existingItems, newItemRef];
                    },
                },
            });
        },
    });
    const { loading: loadingTotal, error: errorTotal, data: dataTotal, refetch: refetchTotal, } = (0, react_hooks_1.useQuery)(cartQuery_1.GET_TOTAL);
    refetchTotal();
    const { loading: loadingNumberOfItems, error: errorNumberOfItems, data: dataNumberOfItems, refetch: refetchNumberOfItems, } = (0, react_hooks_1.useQuery)(cartQuery_1.NO_OF_ITEMS);
    refetchNumberOfItems();
    (0, react_1.useEffect)(() => {
        if (!loadingTotal &&
            !errorTotal &&
            !loadingNumberOfItems &&
            !errorNumberOfItems) {
            addTotal(dataTotal.getTotal);
            addNumberOfItems(dataNumberOfItems.numberOfItemsInCart);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        loadingTotal,
        errorTotal,
        dataTotal,
        loadingNumberOfItems,
        errorNumberOfItems,
        dataNumberOfItems,
    ]);
    function handleAddToCart(id) {
        addToCart({ variables: { cartInput: id } });
        addTotal(dataTotal.getTotal);
        addNumberOfItems(dataNumberOfItems.numberOfItemsInCart);
    }
    function handleAddToCartWithDiscount(id) {
        addDiscountedItemToCart({ variables: { item: id } });
        addTotal(dataTotal.getTotal);
        addNumberOfItems(dataNumberOfItems.numberOfItemsInCart);
    }
    function handleRemoveFromCart(id) {
        removeFromCart({ variables: { cartInput: id } });
        addTotal(dataTotal.getTotal);
        addNumberOfItems(dataNumberOfItems.numberOfItemsInCart);
    }
    function handleRemoveFromCartDiscount(id) {
        removeFromCartDiscount({ variables: { cartInput: id } });
        addTotal(dataTotal.getTotal);
        addNumberOfItems(dataNumberOfItems.numberOfItemsInCart);
    }
    return discountedItems.length > 0 ? ((0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(ImageList_1.default, Object.assign({ sx: {
                width: { sm: 500, md: 800, lg: 1100 },
                height: { sm: 1000, md: 500, lg: 600 },
            }, cols: 8, rowHeight: "auto" }, { children: discountedItemsMap.map((item) => ((0, jsx_runtime_1.jsxs)(ImageListItem_1.default, { children: [(0, jsx_runtime_1.jsx)(ButtonBase_1.default, Object.assign({ onClick: () => handleAddToCartWithDiscount(item._id), disabled: addDiscountedItemToCartLoading || removeFromCartLoading, disableRipple: true }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [loading ? ((0, jsx_runtime_1.jsx)(Skeleton_1.default, { variant: "rectangular", width: imageSize ? "50px" : "100px", height: imageSize ? "50px" : "100px" })) : ((0, jsx_runtime_1.jsx)("img", { src: `images/${item.image}`, alt: item.name, width: imageSize ? "50px" : "100px", height: imageSize ? "50px" : "100px" })), (0, jsx_runtime_1.jsx)(ImageListItemBar_1.default, { title: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ fontSize: ".7rem" }, { children: item.name })), subtitle: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ fontSize: ".7rem" }, { children: "3 for 100" })), position: "below" })] }) })), 
                    //show quantity if item is in cart
                    cartItems
                        .filter((cartItem) => cartItem.itemId === item._id &&
                        cartItem.discount.length !== 0)
                        .map((cartItem) => ((0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ container: true, justifyContent: "center", spacing: 1, maxHeight: "8px" }, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ fontSize: ".7rem", sx: { textAlign: "center" } }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ variant: "outlined", size: "small", onClick: () => handleRemoveFromCartDiscount(item._id), disabled: loading || removeFromCartLoading }, { children: "Remove One" })) })) }) }), cartItem._id)))] }, item._id))) })) })) : ((0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(ImageList_1.default, Object.assign({ sx: {
                width: { sm: 500, md: 800, lg: 1100 },
                height: { sm: 1000, md: 500, lg: 600 },
            }, cols: 8, rowHeight: "auto" }, { children: items.map((item) => ((0, jsx_runtime_1.jsxs)(ImageListItem_1.default, { children: [(0, jsx_runtime_1.jsx)(ButtonBase_1.default, Object.assign({ onClick: () => handleAddToCart(item._id), disabled: loading || removeFromCartLoading, disableRipple: true }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [loading ? ((0, jsx_runtime_1.jsx)(Skeleton_1.default, { variant: "rectangular", width: imageSize ? "50px" : "100px", height: imageSize ? "50px" : "100px" })) : ((0, jsx_runtime_1.jsx)("img", { src: `images/${item.image}`, alt: item.name, width: imageSize ? "50px" : "100px", height: imageSize ? "50px" : "100px" })), (0, jsx_runtime_1.jsx)(ImageListItemBar_1.default, { title: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ fontSize: ".7rem" }, { children: item.name })), subtitle: (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ fontSize: ".7rem" }, { children: [item.price, " Php"] })), position: "below" })] }) })), 
                    //show quantity if item is in cart
                    cartItems
                        .filter((cartItem) => cartItem.itemId === item._id &&
                        cartItem.discount.length === 0)
                        .map((cartItem) => ((0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ container: true, justifyContent: "center", spacing: 1 }, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, { children: (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ fontSize: ".7rem", sx: { textAlign: "center" } }, { children: [cartItem.quantity, "pcs in cart", (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ variant: "outlined", size: "small", onClick: () => handleRemoveFromCart(item._id), disabled: loading || removeFromCartLoading }, { children: "Remove One" }))] })) }) }), cartItem._id)))] }, item._id))) })) }));
}
exports.default = PosItems;
