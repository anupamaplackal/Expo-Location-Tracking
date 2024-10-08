import { AxiosError, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

type ApiFunction<T, P = any> = (params?: P) => Promise<AxiosResponse<T>>;

interface ApiCallResult<T> {
  execute: (params?: any) => void;
  isLoading: boolean;
  response: T | null;
  error: AxiosError | null;
}

const useApiCall = <T, P = any>(
  apiFunction: ApiFunction<T, P>
): ApiCallResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const execute = useCallback(
    async (params?: P) => {
      setIsLoading(true);
      setResponse(null);
      setError(null);

      try {
        const result = await apiFunction(params);
        setResponse(result.data);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction]
  );

  return { execute, isLoading, response, error };
};

export default useApiCall;
