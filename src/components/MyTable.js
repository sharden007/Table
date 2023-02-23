import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

function MyTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/data.json')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field 1</TableCell>
            <TableCell>Field 2</TableCell>
            <TableCell>Field 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.field1}</TableCell>
              <TableCell>{row.field2}</TableCell>
              <TableCell>{row.field3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
