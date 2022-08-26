import React from "react";
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
import { useTheme } from "@mui/material/styles";

export default function PosItems({ items: items }: any) {
  const theme = useTheme();

  const imageSize = useMediaQuery(theme.breakpoints.down("md"));

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
            <ButtonBase>
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
