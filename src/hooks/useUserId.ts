import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { isLoggedIn, getAccessToken } from 'axios-jwt'; // Replace with your actual authentication utils

const useUserId = () => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [hasLogin, setHasLogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp = await isLoggedIn();
        if (tmp) {
          setHasLogin(tmp);
          const accessToken = await getAccessToken();
          const decodedToken = jwtDecode(accessToken);
          setUserId(decodedToken.userId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { userId, hasLogin };
};

export default useUserId;
