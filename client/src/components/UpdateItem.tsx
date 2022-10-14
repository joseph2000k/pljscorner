import React from "react";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utility/hooks";
import { GET_CATEGORIES } from "../graphql/query/CategoryQuery";
import { GET_ITEM_BY_ID } from "../graphql/query/ItemQuery";
import { UPDATE_ITEM } from "../graphql/mutation/addItem";
import {
  GET_ALL_ITEMS,
  GET_ITEMS_BY_CATEGORY,
} from "../graphql/query/ItemQuery";

export default function UpdateItem({ itemId, displayedCategory }: any) {
  const theme = useTheme();

  const [formData, setFormData] = React.useState({
    name: "",
    price: 0,
    cost: 0,
    sku: "",
    stock: 0,
    barcode: "",
    image: "",
    category: "",
  });

  const [category, setCategory] = useState("");

  const { error, data } = useQuery(GET_CATEGORIES);
  const {
    error: errorItem,
    data: dataItem,
    loading: loadingItem,
  } = useQuery(GET_ITEM_BY_ID, {
    variables: { itemId: itemId },
  });

  type Item = {
    name: string;
    price: number;
    cost: number;
    sku: string;
    stock: number;
    barcode: string;
    image: string;
    category: string;
  };

  useEffect(() => {
    setFormData({
      name: !dataItem?.getItem.name ? "" : dataItem?.getItem.name,
      price: !dataItem?.getItem.price ? "" : dataItem?.getItem.price,
      cost: !dataItem?.getItem.cost ? "" : dataItem?.getItem.cost,
      sku: !dataItem?.getItem.sku ? "" : dataItem?.getItem.sku,
      stock: !dataItem?.getItem.stock ? "" : dataItem?.getItem.stock,
      barcode: !dataItem?.getItem.barcode ? "" : dataItem?.getItem.barcode,
      image: !dataItem?.getItem.image ? "" : dataItem?.getItem.image,
      category: !dataItem?.getItem.category._id ? "" : dataItem?.getItem.category._id,
    });
  }, [dataItem]);

  const { name, price, cost, sku, stock, barcode, image } = formData as Item;

  console.log(category);

  const [updateItem, { loading }] = useMutation(UPDATE_ITEM, {
    variables: {
      itemId: itemId,
      itemInput: {
        category: dataItem?.getItem.category._id,
        name,
        price,
        cost,
        sku,
        barcode,
        stock,
        image
      }
    },
    update(cache, { data: { updateItem } }) {
      const { getItems }: any = cache.readQuery({ query: GET_ALL_ITEMS });
      cache.writeQuery({
        query: GET_ALL_ITEMS,
        data: { getItems: [...getItems, updateItem] },
      });

      if (displayedCategory !== "All Items") {
        const { getItemsByCategory }: any = cache.readQuery({
          query: GET_ITEMS_BY_CATEGORY,
          variables: { categoryId: category },
        });
        cache.writeQuery({
          query: GET_ITEMS_BY_CATEGORY,
          variables: { categoryId: category },
          data: { getItemsByCategory: [...getItemsByCategory, updateItem] },
        });
      }
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  if (error) return <p>Something Went Wrong...</p>;

  if (loadingItem || loading) return <div>Loading...</div>;

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem();
    console.log(dataItem.getItem.category._id)
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleUpdateItem}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CreateIcon />
          </Avatar>
          <Typography id="transition-modal-title" variant="h5" component="h2">
            Update Item
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              marginTop: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Item Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="itemName"
                  name="name"
                  label="Item Name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="category-select-label">Categories</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    name="category"
                    value={dataItem.getItem.category._id}
                    label="Categories"
                    onChange={handleChangeCategory}
                    //defaultValue={}
                  >
                    {data.getCategory.map((category: any) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="cost"
                  name="cost"
                  label="Cost"
                  type="number"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={cost}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="sku"
                  name="sku"
                  label="SKU"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={sku}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="barcode"
                  name="barcode"
                  label="Barcode"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={barcode}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} marginTop={3}>
              <Divider>
                <FormLabel component="legend">Inventory</FormLabel>
              </Divider>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="stock"
                  name="stock"
                  label="Stock"
                  type="number"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={stock}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item marginTop={2}>
                <FormControlLabel
                  value="start"
                  control={<Switch color="primary" defaultChecked />}
                  label="Track Inventory"
                  labelPlacement="start"
                />
              </Grid>
            </Grid>

            {/* <Grid item xs={12} sm={12} marginTop={2}>
              <Button variant="contained" component="label" fullWidth>
                Upload Image&nbsp;
                <input type="file" onChange={handleUploadChange} />
              </Button>
            </Grid> */}

            <Grid item xs={12} sm={12} marginTop={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                //disabled={loading}
              >
                Update Item
              </Button>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
