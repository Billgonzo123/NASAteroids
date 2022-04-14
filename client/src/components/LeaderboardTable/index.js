import * as React from 'react';
import {Table ,TableBody, TableCell, TableContainer, TableRow} from '@mui/material';

function createData(userName, score) {
  return { userName, score};
}

const rows = [
  createData('L33TGAMR', 500900),
  createData('PAPRSHRDR', 400890),
  createData('EMDOK', 400777),
  createData('KT', 399999),
  createData('KURZ890', 383876),
  createData('angalet', 369870),
  createData('BEEKILLR', 200000),
  createData('FFYOGURT', 198708),
  createData('KILLRBRGR', 187907),
];

export default function BasicTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 275, textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.userName}
              sx={{ '& td': { border: 0 } }}
            >
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                {row.userName}
              </TableCell>
              <TableCell align="center" sx={{ p: 0.25 }}>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}