import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
  
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {isLoggedIn && (
          <nav>
            <h1>Pay Load Application</h1>
            {}
            <Link to="/login">
              <button onClick={handleLogout}>Logout</button>
            </Link>
          </nav>
        )}

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/employees"
            element={isLoggedIn ? <EmployeeList /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-employee"
            element={isLoggedIn ? <AddEmployee /> : <Navigate to="/login" />}
          />
          <Route
            path="/view-employee/:id"
            element={isLoggedIn ? <ViewEmployee /> : <Navigate to="/login" />}
          />
          <Route
            path="/update-employee/:id"
            element={isLoggedIn ? <UpdateEmployee /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
