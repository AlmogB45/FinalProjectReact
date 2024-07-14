import React, { useContext } from 'react';
import { ContextWorkers } from '../context/ContextWorkers';
import EmployeeList from '../pages/EmployeeList';

const Favorites = () => {
  const { favorites } = useContext(ContextWorkers);

  return (
    <div>
      <h1>Favorite Employees</h1>
      <EmployeeList employees={favorites} isFavoritesList={true} />
    </div>
  );
};

export default Favorites;