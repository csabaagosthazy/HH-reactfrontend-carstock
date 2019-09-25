import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
class Test extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { firstName: "Csaba", lastName: "Csaba", fullName: "Csaba Csaba" }
      ],
      firstName: "",
      lastName: ""
    };
  }

  handleChange = event => {
    if (event.target.name === "firstName")
      this.setState({ firstName: event.target.value });
    if (event.target.name === "lastName")
      this.setState({ lastName: event.target.value });
    console.log(this.state.firstName, this.state.lastName);
  };
  handleSubmit = event => {
    event.preventDefault();

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      fullName: this.state.firstName + " " + this.state.lastName
    };
    const datas = [...this.state.data, data];
    this.setState({ data: datas });
    console.log(data, this.state.data);
  };
  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        //suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
    console.log(this.state.data);
  };
  render() {
    const { data } = this.state;
    return (
      <div className="Test">
        {" "}
        <form onSubmit={this.handleSubmit}>
          {" "}
          <h3>Add new record</h3>{" "}
          <label>
            {" "}
            FirstName:{" "}
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />{" "}
          </label>{" "}
          <label>
            {" "}
            LastName:{" "}
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />{" "}
          </label>
          <input type="submit" value="Add" />{" "}
        </form>{" "}
        <div>
          {" "}
          <ReactTable
            data={data}
            columns={[
              {
                Header: "First Name",
                accessor: "firstName",
                Cell: this.renderEditable
              },
              {
                Header: "Last Name",
                accessor: "lastName",
                Cell: this.renderEditable
              },
              {
                Header: "Full Name",
                id: "full",
                accessor: "fullName"
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />{" "}
        </div>{" "}
      </div>
    );
  }
}
export default Test;
