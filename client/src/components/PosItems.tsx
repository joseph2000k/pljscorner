import { useContext, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ProgressBar from "./ProgressBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typograhpy from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ADD_TO_CART,
  ADD_TO_CART_WITH_DISCOUNT,
  REMOVE_FROM_CART,
} from "../graphql/mutation/cartMutation";
import { GET_CART, GET_TOTAL, NO_OF_ITEMS } from "../graphql/query/cartQuery";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";

import { PaymentContext } from "../context/paymentContext";
import Skeleton from "@mui/material/Skeleton";

export default function PosItems({ items, discountedItems }: any) {
  const theme = useTheme();
  const imageSize = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useContext(AuthContext);
  const { addTotal, addNumberOfItems } = useContext(PaymentContext);

  //map discounteditems.items and display _id, price, and image
  const discountedItemsMap = discountedItems[0]?.items?.map(
    (item: any) => item
  );
  console.log(discountedItemsMap);

  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useQuery(GET_CART, {
    variables: {
      userId: user.id,
    },
  });

  function createData(
    _id: string,
    itemId: string,
    item: string,
    quantity: number,
    price: number,
    discount: string
  ) {
    return { _id, itemId, item, quantity, price, discount };
  }

  //map through cart items and create data for table
  let cartItems: never[] = [];
  if (!cartLoading && !cartError) {
    cartItems = cartData.getCart.items
      .map((item: any) => {
        return createData(
          item._id,
          item.itemId,
          item.item,
          item.quantity,
          item.price,
          item.discount
        );
      })
      .reverse();
  }

  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    update(cache, { data: { addToCart } }) {
      cache.modify({
        id: cache.identify({ userId: user.id }),
        fields: {
          items(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: addToCart,
              fragment: GET_CART,
            });
            return [...existingItems, newItemRef];
          },
        },
      });
    },
  });

  const [addDiscountedItemToCart, { loading: addDiscountedItemToCartLoading }] =
    useMutation(ADD_TO_CART_WITH_DISCOUNT, {
      update(cache, { data: { addDiscountedItemToCart } }) {
        cache.modify({
          id: cache.identify({ userId: user.id }),
          fields: {
            items(existingItems = []) {
              const newItemRef = cache.writeFragment({
                data: addDiscountedItemToCart,
                fragment: GET_CART,
              });
              return [...existingItems, newItemRef];
            },
          },
        });
      },
    });

  const [removeFromCart, { loading: removeFromCartLoading }] = useMutation(
    REMOVE_FROM_CART,
    {
      update(cache, { data: { removeFromCart } }) {
        cache.modify({
          id: cache.identify({ userId: user.id }),
          fields: {
            items(existingItems = []) {
              const newItemRef = cache.writeFragment({
                data: removeFromCart,
                fragment: GET_CART,
              });
              return [...existingItems, newItemRef];
            },
          },
        });
      },
    }
  );

  const {
    loading: loadingTotal,
    error: errorTotal,
    data: dataTotal,
    refetch: refetchTotal,
  } = useQuery(GET_TOTAL);

  refetchTotal();

  const {
    loading: loadingNumberOfItems,
    error: errorNumberOfItems,
    data: dataNumberOfItems,
    refetch: refetchNumberOfItems,
  } = useQuery(NO_OF_ITEMS);

  refetchNumberOfItems();

  useEffect(() => {
    if (
      !loadingTotal &&
      !errorTotal &&
      !loadingNumberOfItems &&
      !errorNumberOfItems
    ) {
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

  function handleAddToCart(id: any) {
    addToCart({ variables: { cartInput: id } });
    addTotal(dataTotal.getTotal);
    addNumberOfItems(dataNumberOfItems.numberOfItemsInCart);
  }

  function handleAddToCartWithDiscount(id: any) {
    addDiscountedItemToCart({ variables: { item: id } });
    addTotal(dataTotal.getTotal);
    addNumberOfItems(dataNumberOfItems.numberOfItemsInCart);
  }

  function handleRemoveFromCart(id: any) {
    removeFromCart({ variables: { cartInput: id } });
    addTotal(dataTotal.getTotal);
    addNumberOfItems(dataNumberOfItems.numberOfItemsInCart);
  }

  return discountedItems.length > 0 ? (
    <Box>
      <ImageList
        sx={{
          width: { sm: 500, md: 800, lg: 1100 },
          height: { sm: 1000, md: 500, lg: 600 },
        }}
        cols={8}
        rowHeight="auto"
      >
        {discountedItemsMap.map((item: any) => (
          <ImageListItem key={item._id}>
            <ButtonBase
              onClick={() => handleAddToCartWithDiscount(item._id)}
              disabled={addDiscountedItemToCartLoading || removeFromCartLoading}
              disableRipple
            >
              <Box>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width={imageSize ? "50px" : "100px"}
                    height={imageSize ? "50px" : "100px"}
                  />
                ) : (
                  <img
                    src={`images/${item.image}`}
                    alt={item.name}
                    width={imageSize ? "50px" : "100px"}
                    height={imageSize ? "50px" : "100px"}
                  />
                )}
                <ImageListItemBar
                  title={<Typograhpy fontSize=".7rem">{item.name}</Typograhpy>}
                  subtitle={
                    <Typograhpy fontSize=".7rem">{item.price} Php</Typograhpy>
                  }
                  position="below"
                />
              </Box>
            </ButtonBase>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  ) : (
    <Box>
      <ImageList
        sx={{
          width: { sm: 500, md: 800, lg: 1100 },
          height: { sm: 1000, md: 500, lg: 600 },
        }}
        cols={8}
        rowHeight="auto"
      >
        {items.map((item: any) => (
          <ImageListItem key={item._id}>
            <ButtonBase
              onClick={() => handleAddToCart(item._id)}
              disabled={loading || removeFromCartLoading}
              disableRipple
            >
              <Box>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width={imageSize ? "50px" : "100px"}
                    height={imageSize ? "50px" : "100px"}
                  />
                ) : (
                  <img
                    src={`images/${item.image}`}
                    alt={item.name}
                    width={imageSize ? "50px" : "100px"}
                    height={imageSize ? "50px" : "100px"}
                  />
                )}
                <ImageListItemBar
                  title={<Typograhpy fontSize=".7rem">{item.name}</Typograhpy>}
                  subtitle={
                    <Typograhpy fontSize=".7rem">{item.price} Php</Typograhpy>
                  }
                  position="below"
                />
              </Box>
            </ButtonBase>
            {
              //show quantity if item is in cart
              cartItems
                .filter(
                  (cartItem: any) =>
                    cartItem.itemId === item._id &&
                    cartItem.discount.length === 0
                )
                .map((cartItem: any) => (
                  <Grid
                    container
                    justifyContent="center"
                    spacing={1}
                    key={cartItem._id}
                  >
                    <Grid>
                      <Typograhpy fontSize=".7rem" sx={{ textAlign: "center" }}>
                        {cartItem.quantity}pcs in cart
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleRemoveFromCart(item._id)}
                          disabled={loading || removeFromCartLoading}
                        >
                          Remove One
                        </Button>
                      </Typograhpy>
                    </Grid>
                  </Grid>
                ))
            }
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
