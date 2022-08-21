import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { GET_CATEGORIES } from "../graphql/query/CategoryQuery";
import { useQuery } from "@apollo/client";
import ProgressBar from "../components/ProgressBar";

export default function ProductTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <ProgressBar />;

  function createData(_id: string, categoryName: string) {
    return { _id, categoryName };
  }

  const categories = data.getCategory.map((category: any) => {
    return createData(category._id, category.categoryName);
  });

  return (
    <Box sx={{ maxWidth: { xs: 600, sm: 1000, md:1500, lg: 1500} }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant = "scrollable"
        scrollButtons="auto"
        aria-label=""
      >
        {categories.map((row: any) => (
          <Tab key={row._id} label={row.categoryName} />
        ))}
      </Tabs>
    </Box>
  );
}
