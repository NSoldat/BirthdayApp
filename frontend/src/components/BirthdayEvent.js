import { Typography, InputLabel, TextField, Button, Box } from "@mui/material";
import React, { useState } from "react";

const BirthdayEvent = (props) => {
  const birthdayEvent = props.event;
  const userId = localStorage.getItem("userId");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payment = {
      userId,
      amount,
      message,
    };

    props.onAddPayment(payment, birthdayEvent);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Get involved in {birthdayEvent.birthdayPerson.name}'s birthday!
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <InputLabel sx={{ marginTop: 3 }}>Amount</InputLabel>
        <TextField
          onChange={handleAmountChange}
          sx={{ marginBottom: 3 }}
          type={"number"}
          variant="standard"
        ></TextField>
        <InputLabel>Message</InputLabel>
        <TextField
          onChange={handleMessageChange}
          sx={{ marginBottom: 3 }}
          multiline
          fullWidth
        ></TextField>
        <Button
          type="submit"
          sx={{ textTransform: "none" }}
          variant="contained"
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default BirthdayEvent;
