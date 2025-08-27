import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { setupAxiosInterceptors } from '../utils/axiosConfig';

const Auth = ({ children }) => {
  const { getToken } = useAuth();
  const [isInterceptorSetup, setIsInterceptorSetup] = useState(false);

  useEffect(() => {
    setupAxiosInterceptors(getToken);
    setIsInterceptorSetup(true);
  }, [getToken]);

  if (!isInterceptorSetup) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default Auth;