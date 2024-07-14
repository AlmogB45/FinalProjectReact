import React, {createContext, useState, useEffect} from 'react';
export const ContextWorkers = createContext();

export const ContextProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const addFavorite = (employee) => {
        const newFavorites = [...favorites, employee];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const removeFavorite = (employeeId) => {
        const newFavorites = favorites.filter(emp => emp.login.uuid !== employeeId);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    return (
        <ContextWorkers.Provider value = {{employees, setEmployees, favorites, addFavorite, removeFavorite}}>
            {children}
        </ContextWorkers.Provider>
    );
};