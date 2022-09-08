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
  REMOVE_FROM_CART,
} from "../graphql/mutation/cartMutation";
import { GET_CART } from "../graphql/query/cartQuery";
import { GET_TOTAL } from "../graphql/query/cartQuery";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";

import { PaymentContext } from "../context/paymentContext";
import Skeleton from "@mui/material/Skeleton";

export default function PosItems({ items }: any) {
  const theme = useTheme();
  const imageSize = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useContext(AuthContext);
  const { addTotal } = useContext(PaymentContext);

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
    itemId: string,
    item: string,
    quantity: number,
    price: number
  ) {
    return { itemId, item, quantity, price };
  }

  //map through cart items and create data for table
  let cartItems: never[] = [];
  if (!cartLoading && !cartError) {
    cartItems = cartData.getCart.items
      .map((item: any) => {
        return createData(item.itemId, item.item, item.quantity, item.price);
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

  useEffect(() => {
    if (!loadingTotal && !errorTotal) {
      addTotal(dataTotal.getTotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingTotal, errorTotal, dataTotal]);

  function handleAddToCart(id: any) {
    addToCart({ variables: { cartInput: id } });
    addTotal(dataTotal.getTotal);
  }

  function handleRemoveFromCart(id: any) {
    removeFromCart({ variables: { cartInput: id } });
    addTotal(dataTotal.getTotal);
  }

  if (items.length === 0) {
    return <ProgressBar />;
  }
  return (
    <Box>
      <ImageList
        sx={{
          width: { sm: 500, md: 700, lg: 800 },
          height: { sm: 1000, md: 600, lg: 500 },
        }}
        cols={6}
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
                .filter((cartItem: any) => cartItem.itemId === item._id)
                .map((cartItem: any) => (
                  <Grid
                    container
                    justifyContent="center"
                    spacing={1}
                    key={cartItem.itemId}
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