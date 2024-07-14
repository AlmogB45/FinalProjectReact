import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ContextWorkers } from '../context/ContextWorkers';
import EmployeeList from '../pages/EmployeeList';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { setEmployees } = useContext(ContextWorkers);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const seed = searchParams.get('seed');
        if (seed) {
            setSearchTerm(seed);
            fetchEmployees(seed);
        }
    }, [location]);

    const fetchEmployees = async (seed) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://randomuser.me/api/`, {
                params: {
                    results: 10,
                    seed: seed
                }
            });
            setEmployees(response.data.results);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Failed to fetch employees. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        navigate(`/?seed=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div className="home">
            <h1>Employee Search</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Enter company name (seed)"
                />
                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            <EmployeeList />
        </div>
    );
};

export default Home;