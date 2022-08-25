import React from "react";
import { withStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Container } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TableCell = withStyles({
  root: {
    "& td.MuiTableCell-root": {
      borderBottom: "none",
    },
  },
})(MuiTableCell);

const TableComponent = (props) => {
  const users = props.users;

  return (
    <Container component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="right">Users</TableCell>
            <TableCell align="right">Birthdays</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell align="right" component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">
                {user.birthDate.toDateString()}
              </TableCell>
              <TableCell align="right">
              <IconButton color="inherit">
              <MoreHorizIcon/>
          </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TableComponent;
