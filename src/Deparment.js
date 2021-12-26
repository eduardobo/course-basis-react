import React, {Component} from "react";
import {variables} from "./Variables";

export class Deparment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deparments: [],
            modalTitle: "",
            deparmentName: "",
            deparmentId: 0,

            deparmentIdFilter: "",
            deparmentNameFilter: "",
            deparmentsWithoutFilter: []
        }
    }

    filterFunction() {
        var deparmentIdFilter = this.state.deparmentIdFilter;
        var deparmentNameFilter = this.state.deparmentNameFilter;

        var filteredData = this.state.deparmentsWithoutFilter.filter(function (el) {
            return el.deparmentId.toString().toLowerCase().includes(
                deparmentIdFilter.toString().trim().toLowerCase()
            ) &&
            el.deparmentName.toString().toLowerCase().includes(
                deparmentNameFilter.toString().trim().toLowerCase()
            )
        });

        this.setState({deparments:filteredData});
    }

    sortResult(prop, asc) {
        var sortedData = this.state.deparmentsWithoutFilter.sort(function (a , b) {
            if(asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);

            }
        });

        this.setState({deparments:sortedData});
    }

    changeDeparmentIdFilter = (e) => {
        this.state.deparmentIdFilter = e.target.value;
        this.filterFunction();
    }

    changeDeparmentNameFilter = (e) => {
        this.state.deparmentNameFilter = e.target.value;
        this.filterFunction();
    }

    refreshList() {
        fetch(variables.API_URL + 'deparment')
        .then(response => response.json())
        .then(data => {
            this.setState({deparments:data, deparmentsWithoutFilter:data});
        })
    }

    componentDidMount() {
        this.refreshList();
    }

    changeDeparmentName = (e) => {
        this.setState({deparmentName:e.target.value});
    }

    addClick() {
        this.setState({
            modalTitle: "Add Deparment",
            deparmentId: 0,
            deparmentName: ""
        });
    }

    editClick(dep) {
        this.setState({
            modalTitle: "Edit Deparment",
            deparmentId: dep.deparmentId,
            deparmentName: dep.deparmentName
        });
    }

    createClick() {
        fetch(variables.API_URL + 'deparment', {
            method: 'POST', 
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deparmentName: this.state.deparmentName
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
        fetch(variables.API_URL + 'deparment' + `/${this.state.deparmentId}`, {
            method: 'put', 
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deparmentName: this.state.deparmentName
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

    deleteClick(dep) {
        if(window.confirm(`Are you sure to delete ${dep.deparmentName}?`))
        fetch(variables.API_URL + 'deparment' + `/${dep.deparmentId}`, {
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

    render() {
        const {
            deparments,
            modalTitle,
            deparmentId,
            deparmentName   
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onClick={() => this.addClick()}>
                        Add Deparmnet
                    </button>

                <table className="table table-stiped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2" onChange={this.changeDeparmentIdFilter} placeholder="Filter"/>

                                    <button type="button" className="btn btn-ligth" onClick={() => this.sortResult('deparmentId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-ligth" onClick={() => this.sortResult('deparmentId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button> 
                                </div>
                                DeparmentId
                            </th>

                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2" onChange={this.changeDeparmentNameFilter} placeholder="Filter"/>

                                    <button type="button" className="btn btn-ligth" onClick={() => this.sortResult('deparmentName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-ligth" onClick={() => this.sortResult('deparmentName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button> 
                                </div>
                                
                                DeparmentName
                            </th>

                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                     
                    <tbody>
                        {deparments.map(dep =>
                            <tr key={dep.deparmentId}>
                                <td>{dep.deparmentId}</td>
                                <td>{dep.deparmentName}</td>

                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                    onClick={() => this.editClick(dep)} data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light mr-1" onClick={() => this.deleteClick(dep)}>
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
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Deparment Name</span>
                                    <input type="text" className="form-control" value={deparmentName} onChange={this.changeDeparmentName} />
                                </div>

                                {deparmentId == 0?
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