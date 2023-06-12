import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { theme } from "./theme";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../context/userSlice";

const styles = {
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "0.5em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "0.5em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.5em",
    },
  },

  tabs: {
    marginLeft: "auto",
    "& .MuiButtonBase-root.MuiTab-root": {
      fontSize: 14,
      color: "black",
    },
    "& .Mui-selected": {
      backgroundColor: "#ccdcdc",
      color: "#000",
      opacity: 0.7,
      borderRadius: 2,
    },
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 7,
    marginLeft: "18px",
    color: "white",
  },

  hamburgerMenuIcon: {
    height: "50px",
    width: "50px",
  },
  menuIconContainer: {
    marginLeft: "auto",
    color: "#Dbdcdc",
    "&:hover": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
};

const DesktopNavigation = ({ formatter }) => {
  let lastTab = JSON.parse(localStorage.getItem("value")) ?? 0;
  const [value, setValue] = useState(lastTab);
  const handleChange = (event, newValue) => {
    localStorage.setItem("value", `${newValue}`);
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="nav tabs example"
      sx={styles.tabs}
    >
      <Tab sx={styles.tab} label="Home" component={Link} to="/" />
      <Tab sx={styles.tab} label="Portfolio" component={Link} to="/portfolio" />
      <Tab sx={styles.tab} label="Articles" component={Link} to="/articles" />
      <Tab sx={styles.tab} label="Coins" component={Link} to="/coins" />
      <Tab
        sx={styles.tab}
        label="Watch list"
        component={Link}
        to="/watchlist"
      />
    </Tabs>
  );
};

const MobileNavigation = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        {/* <Box sx={styles.toolbarMargin} /> */}
        <Box
          sx={{
            display: "flex",
            marginTop: "80px",
          }}
        />
        <Paper>
          <List disablePadding>
            <ListItem
              divider
              button
              component={Link}
              to="/"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>Home</ListItemText>
            </ListItem>
            <ListItem
              divider
              button
              component={Link}
              to="/portfolio"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>portfolio</ListItemText>
            </ListItem>
            <ListItem
              divider
              button
              component={Link}
              to="/articles"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>articles</ListItemText>
            </ListItem>
            <ListItem
              divider
              button
              component={Link}
              to="/coins"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>Coins</ListItemText>
            </ListItem>
            <ListItem
              divider
              button
              component={Link}
              to="/watchlist"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>Watch list</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </SwipeableDrawer>
      <IconButton
        sx={styles.menuIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon sx={styles.hamburgerMenuIcon} />
      </IconButton>
    </React.Fragment>
  );
};

const Header = ({ formatter }) => {
  const isMobileMode = useMediaQuery("(max-width:700px)");
  const user = useSelector((state) => state.user.user[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Fragment>
      <AppBar
        position="static"
        sx={(styles.appbar, { backgroundColor: "#edeff0" })}
        elevation={9}
      >
        <Toolbar disableGutters={true}>
          <Button
            onClick={() => {
              setTimeout(() => {
                dispatch(logout());
                navigate("/");
              }, 500);
            }}
            variant="outlined"
            color="error"
            size="small"
            style={{ marginLeft: "1rem" }}
          >
            Logout
          </Button>
          <span
            className="balanceSpan"
            title={`balance: ${formatter.format(user.balance)}`}
          >
            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </span>

          {isMobileMode ? <MobileNavigation /> : <DesktopNavigation />}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
