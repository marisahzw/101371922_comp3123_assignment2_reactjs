import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/emp/employees/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          console.error('Error fetching employee details');
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/employees');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Employee</h2>
      {employee ? (
        <div>
          <p><strong>First Name:</strong> {employee.first_name}</p>
          <p><strong>Last Name:</strong> {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
        </div>
      ) : (
        <p style={styles.loading}>Loading employee details...</p>
      )}
      <button onClick={handleBack} style={styles.backButton}>Back</button>
    </div>
  );
};

const styles = {
  container: {
    width: '50%',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ecf0f1', // Different color
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    color: '#555',
  },
  backButton: {
    backgroundColor: '#3498db', // Different color
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px', // Added margin for spacing
  },
};

export default ViewEmployee;
