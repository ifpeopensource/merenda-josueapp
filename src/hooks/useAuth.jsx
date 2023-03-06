import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem('auth')) || {
      role: '',
    }
  );

  function setRole(role) {
    setAuth((prevState) => ({ ...prevState, role }));
  }

  function logout() {
    setAuth({ role: '' });
    localStorage.removeItem('auth');
  }

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ ...auth, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  return useContext(AuthContext);
}
