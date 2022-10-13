import * as React from "react";
import UpdateItem from "./UpdateItem";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";

//for Modal
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

import { GET_RECEIPTS } from "../graphql/query/receipt";
import { useQuery } from "@apollo/client";

export default function ItemTable({ items, from, to }: any) {
  const [itemId, setItemId] = useState("");

  //Modal Transition
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { loading, error, data, refetch } = useQuery(GET_RECEIPTS);
  if (loading) return <p>Loading...</p>;

  //Modal Style
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };

  //find the receipts that are within the date range
  const receipts = data.receipts.filter((receipt: any) => {
    const receiptDate = new Date(receipt.time);
    return receiptDate >= from && receiptDate <= to;
  });
  //filter receipts to get the items that are within the date range
  const filteredItems = receipts.map((receipt: any) => {
    return receipt.items;
  });
  //flatten the array
  const flattenedItems = filteredItems.flat();

  function createData(
    _id: string,
    name: string,
    categoryName: string,
    price: number,
    sku: number,
    stock: number,
    image: string
  ) {
    return { _id, name, categoryName, price, sku, stock, image };
  }

  const rows = items.map((item: any) => {
    return createData(
      item._id,
      item.name,
      item.category.categoryName,
      item.price,
      item.sku,
      item.stock,
      item.image
    );
  });

  return (
    <>
      <Grow in={true}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Sku</TableCell>
                <TableCell align="right">Initial Stock</TableCell>
                <TableCell align="right">Current Stock</TableCell>
                <TableCell align="right">Sold</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={`images/${row.image}`}
                      alt={row.name}
                      width="75"
                      height="75"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.categoryName}</TableCell>
                  <TableCell align="right">{row.price} Php</TableCell>
                  <TableCell align="right">{row.sku}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">
                    {
                      //find all the items that are sold in flattenedItems and sum the quantity of the item that match the row._id
                      flattenedItems
                        .filter((item: any) => item.itemId === row._id)
                        .map((item: any) => item.quantity)
                        .reduce((a: number, b: number) => a + b, 0)
                    }
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        handleOpen();
                        setItemId(row._id);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grow>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>{<UpdateItem itemId={itemId} />}</Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
