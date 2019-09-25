//import React from "react";

import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  //testing
  const [selectValues, setSelectValues] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    fuel: ""
  });
  const handleChange = event => {
    setSelectValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  const filterData = (data, inputKey) => {
    let test = [""];
    data.map(
      x =>
        Object.keys(x).map(y => {
          if (y == inputKey) test = [...test, x[y]];
        }) //console.log(x[y]);
    );
    test = [...new Set(test)];

    console.log(test);
    return test.map((item, index) => (
      <MenuItem
        key={index}
        value={item}
        name="brand"
        //onClick={e => props.inputChanged(e)}
      >
        {item}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Car Stock
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={e => props.inputChanged(e)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="expPanel"
            id="expPanel"
          >
            <Typography className={classes.heading}>More filters</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="brand">Brand</InputLabel>
              <Select
                value={selectValues.brand}
                onChange={e => {
                  handleChange(e);
                  props.inputChanged(e);
                }}
                inputProps={{
                  name: "brand",
                  id: "brand"
                }}
                input={<Input id="brand" />}
              >
                {filterData(props.data, "brand")}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="model">Model</InputLabel>
              <Select
                value={selectValues.model}
                onChange={e => {
                  handleChange(e);
                  props.inputChanged(e);
                }}
                inputProps={{
                  name: "model",
                  id: "model"
                }}
                input={<Input id="model" />}
              >
                {filterData(props.data, "model")}
              </Select>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}
