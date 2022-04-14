import * as React from 'react';
import {Table ,TableBody, TableCell, TableContainer, TableRow} from '@mui/material';

function createData(controlName, keyStroke) {
  return { controlName, keyStroke};
}

const rows = [
  createData('left:', "A"),
  createData('right:', "B"),
  createData('thrust:', "W"),
  createData('fire:', "space"),
];

export default function GameControls() {
  return (
    <TableContainer>
      <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.controlName}
              sx={{ '& td': { border: 0 } }}
            >
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                {row.controlName}
              </TableCell>
              <TableCell align="center" sx={{ p: 0.25 }}>{row.keyStroke}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}