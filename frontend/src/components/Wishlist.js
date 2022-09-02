import React from "react";
import { useState, useEffect, useCallback } from "react";
import ListItem from "./ListItem";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import ItemList from "./ItemList";

const Wishlist = () => {
  const userId = localStorage.getItem("userId");

  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const [open, setOpen] = useState(false);
  const [chooseOpen, setChooseOpen] = useState(false);

  const [name, setName] = useState("");
  const [urlLink, setUrl] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = () => {
    setChooseOpen(true);
  };

  const chooseClose = () => {
    setChooseOpen(false);
  };

  const fetchUserHandler = useCallback(async () => {
    try {
      const url = "http://localhost:5000/users/" + userId;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const userData = await response.json();
      setWishlist(userData.wishList);
      console.log(userData.wishList);
    } catch (error) {
      setError(error.message);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserHandler();
  }, [fetchUserHandler]);

  if (error) {
    //Show error modal
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const createNewItem = async () => {
    try {
      const urlString = "http://localhost:5000/items/";
      const item = {
        name,
        urlLink,
      };

      const response = await fetch(urlString, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const newItemData = await response.json();
      const newItemId = newItemData._id;
      console.log(newItemData);

      const result = await fetch("http://localhost:5000/users/" + userId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: newItemId }),
      });
      const updatedUser = await result.json();
      setWishlist(updatedUser.wishList);
    } catch (error) {
      setError(error.message);
    }
  };

  const addToWishList = async (itemId) => {
    console.log("Adding to wishlist");
    console.log("itemId in wishlist: ", itemId);
    const url1 = "http://localhost:5000/users/" + userId;
    try {
      const updatedUser1 = await fetch(url1, {
        method: "PUT",
        body: JSON.stringify({ itemId }),
        headers: { "Content-Type": "application/json" },
      });

      const updatedUser1Data = await updatedUser1.json();
      console.log(updatedUser1Data);
      setWishlist(updatedUser1Data.wishList);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <ul>
        {wishlist.map((listItem) => (
          <ListItem
            key={listItem._id}
            name={listItem.name}
            urlLink={listItem.urlLink}
          ></ListItem>
        ))}
      </ul>
      <div>
        <Button onClick={handleOpen}>Add new item </Button>
        <Button onClick={openModal}>Add from existing</Button>
        <Modal open={chooseOpen} onClose={chooseClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Pick an item
            </Typography>
            <ItemList addToWishList={addToWishList}></ItemList>
          </Box>
        </Modal>
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
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create new item
              <TextField
                onChange={handleNameChange}
                sx={{ marginBottom: 2, marginTop: 2 }}
                variant="outlined"
                label="Name"
                fullWidth
              ></TextField>
              <TextField
                onChange={handleUrlChange}
                sx={{ marginBottom: 2 }}
                variant="outlined"
                label="Url"
                fullWidth
              ></TextField>
              <Button onClick={createNewItem} sx={{ marginTop: 2 }} fullWidth>
                Add item
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Wishlist;
