import React, { useState } from "react";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

const ContextMenu = (props) => {
    const navigate = useNavigate();
    const [disableButton, setDisableButton] = useState(false);

  const popupState = usePopupState({
    variant: "popover",
    popupId: "eventMenu",
  });

  const createNewEvent = (user) => {
    popupState.close();
    console.log(user);
    const usersBirthday = new Date(user.birthDate);
    const birthdayMonth = usersBirthday.getMonth();
    const birthdayDay = usersBirthday.getDate();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    // User has an upcoming birthday
    if(currentMonth < birthdayMonth || (currentMonth === birthdayMonth && currentDay < birthdayDay)) {
        navigate("/event");
    } else {
        setDisableButton(true);
    }
  };

  return (
    <>
      <IconButton
        variant="contained"
        color="inherit"
        {...bindTrigger(popupState)}
        disabled={disableButton}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={() => createNewEvent(props.user)}>
          Create new event
        </MenuItem>
      </Menu>
    </>
  );
};

export default ContextMenu;
