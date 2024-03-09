import  { createContext } from 'react';

export const CurrentUserContext = createContext({
    jwt: localStorage.getItem('jwt'),
    name: createContext.name,
    email: createContext.email
    }
);

