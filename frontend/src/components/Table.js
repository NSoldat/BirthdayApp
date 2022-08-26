import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Container } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContextMenu from "./ContextMenu";

const TableCell = withStyles({
  root: {
    "& td.MuiTableCell-root": {
      borderBottom: "none",
    },
  },
})(MuiTableCell);

const TableComponent = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsersHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/users/all/62fa1c6d239202b2b8c994d5"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const mappedData = data.map((obj) => {
        return { ...obj, birthDate: new Date(obj.birthDate) };
      });
      const sortedData = mappedData.sort(
        (obj1, obj2) => Number(obj1.birthDate) - Number(obj2.birthDate)
      );

      console.log(sortedData);
      setUsers(sortedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);
  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  if(error) {
    // create error modal
  }

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
                <ContextMenu user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TableComponent;
