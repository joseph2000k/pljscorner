import { useContext } from "react";
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
import { ADD_TO_CART } from "../graphql/mutation/cartMutation";
import { GET_CART } from "../graphql/query/cartQuery";
import { useTheme } from "@mui/material/styles";
import { useMutation} from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";

export default function PosItems({ items: items }: any) {
  const theme = useTheme();
  const imageSize = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useContext(AuthContext);


  const [addToCart, {loading}] = useMutation(ADD_TO_CART, {
    update(cache, { data: { addToCart } }) {
      cache.modify({
        id: cache.identify({userId: user.id}),  
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

  if (loading) {
    return <ProgressBar />;
  }

  function handleAddToCart(id: any) {
    addToCart({variables: { cartInput: id }});
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
            <ButtonBase onClick={()=>handleAddToCart(item._id)}>
              <Box>
                <img
                  src={`images/${item.image}`}
                  alt={item.name}
                  width={imageSize ? "50px" : "100px"}
                  height={imageSize ? "50px" : "100px"}
                />
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
  );
}
