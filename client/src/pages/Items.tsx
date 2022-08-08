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
import { GET_ALL_ITEMS, GET_ITEMS_BY_CATEGORY } from '../graphql/query/ItemQuery';
import ProgressBar from '../components/ProgressBar';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';



function Items(){

  const [category, setCategory] = useState('All Items');

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const getItems = useQuery(GET_ALL_ITEMS);
  const getItemsByCategory = useQuery(GET_ITEMS_BY_CATEGORY, {
    variables: {
      categoryId: category
    }
  });

 let items = [];
  if(category === 'All Items' && !getItems.loading && !getItems.error){
    items = getItems.data.getItems;
  } else if(!getItemsByCategory.loading && !getItemsByCategory.error){
    items = getItemsByCategory.data.getItemsByCategory;
  }

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
          
      {
        <ItemTable items = {items}/>
      }
      </div>
      
      </Box>
      
      </Container>
      )}
      <Box sx={{ 
          position: 'fixed',
          bottom: 0,
          right: '1%',
          zIndex: 'modal', }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 16, right: 20 }}
        icon={<SpeedDialIcon />}
      >
      </SpeedDial>
    </Box>
      
      </>
    );
  }
  
  export default Items