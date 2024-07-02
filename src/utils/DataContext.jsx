import React, { createContext, useContext } from 'react';
import useFetchData from '../hooks/useFetchData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { categories, posts, categoryLoading, postLoading } = useFetchData();

  return (
    <DataContext.Provider value={{ categories, posts, categoryLoading, postLoading }}>
      {children}
    </DataContext.Provider>
  );
};
