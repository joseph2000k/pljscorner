import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';

export default function ItemTable( {items}: any ) {

    function createData(
        name: string,
        price: number,
        sku: number,
        stock: number,
      ) {
        return { name, price, sku, stock};
      }
      
      const rows = items.map((item: any) => {
        return createData(item.name, item.price, item.sku, item.stock);
      }
      );


    return (
        <Grow in={true}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sku</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price} Php</TableCell>
              <TableCell align="right">{row.sku}</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right"><Button>Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grow>
    )
}