import React, { createContext, ReactNode, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import { Alert  } from 'react-native';
import { API_URL } from '@env';


type User = {
  id: number|null;
  email: string;
  connected: boolean;
  isEmailVerified: boolean;
  firstconnexion: boolean|null;
  type: string|null;
  profile_picture: string|null;
};

type DecodedToken = {
  exp: number;
  // définir ici d'autres champs que vous attendez dans le token
};

type AuthContextType = {
  user: User | null;
  error: {error_msg: string, code_error: number} | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string, connected: boolean) => void;
  signOut: () => void;
  setError: (error: {error_msg: string, code_error: number}) => void;
  GuestSignIn: (email: string, password: string, type: string) => void | null;
  authState: {accessToken: string, refreshToken: string, authenticated: boolean} | null;
};



export const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
  authState: null,
  setUser: () => {},
  signIn: () => {},
  GuestSignIn: () => {},
  signOut: () => {},
  setError: () => {},
 
});


const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //define my API url
  const APIurl = API_URL;
  //Set the state of the loading indicator
  const [isLoading, setIsLoading] = useState(false);
  //Set the state of the user
  const [user, setUser] = useState<User | null>({
    id: null,
    email: '',
    connected: false,
    isEmailVerified: false,
    firstconnexion: null,
    type: null,
    profile_picture: null,
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
    console.log(request);
    // Token
    try {
      const response = await axios.get(request);
      const accessToken = response.data.access_token;
      await SecureStore.setItemAsync('login_jwt', accessToken);
      const { exp } = jwt_decode<DecodedToken>(accessToken);
      
      //Verify if the token is expired, else if it is not expired, we set the user state
      if (exp < Date.now() / 1000) {
        await SecureStore.deleteItemAsync('login_jwt');
        //set the user accessToken to test it when we will use the app
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
          id: null,
          email,
          connected: false,
          isEmailVerified: false,
          firstconnexion: false,
          type: null,
          profile_picture: null,
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
          id: response.data._id,
          email,
          connected: true,
          isEmailVerified: response.data.isEmailVerified,
          firstconnexion: response.data.first_connexion,
          type: response.data.type,
          profile_picture: response.data.profile_picture,
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
        id: null,
        email,
        connected: false,
        isEmailVerified: false,
        firstconnexion: null,
        type: null,
        profile_picture: null,
      });
    } finally {
      setIsLoading(false); // Désactiver l'indicateur de chargement
    }
  };
  
// Création d'un compte utilisateur lors de la connexion en tant qu'invité
  const GuestSignIn = async (email: string, password: string, type: string) => {
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
          'phone': '',
          'firstname': '',
          'lastname': '',
          'role' : '',
          'address': '',
          'bool_newsletter': false,
          
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
      phone: '',
      first_name: '',
      last_name: '',
      role : '',
      address: '',
      bool_newsletter: false,
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
    setUser({ id: 0, email: '', connected: false, isEmailVerified: false, firstconnexion: null, type: null, profile_picture: null});
    setAuthState({
      accessToken: '',
      refreshToken: '',
      authenticated: false,
    });

  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut, error, GuestSignIn, setError, isLoading, authState }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
