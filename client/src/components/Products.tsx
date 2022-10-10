import * as React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { GET_CATEGORIES } from "../graphql/query/CategoryQuery";
import { GET_DISCOUNT } from "../graphql/query/smdiscount";
import { useQuery } from "@apollo/client";
import ProgressBar from "./ProgressBar";
import {
  GET_ALL_ITEMS,
  GET_ITEMS_BY_CATEGORY,
} from "../graphql/query/ItemQuery";
import PosItems from "./PosItems";

export default function Products() {
  const [value, setValue] = useState(0);

  const [categoryId, setCategoryId] = useState("All Items");

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const getDiscount = useQuery(GET_DISCOUNT);

  const getItems = useQuery(GET_ALL_ITEMS);
  const getItemsByCategory = useQuery(GET_ITEMS_BY_CATEGORY, {
    variables: {
      categoryId: categoryId,
    },
  });

  if (getDiscount.loading) return <ProgressBar />;
  if (loading) return <ProgressBar />;

  function createData(_id: string, categoryName: string) {
    return { _id, categoryName };
  }

  let items = [];
  if (categoryId === "All Items" && !getItems.loading && !getItems.error) {
    items = getItems.data.getItems;
  } else if (!getItemsByCategory.loading && !getItemsByCategory.error) {
    items = getItemsByCategory.data.getItemsByCategory;
  }

  let discountedItems = [];
  if (
    categoryId === "Buy 3 for 100" &&
    !getDiscount.loading &&
    !getDiscount.error
  ) {
    discountedItems = getDiscount.data.getSMDiscounts;
  }

  console.log(discountedItems);

  const categories = data.getCategory?.map((category: any) => {
    return createData(category._id, category.categoryName);
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setCategoryId("All Items");
    } else if (newValue !== categories.length + 1) {
      setCategoryId(categories[newValue - 1]._id);
    } else if (newValue === categories.length + 1) {
      setCategoryId("Buy 3 for 100");
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: { xs: 600, sm: 1000, md: 1500, lg: 1500 } }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label=""
        >
          <Tab label="All Items" />
          {categories.map((row: any) => (
            <Tab key={row._id} label={row.categoryName} />
          ))}
          <Tab label="Buy 3 for 100" />
        </Tabs>
      </Box>
      <Box>
        <PosItems items={items} discountedItems={discountedItems} />
      </Box>
    </>
  );
}
