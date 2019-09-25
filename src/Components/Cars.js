import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

import NavBar from "./NavBar";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filterCars, setFilterCars] = useState([]);
  //const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCars = () => {
      console.log("loading...");
      fetch("https://carstockrest.herokuapp.com/cars")
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars));
    };
    fetchCars();
  }, []);

  useEffect(() => {
    setFilterCars(cars);
  }, [cars]);

  const inputChanged = e => {
    console.log(e.target.value);
    carSearch(e.target.value);
  };

  const carSearch = inputText => {
    //inputText.preventDefault();
    let filterData = cars.filter(
      x =>
        x.model.toLowerCase().includes(inputText.toLowerCase()) ||
        x.brand.toLowerCase().includes(inputText.toLowerCase())
    );
    if (inputText === "") {
      setFilterCars(cars);
    } else {
      setFilterCars(filterData);
    }
  };

  const renderEditable = cellInfo => {
    const data = filterCars;
    console.log();
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          console.log(data);
          setFilterCars(data);
        }}
        dangerouslySetInnerHTML={{
          __html: filterCars[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  const handleDelete = i => {
    console.log(cars[i]);
    const rows = cars.filter(car => car !== filterCars[i]);
    console.log(rows);
    //setFilterCars(rows);
    setCars(rows);
  };

  const columns = [
    {
      Header: "",
      accessor: "deleterow",
      width: 60,
      Cell: row => (
        <Fab color="secondary" aria-label="delete" size="small">
          <DeleteIcon onClick={() => handleDelete(row.index)} />
        </Fab>
      )
    },
    {
      Header: "Brand",
      accessor: "brand",
      Cell: renderEditable
    },
    {
      Header: "Model",
      accessor: "model",
      Cell: renderEditable
    },
    {
      Header: "Color",
      accessor: "color",
      Cell: renderEditable
    },
    {
      Header: "Year",
      accessor: "year",
      Cell: renderEditable
    },
    {
      Header: "Fuel",
      accessor: "fuel",
      Cell: renderEditable
    },
    {
      Header: "Price (€)",
      accessor: "price",
      Cell: renderEditable
    }
  ];

  return (
    <div>
      <NavBar inputChanged={inputChanged} data={filterCars} />
      <div>
        <ReactTable data={filterCars} columns={columns} />
      </div>
    </div>
  );
};
export default CarList;
