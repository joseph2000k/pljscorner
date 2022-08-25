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
    <ImageList sx={{ maxHeight: "100px" }}>
      {items.map((item: any) => (
        <ImageListItem key={item._id}>
          <img
            src={`images/${item.image}`}
            alt={item.name}
            width="75"
            height="75"
          />

          <ImageListItemBar position="below" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
