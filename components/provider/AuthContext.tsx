import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import { Alert, ActivityIndicator  } from 'react-native';
import { API_URL } from '@env';


type User = {
  email: string;
  password: string;
  connected: boolean;
  isEmailVerified: boolean;
  firstconnexion: boolean|null;
  type: string|null;
};

type AuthContextType = {
  user: User | null;
  error: {error_msg: string, code_error: number} | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string, connected: boolean) => void;
  signOut: () => void;
  setError: (error: {error_msg: string, code_error: number}) => void;
};



export const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
  setUser: () => {},
  signIn: () => {},
  signOut: () => {},
  setError: () => {},
});

const getUserFromAsync = async (request: string) => { 
  await axios.get(request)
  .then(async response => {
    // handle the response data
    await SecureStore.setItemAsync('login_jwt',response.data.access_token);
  })
  .catch(error => {
    // handle the error
    console.error(error);
});
}


const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Utilisation des variables d'environnement

  const APIurl = API_URL;
  console.log(APIurl);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User | null>({
    email: '',
    password: '',
    connected: false,
    isEmailVerified: false,
    firstconnexion: null,
    type: null,
  });

  const [error, setError] = useState({
    error_msg: 'noerror' as string,
    code_error: 0 as number,
  });

  const [authState, setAuthState] = useState({
    accessToken: '',
    refreshToken: '',
    authenticated: false,
  });


  const signIn = async (email: string, password: string) => {
    setIsLoading(true); // Activer l'indicateur de chargement
  
    const request = APIurl + `/auth/connect/${email}/${password}`;
    // Récupération du token
    try {
      const response = await axios.get(request);
      const accessToken = response.data.access_token;
      await SecureStore.setItemAsync('login_jwt', accessToken);
      const { exp } = jwt_decode(accessToken);
      
      //Vérification de la validité du token en comparant la date d'expiration avec la date actuelle
      if (exp < Date.now() / 1000) {
        await SecureStore.deleteItemAsync('login_jwt');
        setAuthState({
          accessToken: '',
          refreshToken: '',
          authenticated: false,
        });
        setError({
          error_msg: 'le code est expiré' as string,
          code_error: 20 as number,
        });
        Alert.alert('Erreur de connexion', 'Identifiant ou mot de passe', [
          { text: 'OK' },
        ]);
        setUser({
          email,
          password,
          connected: false,
          isEmailVerified: false,
          firstconnexion: false,
          type: null,
        });
      } else {
        console.log('Connexion : '+response.data.first_connexion);
        setError({
          error_msg: 'noerror' as string,
          code_error: 200 as number,
        });
        setAuthState({
          accessToken,
          refreshToken: accessToken,
          authenticated: true,
        });
        setUser({
          email,
          password,
          connected: true,
          isEmailVerified: response.data.isEmailVerified,
          firstconnexion: response.data.first_connexion,
          type: response.data.type,
        });
      }
    } catch (error: any) {
      Alert.alert('Erreur de connexion', 'Identifiant ou mot de passe incorrect', [
        { text: 'OK' },
      ]);
      setError({
        error_msg: 'error',
        code_error: 20,
      });
      setUser({
        email,
        password,
        connected: false,
        isEmailVerified: false,
        firstconnexion: null,
        type: null,
      });
    } finally {
      setIsLoading(false); // Désactiver l'indicateur de chargement
    }
  };
  
// Création d'un compte utilisateur lors de la connexion en tant qu'invité
  const GuestSignIn = async (email: string, password: string, type: string) => {
    console.log('dans le AuthContext : '+type)
    setIsLoading(true);
    const request = APIurl+`/users`;
      axios({
        method: 'post',
        url: APIurl + 'applications/users',
        headers: {"Content-Type" : "application/json"}, 
        data: {
          "email": email,
          "password": password,
          "type": type,
          "username": email,
          "isEmailVerified": false, 
          "verificationToken": '',
          "first_connexion": true,
        }
      });

      axios.post(request, {
      email: email,
      password: password,
      username: email,
      type: type,
      isEmailVerified: false, 
      verificationToken: '',
      first_connexion: true,
    })
    .then((response) => {
      console.log(response);
      setError({ error_msg: 'Pas erreur' as string,
      code_error: 200 as number,}
      )
      
    })
    .catch((error) => {
      console.error(error.response.data.message);
      // Afficher un message d'erreur approprié à l'utilisateur
      setError({error_msg: error.response.data.message,
        code_error: error.response.status})

        Alert.alert('Erreur de connexion', 'Cet email est déjà enregistré', [
          {text: 'OK'},
        ]);
    }).finally(() => {
      setIsLoading(false); // Désactiver l'indicateur de chargement
    });;
    
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('login_jwt');
    setUser({ email: '', password: '', connected: false, isEmailVerified: false, firstconnexion: null, type: null});
    setAuthState({
      accessToken: '',
      refreshToken: '',
      authenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut, error, GuestSignIn, setError, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
