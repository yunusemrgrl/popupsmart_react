import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);

  const registerError = () => toast('auth/email already in use!');
  const loginError = () => toast('auth/email not found!');

  const getUsersData = async () => {
    const response = await axios.get(
      'https://630db812b37c364eb709dbdf.mockapi.io/users',
    );
    setUsers(response.data);
  };
  useEffect(() => {
    getUsersData();
    setUser(localStorage.getItem('users'));
  }, []);

  const register = async ({ email, password }) => {
    let isValid = true;
    users.forEach((user) => {
      if (user.email === email) {
        return (isValid = false);
      }
      return true;
    });
    if (isValid) {
      axios
        .post('https://630db812b37c364eb709dbdf.mockapi.io/users', {
          email,
          password,
        })
        .then(function (response) {
          localStorage.setItem('users', email);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      registerError();
    }
  };
  const login = async ({ email }) => {
    let isValid = false;
    users.forEach((user) => {
      if (user.email === email) {
        return (isValid = true);
      }
      return false;
    });
    if (isValid) {
      localStorage.setItem('users', email);
      window.location.reload();
    } else {
      loginError();
    }
  };
  const logout = () => {
    localStorage.removeItem('users');
    window.location.reload();
  };

  const value = {
    user,
    users,
    register,
    logout,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
