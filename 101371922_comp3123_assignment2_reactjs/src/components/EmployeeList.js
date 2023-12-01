import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/emp/employees');
        if (response.ok) {
          const data = await response.json();
          setEmployeeList(data);
        } else {
          console.error('Error fetching employee list');
        }
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    };

    fetchEmployeeList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/emp/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedList = employeeList.filter((employee) => employee._id !== id);
        setEmployeeList(updatedList);
      } else {
        console.error('Error deleting employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee List</h2>
      <Link to="/add-employee">
        <button style={styles.addButton}>Add Employee</button>
      </Link>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <Link to={`/view-employee/${employee._id}`}>
                  <button style={styles.viewButton}>View</button>
                </Link>
                <Link to={`/update-employee/${employee._id}`}>
                  <button style={styles.updateButton}>Update</button>
                </Link>
                <button onClick={() => handleDelete(employee._id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width: '70%',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ecf0f1', 
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#27ae60', 
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  viewButton: {
    backgroundColor: '#3498db', 
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '5px',
  },
  updateButton: {
    backgroundColor: '#f39c12', 
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', 
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default EmployeeList;
