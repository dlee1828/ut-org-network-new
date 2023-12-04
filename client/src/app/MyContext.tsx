'use client'

import React, { createContext, useState, ReactNode, useContext } from 'react';

export type UserInformation = {
  firstName: string,
  lastName: string,
  year: string,
  email: string,
  major: string,
  list_of_orgs: string[]
} | null


// Define the shape of your context state
interface MyContextState {
  data: UserInformation; // Example property
  setData: (value: UserInformation) => void;
}

// Create the context
export const MyContext = createContext<MyContextState | undefined>(undefined);

// Create a provider component
interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [data, setData] = useState<UserInformation>(null);

  // The value that will be given to the context
  const contextValue = {
    data,
    setData,
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};
