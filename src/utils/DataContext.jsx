import React, { createContext, useContext } from 'react';
import useGetRequest from '../hooks/useGetRequest';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { loading: categoryLoading, data: categories } = useGetRequest("categories");
  const { loading: postLoading, data: posts } = useGetRequest("posts");

  return (
    <DataContext.Provider value={{ categories, posts, categoryLoading, postLoading }}>
      {children}
    </DataContext.Provider>
  );
};
