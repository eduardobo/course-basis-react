import React, {Component} from "react";
import {variables} from "./Variables";

export class Employee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deparments:[],
            employees: [],
            modalTitle: "",
            employeeId: 0,
            employeeName: "",
            deparment: "",
            dateOfJoining: "",
            photoFileName: "",
            photoPath: variables.PHOTO_URL
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'employee')
        .then(response => response.json())
        .then(data => {
            this.setState({employees:data});
        });

        fetch(variables.API_URL + 'deparment')
        .then(response => response.json())
        .then(data => {
            this.setState({deparments:data});
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeEmployeName = (e) => {
        this.setState({employeeName:e.target.value});
    }

    changeDeparment = (e) => {
        this.setState({deparment:e.target.value});
    }

    changeDateOfJoining = (e) => {
        this.setState({dateOfJoining:e.target.value});
    }

    addClick() {
        this.setState({
            modalTitle: "Add Employee",
            employeeId: 0,
            employeeName: "",
            deparment: "",
            dateOfJoining: "",
            photoFileName: "captura.png"
        });
    }

    editClick(employee) {
        this.setState({
            modalTitle: "Edit Employee",
            employeeId: employee.employeeId,
            employeeName: employee.employeeName,
            deparment: employee.deparment,
            dateOfJoining: employee.dateOfJoining,
            photoFileName: employee.photoFileName
        });
    }

    createClick() {
        fetch(variables.API_URL + 'employee', {
            method: 'POST', 
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeName:  this.state.employeeName,
                deparment:  this.state.deparment,
                dateOfJoining:  this.state.dateOfJoining,
                photoFileName:  this.state.photoFileName
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })
    }

    updateClick() {
        fetch(variables.API_URL + 'employee/' + this.state.employeeId, {
            method: 'put', 
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeName:  this.state.employeeName,
                deparment:  this.state.deparment,
                dateOfJoining:  this.state.dateOfJoining,
                photoFileName:  this.state.photoFileName
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })
    }

    deleteClick(employee) {
        if(window.confirm(`Are you sure to delete ${employee.employeeName}?`))
        fetch(variables.API_URL + 'employee/' + employee.employeeId, {
            method: 'DELETE', 
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })
    }

    imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + "employee/savephoto", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            this.setState({photoFileName:data});
        })
    }

    render() {
        const {
            deparments,
            employees,
            modalTitle,
            employeeId,
            employeeName,
            deparment,
            dateOfJoining,
            photoFileName,
            photoPath
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onClick={() => this.addClick()}>
                        Add Employee
                    </button>

                <table className="table table-stiped">
                    <thead>
                        <tr>
                            <th>
                                Employee Id
                            </th>

                            <th>
                                Employee Name
                            </th>

                            <th>
                                Deparment
                            </th>

                            <th>
                                Date of joining
                            </th>

                            <th>
                                Photo file name
                            </th>

                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                     
                    <tbody>
                        {employees.map(employee =>
                            <tr key={employee.employeeId}>
                                <td>{employee.employeeId}</td>
                                <td>{employee.employeeName}</td>
                                <td>{employee.deparment}</td>
                                <td>{employee.dateOfJoining}</td>
                                <td>{employee.photoFileName}</td>

                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                    onClick={() => this.editClick(employee)} data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light mr-1" onClick={() => this.deleteClick(employee)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                     </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-hifhlight mb-3">
                                    <div className="p-2 w-50 bd-hifhlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Employee Name</span>
                                            <input type="text" className="form-control" value={employeeName} onChange={this.changeEmployeName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Deparment</span>
                                            <select className="form-select" aria-label="Aiuda" onChange={this.changeDeparment} value={deparment}>
                                                {deparments.map(deparment =>
                                                    <option key={deparment.deparmentId} value={deparment.deparmentName}>{deparment.deparmentName}</option>
                                                )}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Date Of Joining</span>
                                            <input type="date" className="form-control" value={dateOfJoining} onChange={this.changeDateOfJoining} />
                                        </div>

                                        <div className="mb-3">
                                            {photoFileName ? 
                                                <div className="input-group mb-12">
                                                    <span>Current photo {photoFileName}</span>
                                                </div>
                                            :null}
                                            
                                        </div>
                                    </div>
                                    
                                    <div className="p-2 w-50 bd-hifhlight">
                                        <img width="250px" height="250px" src={photoPath + photoFileName}/>

                                        <span className="input-group-text">Change Photo</span>
                                        <input type="file" className="form-control m-2" onChange={this.imageUpload}/>
                                    </div>                                    
                                </div>
                                {employeeId === 0?
                                        <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button> : 
                                        <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>Update</button>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}