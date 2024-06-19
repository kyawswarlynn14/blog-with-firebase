import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const onStartUp = async () => {
      try {
        const categoriesQuery = query(collection(db, 'categories'));
        const unsubscribeCategories = onSnapshot(categoriesQuery, (querySnapshot) => {
          const categoriesArray = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setCategories(categoriesArray);
          setCategoryLoading(false);
        });
    
        const postsQuery = query(collection(db, 'posts'));
        const unsubscribePosts = onSnapshot(postsQuery, (querySnapshot) => {
          const postsArray = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setPosts(postsArray);
          setPostLoading(false);
        });
    
        return () => {
          unsubscribeCategories();
          unsubscribePosts();
        };
      } catch (err) {
        console.log(err)
        setCategories(false)
        setPostLoading(false)
      }
    }

    onStartUp();
  }, []);

  return (
    <DataContext.Provider value={{ categories, posts, categoryLoading, postLoading }}>
      {children}
    </DataContext.Provider>
  );
};
