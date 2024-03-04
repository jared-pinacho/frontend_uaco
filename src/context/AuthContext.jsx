import { createContext, useContext, useState, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import { enc, AES } from "crypto-js";
import Cookies from 'js-cookie';
const MY_AUTH_APP = "DoFA45-M0pri";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    (Cookies.get('tok'))?(true):(false)
  );
  const [userData,setUserData]=useState(null);
  

  const encrypt = (data) => {
    const encryptedData = AES.encrypt(JSON.stringify(data), MY_AUTH_APP).toString();
    return encryptedData;
  };

  // const decrypt = (encryptedData) => {
  //   const bytes = AES.decrypt(encryptedData, MY_AUTH_APP);
  //   const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
  //   return decryptedData;
  // };

  const login = useCallback(function (userData) {
    setIsAuthenticated(true);
    setUserData(userData);
    const encryptedRol = encrypt(userData.rol);
    Cookies.set('tok', userData.token, { expires: 1/6 });
    Cookies.set('rol', encryptedRol, { expires: 1/6 });
    Cookies.set('nombre', userData.nombre, { expires: 1/6 });
    // localStorage.setItem('tok', userData.token);
    // localStorage.setItem('rol', encryptedRol);
    // localStorage.setItem('nombre', userData.nombre);
    
  }, []);

  const logout = useCallback(function () {
    setIsAuthenticated(false);
    Cookies.remove('tok');
    Cookies.remove('rol');
    Cookies.remove('nombre');
    // localStorage.removeItem('tok');
    // localStorage.removeItem('rol');
    // localStorage.removeItem('nombre');
    setUserData(null);
  }, []);

  const value = useMemo(() => ({login, logout, isAuthenticated,userData}), [
    login,
    logout,
    isAuthenticated,
    userData
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes={
    children: PropTypes.object
};

export function useAuthContext(){
    return useContext(AuthContext)
}
