import React, { createContext, FC, useState } from 'react';


type User = {
  email: string;
  password: string;
  connected: boolean;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string, connected: boolean) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider: FC<{ children: any }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const signIn = (email: string, password: string) => {
    setUser({ email, password, connected: false});
    if(email === 'admin' && password === 'admin') {
      setUser({ email, password, connected: true});
    } else {
      console.log('erreur mot de passe ou login')
    }
   
    
  };

  const signOut = () => {
    setUser(null);
  };

  

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
