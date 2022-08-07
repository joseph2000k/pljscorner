import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemTable from '../components/ItemTable';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



function Items(){
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

    return (
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
  <InputLabel id="demo-simple-select-label">Categories</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Categories"
    onChange={handleChange}
  >
    <MenuItem value={10}>All Items</MenuItem>
    <MenuItem value={20}>Categories</MenuItem>
  </Select>
</FormControl>
</Box>
          </Box>
        <ItemTable />
      </div>
      </Box>
      </Container>
    );
  }
  
  export default Items