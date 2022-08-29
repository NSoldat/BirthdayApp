import React, { useState, useCallback, useEffect } from "react";
import { withStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Container } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Menu, MenuItem, Checkbox } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

const TableCell = withStyles({
  root: {
    "& td.MuiTableCell-root": {
      borderBottom: "none",
    },
  },
})(MuiTableCell);

const Birthdays = () => {
  const [birthdayEvents, setBirthdayEvents] = useState([]);
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);

  const user = localStorage.getItem("userId");

  const formatResponse = (response) => {
    const mappedData = response.map((obj) => {
      const birthdayPerson = obj.birthdayPerson;
      const birthDate = birthdayPerson.birthDate;
      const currentYear = new Date().getFullYear();
      const birthdayDate = new Date(birthDate);
      const getBirthdayMonth = birthdayDate.getMonth();
      const getBirthdayDay = birthdayDate.getDate();
      const birthdayString =
        getBirthdayDay + "." + getBirthdayMonth + "." + currentYear;

      const birthdayPersonObj = {
        ...birthdayPerson,
        birthDate: birthdayString,
      };

      return { ...obj, birthdayPerson: birthdayPersonObj };
    });
    return mappedData;
  };

  const fetchBirthdayEvents = useCallback(async () => {
    try {
      const url = "http://localhost:5000/events/" + user;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const mappedData = formatResponse(data);
      setBirthdayEvents(mappedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const fetchCurrent = useCallback(async () => {
    try {
      const url = "http://localhost:5000/events/" + user + "/open";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const mappedData = formatResponse(data);
      setBirthdayEvents(mappedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    if (checked) {
      fetchCurrent();
    } else {
      fetchBirthdayEvents();
    }
  }, [checked, fetchBirthdayEvents, fetchCurrent]);

  // TODO: Implement error handling when fetching
  if (error) {
    // showErrorModal
  }
  const popupState = usePopupState({
    variant: "popover",
    popupId: "eventMenu",
  });

  return (
    <Container component={Paper}>
      <div align="right">
        Show only current{" "}
        <Checkbox
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
      </div>
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
            <TableCell align="right">Birthday user</TableCell>
            <TableCell align="right">Birthday date</TableCell>
            <TableCell align="right">Organizer</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {birthdayEvents.map((event) => (
            <TableRow key={event._id}>
              <TableCell align="right" component="th" scope="row">
                {event.birthdayPerson.name}
              </TableCell>
              <TableCell align="right">
                {event.birthdayPerson.birthDate}
              </TableCell>
              <TableCell align="right">{event.eventCreator.name}</TableCell>
              <TableCell align="right">
                <IconButton
                  variant="contained"
                  color="inherit"
                  {...bindTrigger(popupState)}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem>Create new event</MenuItem>
                  <MenuItem>Buy present</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Birthdays;
