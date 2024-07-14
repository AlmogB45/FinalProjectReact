import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContextWorkers } from '../context/ContextWorkers';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const EmployeeDetails = () => {
  const { id } = useParams();
  const { employees, favorites } = useContext(ContextWorkers);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const emp = employees.find(e => e.login.uuid === id) || favorites.find(e => e.login.uuid === id);
    setEmployee(emp);
  }, [id, employees, favorites]);

  if (!employee) return <div className="loading">Loading...</div>;

  return (
    <div className="employee-details">
      <h1>{employee.name.first} {employee.name.last}</h1>
      <img src={employee.picture.large} alt={`${employee.name.first} ${employee.name.last}`} className="employee-image" />
      <div className="employee-info">
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Address:</strong> {`${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.country}`}</p>
      </div>
      
      <div className="map-container">
        <MapContainer 
          center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} 
          zoom={13} 
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}>
            <Popup>{`${employee.name.first} ${employee.name.last}'s location`}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default EmployeeDetails;