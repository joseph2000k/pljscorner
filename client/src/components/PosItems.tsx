import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ProgressBar from "./ProgressBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function PosItems({ items: items }: any) {
  console.log(items);

  if (items.length === 0) {
    return <ProgressBar />;
  }

  return (
    <ImageList sx={{ width: 350, height: 300 }} cols={3} rowHeight={25}>
      {items.map((item: any) => (
        <ImageListItem key={item._id}>
          <img src={`images/${item.image}`} alt={item.name} />

          <ImageListItemBar position="below" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
