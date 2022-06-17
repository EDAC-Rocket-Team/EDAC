import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Toolbar } from "@mui/material";
import { ValueContext, SetValueContext } from "../App";

export default function Header() {
  let navigate = useNavigate();

  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const userPage = () => {
    setOpen(false);
    navigate("/profile");
  };

  const logout = () => {
    setUserData({
      donor: {
        token: null,
        firstname: null,
        lastname: null,
        email: null,
        birthdate: null,
        address: null,
        phone: null,
        bloodtype: null,
        alcoholpass: null,
        drugpass: null
      },
      beneficiary: {
        token: null,
        centerName: null,
        medicalZone: null,
        email: null,
        phoneNumber: null,
        address: null
      },
    });
    setOpen(false);
    localStorage.setItem("edak-blood-token", "");
    navigate("/");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="white" noWrap underline="none">
            EDAC
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <nav>
            {userData.donor.email || userData.beneficiary.email ? (
              <div>
                <IconButton id="here" size="large" onClick={handleMenu}>
                  <AccountCircle sx={{ color: "white" }} />
                </IconButton>
                <Menu
                  open={open}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem key="myAccount" onClick={userPage}>
                    My Account
                  </MenuItem>
                  <MenuItem key="logOut" onClick={logout}>
                    Log out
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}
