import * as jwtDecode from 'jwt-decode';

export const userDetails = ()  => {
  const token = sessionStorage.getItem('jwtToken');
  return {
    isAuthenticated: !!token,
    user: token ? jwtDecode(token) : null
  };
};
