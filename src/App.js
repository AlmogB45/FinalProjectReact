import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './context/ContextWorkers';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import EmployeeDetails from './pages/EmployeeDetails';
import './css/App.css';

function App() {
  return (
    <React.StrictMode>
      <ContextProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />
            </Routes>
          </div>
        </Router>
      </ContextProvider>
    </React.StrictMode>
  );
}

export default App;