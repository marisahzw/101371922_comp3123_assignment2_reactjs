import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); 
  const [salary, setSalary] = useState(''); 
  const navigate = useNavigate();

  const handleSave = async () => {
  

    try {
      const response = await fetch('http://localhost:3000/api/v1/emp/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, gender, salary }),
      });

      if (response.ok) {
        navigate('/employees'); 
      } else {
        console.error('Error saving employee');
      }
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Employee</h2>
      <div>
        <label htmlFor="firstName" style={styles.label}>First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} />
      </div>
      <div>
        <label htmlFor="lastName" style={styles.label}>Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} />
      </div>
      <div>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
      </div>
      <div>
        <label htmlFor="gender" style={styles.label}>Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} style={styles.input}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="salary" style={styles.label}>Salary:</label>
        <input type="number" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} style={styles.input} />
      </div>
      <button onClick={handleSave} style={styles.saveButton}>Save</button>
      <button onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
    </div>
  );
};

const styles = {
  container: {
    width: '50%',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f2f2f2', // Different color
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    fontSize: '16px',
  },
  saveButton: {
    backgroundColor: '#27ae60', // Different color
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px', // Added margin for spacing
  },
  cancelButton: {
    backgroundColor: '#e74c3c', // Different color
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AddEmployee;
