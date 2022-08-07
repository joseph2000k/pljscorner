import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemTable from '../components/ItemTable';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {GET_CATEGORIES} from '../graphql/query/CategoryQuery';
import ProgressBar from '../components/ProgressBar';



function Items(){

  const [category, setCategory] = useState('All Items');

  //if all items is selected, find all items

  //if a category is selected, find all items in that category

  //Pass category to ItemTable

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <ProgressBar />;
  if (error) return <p>Something Went Wrong...</p>;

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

    return (
      <>
      {!loading && !error && (
        <Container>
        <Box sx={
          {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
          }
        }>
      <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", maxWidth: '100%', marginBottom: 2}}>
        <Box>
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          
          Items
          </Typography>
          </Box>
          <Box sx={{width: 200}}>
          <FormControl fullWidth>
  <InputLabel id="category-select-label">Categories</InputLabel>
  <Select
    labelId="category-label"
    id="category-select"
    value={category}
    label="Categories"
    onChange={handleChange}
    defaultValue="All Items"
  >
    <MenuItem value="All Items">All Items</MenuItem>
     {
      data.getCategory.map((category: any) => (
        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
      ))
     }
  </Select>
</FormControl>
</Box>
          </Box>
          
        <ItemTable />
      </div>
      </Box>
      </Container>
      )}
      </>
    );
  }
  
  export default Items