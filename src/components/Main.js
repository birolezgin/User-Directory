import React, { Component } from "react";
import Axios from "axios";

class employees extends Component {
    // Setting the component's initial state
    state = {
      search: "",
      employees: [],
    };
  
    // componentDidMount() is invoked immediately after a component is mounted.
    componentDidMount() {
      Axios.get("https://randomuser.me/api/?results=200&nat=us").then((res) =>
        this.setState({
          employees: res.data.results,
          
        })
      );
      this.sortEmployeesByName();
      this.sortEmployeesByPhone();
      this.sortEmployeesByEmail();
      this.sortEmployeesByAge();
    }
  
    // calling the sortEmployeesByName function, created in the Table component
    sortEmployeesByName = () => {
      function compare(a, b) {
        if (a.name.first > b.name.first) return 1;
        if (b.name.first > a.name.first) return -1;
        return 0;
      }
      const sortedEmployees = this.state.employees.sort(compare);
  
      this.setState({ employees: sortedEmployees });
    };
  
    // calling the sortEmployeesByPhone function, created in the Table component
    sortEmployeesByPhone  = () => {
      function compare(a, b) {
        if (a.cell > b.cell) return 1;
        if (b.cell > a.cell) return -1;
        return 0;
      }
      const sortedEmployees = this.state.employees.sort(compare);
  
      this.setState({ employees: sortedEmployees });
    };
  
    // calling the sortEmployeesByEmail function, created in the Table component
    sortEmployeesByEmail  = () => {
      function compare(a, b) {
        if (a.email > b.email) return 1;
        if (b.email > a.email) return -1;
        return 0;
      }
      const sortedEmployees = this.state.employees.sort(compare);
  
      this.setState({ employees: sortedEmployees });
    };
  
    // calling the sortEmployeesByAge function, created in the Table component
    sortEmployeesByAge  = () => {
      function compare(a, b) {
        if (a.dob.age > b.dob.age) return 1;
        if (b.dob.age > a.dob.age) return -1;
        return 0;
      }
      const sortedEmployees = this.state.employees.sort(compare);
  
      this.setState({ employees: sortedEmployees });
    };
  
    // Inputs are event driven, get the value of a name to be filtered
    handleInputChange = (event) => {
      const searchValue = event.currentTarget.value;
      console.log(searchValue);
      this.setState({search: event.currentTarget.value});
      const searchEmpArray = this.state.employees.filter((user=>{
        console.log("user", Object.values(user));
        let results = Object.values(user).join("").toLowerCase();
        return results.indexOf(searchValue.toLowerCase()) !== -1;
      }));
      
      this.setState({ employees: searchEmpArray });
    };
  
    
    render() {
      //returns some JSX here
      return (
        <div>
          <div className="jumbotron jumbotron-fluid text-center bg-primary text-white">
            <h1 className="display-4">Employee Directory</h1>
            <hr className="my-4" />
            <p>
              Click on the heading to filter by the heading or use the search box
              to narow your results.
            </p>
            <input
              name="search"
              type="text"
              value={this.state.search}
              onChange={this.handleInputChange}
              placeholder="search by name"
            ></input>
          </div>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Employee</th>
                <th scope="col" onClick={this.sortEmployeesByName}>
                  <button type="button" className="btn btn-outline-light">
                    Name
                  </button>
                </th>
                <th scope="col" onClick={this.sortEmployeesByPhone}>
                  <button type="button" className="btn btn-outline-light">
                    Phone
                  </button>
                </th>
                <th scope="col" onClick={this.sortEmployeesByEmail}>
                  <button type="button" className="btn btn-outline-light">
                    Email
                  </button>
                </th>
                <th scope="col" onClick={this.sortEmployeesByAge}>
                  <button type="button" className="btn btn-outline-light">
                    Age
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr>
                  <td>
                    <img
                      src={employee.picture.thumbnail}
                      alt="employee headshot"
                    />
                  </td>
                  <td>
                    {employee.name.first} {employee.name.last}
                  </td>
                  <td>{employee.cell}</td>
                  <td>{employee.email}</td>
                  <td>{employee.dob.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  export default employees;