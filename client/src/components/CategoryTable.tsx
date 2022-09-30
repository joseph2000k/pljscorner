import React from "react";
import { GET_CATEGORIES } from "../graphql/query/CategoryQuery";
import { useQuery } from "@apollo/client";
import ProgressBar from "../components/ProgressBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";

export default function CategoryTable() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <ProgressBar />;

  function createData(_id: string, categoryName: string) {
    return { _id, categoryName };
  }

  const rows = data.getCategory.map((category: any) => {
    return createData(category._id, category.categoryName);
  });
  return (
    <>
      {!loading && !error && (
        <Grow in={true}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.categoryName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grow>
      )}
    </>
  );
}
