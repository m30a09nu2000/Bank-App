import React, { createContext, useState, useContext,useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  
  console.log(username);
  useEffect(() => {
    
    const storedTokens = localStorage.getItem(username);
    if (storedTokens) {
      const { username } = JSON.parse(storedTokens);
      setUsername(username); 
    }
  }, []);
  
 
 
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};