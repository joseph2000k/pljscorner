import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import Avatar from '@mui/material/Avatar';
import {ThemeProvider, useTheme} from '@mui/material/styles';
import { useQuery } from '@apollo/client';

import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';


import {GET_CATEGORIES} from '../graphql/query/CategoryQuery';
import ProgressBar from '../components/ProgressBar';


export default function CreateItem() {

    const [category, setCategory] = useState('');

    const { loading, error, data } = useQuery(GET_CATEGORIES);

    const theme = useTheme();

    if (loading) return <ProgressBar />;
  if (error) return <p>Something Went Wrong...</p>;

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

    return(
        <>
        <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CreateIcon />
          </Avatar>
        <Typography id="transition-modal-title" variant="h5" component="h2">
              Create Item
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: 1 }}>
            <Typography variant="h6" gutterBottom>
        Item Details
      </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="itemName"
            name="itemName"
            label="Item Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={12}>
        <FormControl fullWidth variant='standard'>
        <InputLabel id="category-select-label">Categories</InputLabel>
        <Select
    labelId="category-label"
    id="category-select"
    value={category}
    label="Categories"
    onChange={handleChange}
    defaultValue="Categories"
  >
     {
      data.getCategory.map((category: any) => (
        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
      ))
     }
  </Select>
</FormControl>
  </Grid>

  <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cost"
            name="cost"
            label="Cost"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="sku"
            name="sku"
            label="SKU"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="barcode"
            name="barcode"
            label="Barcode"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        </Grid>


        <Grid item xs={12} sm={6} marginTop={3}>
        <Divider><FormLabel component="legend">Inventory</FormLabel></Divider>
        </Grid>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="stock"
            name="stock"
            label="Stock"
            fullWidth
            autoComplete="family-name"
            variant="standard"
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
          </Box>
        </Box>
        </ThemeProvider>
            </>
    )
}