import React, { useState } from "react";
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
import { ADD_ITEM } from "../graphql/mutation/addItem";
import { UPLOAD_IMAGE } from "../graphql/mutation/uploadimage";
import {
  GET_ALL_ITEMS,
  GET_ITEMS_BY_CATEGORY,
} from "../graphql/query/ItemQuery";
import ProgressBar from "../components/ProgressBar";

type Item = {
  name: string;
  price: number;
  cost: number;
  sku: string;
  stock: number;
  barcode: string;
};

export default function CreateItem({ displayedCategory }: any) {
  const [singleUpload] = useMutation(UPLOAD_IMAGE);

  const [category, setCategory] = useState("");

  const [imageName, setImageName] = useState("");

  const [file, setFile] = useState<File>();

  const { error, data } = useQuery(GET_CATEGORIES);

  const theme = useTheme();

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setImageName(file.name);
    setFile(file);
    /* singleUpload({ variables: { file } }); */
  };

  function addItemCallback() {
    addItem();
    if (file) {
      singleUpload({ variables: { file } });
    }
  }

  const { handleChange, handleSubmit, formData } = useForm(addItemCallback, {
    name: "",
    price: 0,
    cost: 0,
    sku: "",
    stock: 0,
    barcode: "",
  });

  const { name, price, cost, sku, stock, barcode } = formData as Item;

  const [addItem, { loading }] = useMutation(ADD_ITEM, {
    variables: {
      itemInput: {
        name,
        price,
        cost,
        sku,
        stock,
        barcode,
        image: imageName,
        category: category,
      },
    },
    update(cache, { data: { addItem } }) {
      const { getItems }: any = cache.readQuery({ query: GET_ALL_ITEMS });
      cache.writeQuery({
        query: GET_ALL_ITEMS,
        data: { getItems: [...getItems, addItem] },
      });

      if (displayedCategory !== "All Items") {
        const { getItemsByCategory }: any = cache.readQuery({
          query: GET_ITEMS_BY_CATEGORY,
          variables: { categoryId: category },
        });
        cache.writeQuery({
          query: GET_ITEMS_BY_CATEGORY,
          variables: { categoryId: category },
          data: { getItemsByCategory: [...getItemsByCategory, addItem] },
        });
      }
    },
    onError(err) {
      console.log(err);
    },
  });

  if (loading) return <ProgressBar />;
  if (error) return <p>Something Went Wrong...</p>;

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
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
          onSubmit={handleSubmit}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CreateIcon />
          </Avatar>
          <Typography id="transition-modal-title" variant="h5" component="h2">
            Create Item
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
                    value={category}
                    label="Categories"
                    onChange={handleChangeCategory}
                    defaultValue="Categories"
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

            <Grid item xs={12} sm={12} marginTop={2}>
              <Button variant="contained" component="label" fullWidth>
                Upload Image&nbsp;
                <input type="file" onChange={handleUploadChange} />
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} marginTop={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Create Item
              </Button>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
