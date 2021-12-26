import './App.css';
import {Home} from './Home';
import {Deparment} from './Deparment';
import {Employee} from './Employee';

import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Reacj js frontend
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nat-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>

            <li className="nat-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/deparment">
                Deparment
              </NavLink>
            </li>

            <li className="nat-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/employee">
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/deparment" element={<Deparment/>}></Route>
          <Route path="/employee" element={<Employee/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
