import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ProductTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 600, sm: 1000, md:1500, lg: 1500} }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label=""
      >
        <Tab label="Washi Tapes" />
        <Tab label="Stickers" />
        <Tab label="Wooden Stamps" />
      </Tabs>
    </Box>
  );
}
