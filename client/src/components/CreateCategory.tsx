import React from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CreateIcon from "@mui/icons-material/Create";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "../utility/hooks";
import { GET_CATEGORIES } from "../graphql/query/CategoryQuery";
import { CREATE_CATEGORY } from "../graphql/mutation/categoryMutation";
import { useMutation } from "@apollo/react-hooks";

type Category = {
  categoryName: string;
};

export default function CreateCategory() {
  function addCategoryCallback() {
    addCategory();
  }

  const { handleChange, handleSubmit, formData } = useForm(
    addCategoryCallback,
    {
      categoryName: "",
    }
  );

  const { categoryName } = formData as Category;

  const [addCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    variables: {
      categoryInput: {
        categoryName,
      },
    },
    update(cache, { data: { addCategory } }) {
      const { getCategory }: any = cache.readQuery({ query: GET_CATEGORIES });
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: {
          getCategory: [...getCategory, addCategory],
        },
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const theme = useTheme();
  return (
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
          Create Category
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "cent",
            marginTop: 1,
          }}
        >
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="itemName"
              name="categoryName"
              label="Category Name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={12} marginTop={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              /* disabled={loading} */
            >
              Create Category
            </Button>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
