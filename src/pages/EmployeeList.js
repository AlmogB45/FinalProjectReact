import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextWorkers } from '../context/ContextWorkers';

const EmployeeList = ({ employees, isFavoritesList }) => {
  const { employees: contextEmployees, favorites, addFavorite, removeFavorite } = useContext(ContextWorkers);
    
  const displayEmployees = employees || contextEmployees;

  const toggleFavorite = (employee) => {
    if (favorites.some(fav => fav.login.uuid === employee.login.uuid)) {
      removeFavorite(employee.login.uuid);
    } else {
      addFavorite(employee);
    }
  };

  if (!displayEmployees || displayEmployees.length === 0) {
    return <div>No employees to display.</div>;
  }

  return (
    <div className="employee-list">
      {displayEmployees.map(employee => (
        <div key={employee.login.uuid} className="employee-card">
          <img src={employee.picture.thumbnail} alt={`${employee.name.first} ${employee.name.last}`} />
          <h2>{employee.name.first} {employee.name.last}</h2>
          <p>Age: {employee.dob.age}</p>
          <p>Location: {employee.location.city}, {employee.location.country}</p>
          <Link to={`/employee/${employee.login.uuid}`}>More Details</Link>
          <button onClick={() => toggleFavorite(employee)}>
            {favorites.some(fav => fav.login.uuid === employee.login.uuid) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;