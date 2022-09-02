import { Button } from "@mui/material";
import React from "react";

const ListItem = (props) => {

  const addToWishlistHandler = (e) => {
    e.preventDefault();
    console.log(props);
    props.addToWishList(props.itemId); 
  };

  return (
    <li>
      <p>{props.name}</p>{" "}
      {props.existingItems && (
        <Button onClick={addToWishlistHandler}>Add</Button>
      )}
      {!props.existingItems && <a href={props.urlLink}>{props.urlLink}</a>}
    </li>
  );
};

export default ListItem;
