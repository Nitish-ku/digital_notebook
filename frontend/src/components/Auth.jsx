import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { setupAxiosInterceptors } from '../utils/axiosConfig';

const Auth = ({ children }) => {
  const { getToken } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors(getToken);
  }, [getToken]);

  return <>{children}</>;
};

export default Auth;
