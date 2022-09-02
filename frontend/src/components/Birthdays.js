import React, { useState, useCallback, useEffect } from "react";
import { withStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Container, Box } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Menu, MenuItem, Checkbox, Modal } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import BirthdayEvent from "./BirthdayEvent";

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

  const userId = localStorage.getItem("userId");

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

  const fetchBirthdayEvents = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const mappedData = formatResponse(data);
      console.log(mappedData);
      setBirthdayEvents(mappedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    let url = "http://localhost:5000/events/" + userId;
    if (checked) {
      url = url + "/open";
    }
    fetchBirthdayEvents(url);
  }, [checked, fetchBirthdayEvents]);

  // TODO: Implement error handling when fetching
  if (error) {
    // showErrorModal
  }
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPaymentHandler = async (payment, birthdayEvent) => {
    const response = await fetch("http://localhost:5000/payments", {
      method: "POST",
      body: JSON.stringify(payment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    const participantId = data._id;
    const reqBody = { participantId };

    const url = "http://localhost:5000/events/" + birthdayEvent._id;
    const result = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedEvent = await result.json();
    console.log("Azuriran event: ", updatedEvent);
    console.log("Nova uplata: ", data);
  };

  return (
    <Container component={Paper}>
      <Box sx={{ m: 3 }}>
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
            {birthdayEvents.map((event, i) => (
              <TableRow key={event._id}>
                <TableCell align="right" component="th" scope="row">
                  {event.birthdayPerson.name}
                </TableCell>
                <TableCell align="right">
                  {event.birthdayPerson.birthDate}
                </TableCell>
                <TableCell align="right">{event.eventCreator.name}</TableCell>
                <TableCell align="right">
                  <PopupState variant="popover" popupId={event._id}>
                    {(popupState) => (
                      <>
                        <IconButton
                          variant="contained"
                          color="inherit"
                          {...bindTrigger(popupState)}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={handleOpen}>Get involved</MenuItem>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 300,
                                height: 300,
                                backgroundColor: "white",
                                border: "2px solid #000",
                                boxShadow: 24,
                                p: 4,
                              }}
                            >
                              <BirthdayEvent
                                event={event}
                                onAddPayment={addPaymentHandler}
                              ></BirthdayEvent>
                            </Box>
                          </Modal>
                          {userId === event.eventCreator._id && (
                            <MenuItem>Buy present</MenuItem>
                          )}
                        </Menu>
                      </>
                    )}
                  </PopupState>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Birthdays;
