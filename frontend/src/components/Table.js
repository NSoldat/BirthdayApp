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

  const userId = localStorage.getItem("userId");

  const fetchUsersHandler = useCallback(async () => {
    try {
      const url = "http://localhost:5000/users/all/" + userId;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      data.sort((obj1, obj2) => {
        const obj1Date = new Date(obj1.birthDate);
        const obj2Date = new Date(obj2.birthDate);
        
        const ad = new Date();
        const bd = new Date();

        ad.setDate(obj1Date.getDate());
        ad.setMonth(obj1Date.getMonth());
        bd.setDate(obj2Date.getDate());
        bd.setMonth(obj2Date.getMonth());
        return ad - bd;
      });

      const mappedData = data.map((obj) => {
        const birthDateObject = new Date(obj.birthDate);
        const month = birthDateObject.getMonth();
        const day = birthDateObject.getDate();
        const currentDate = new Date();
        const birthDateString = day + "." + month + "." + currentDate.getFullYear();
       return { ...obj, birthDate: birthDateString };
      });

      console.log(mappedData);
      setUsers(mappedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  if (error) {
    // create error modal
  }

  return (
    <Container component={Paper}>
      <Table
        sx={{
          m: 3,
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
                {user.birthDate}
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
