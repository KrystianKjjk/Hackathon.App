import { useState } from 'react';

const useHttp = (url:string, method:string, payload?:any, validateFunction?:any, authToken?:any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');


  const httpRequest = async () => {
    const fetchOptions =
      method === 'GET' || method === 'DELETE'
        ? {
            method: method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': authToken
            },
          }
        : {
            method: method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': authToken
            },
            body: JSON.stringify(payload),
          };
    return fetch(url, fetchOptions);
  };

  const makeHttpRequest = async () => {
    setIsLoading(true);
    try {
      const response = await httpRequest();
      const data = await response.json();
      setIsLoading(false);
      setData(data);
      return data;
    } catch (error) {
      setError(error);
      return error;
    }
  };

  const handleHttpRequest = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const error = await validateFunction(payload);
    if (!error) {
      makeHttpRequest();
    } else {
      setError(error);
    }
  };

  return { isLoading, handleHttpRequest, makeHttpRequest, data, error };
};

export default useHttp;
