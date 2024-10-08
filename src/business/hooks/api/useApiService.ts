import useUserStateStore from '@state/useUserStateStore';
import { getBaseURL } from '@utils/getBaseURL';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosProgressEvent,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useMemo } from 'react';

interface ApiService {
  get: <T>(endpoint: string, params?: object) => Promise<AxiosResponse<T>>;
  post: <T>(endpoint: string, data?: object) => Promise<AxiosResponse<T>>;
  put: <T>(endpoint: string, data?: object) => Promise<AxiosResponse<T>>;
  del: <T>(endpoint: string, data?: object) => Promise<AxiosResponse<T>>;
  patch: <T>(endpoint: string, data?: object) => Promise<AxiosResponse<T>>;
  upload: <T>(
    endpoint: string,
    file: any,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => Promise<AxiosResponse<T>>;
  setAccessToken: (token: string) => void;
}

const useApiService = (): ApiService => {
  const baseURL = getBaseURL();
  const { token, setToken } = useUserStateStore();

  const api: AxiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: baseURL,
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log(
          `[Request] ${config.method?.toUpperCase()} - ${config.baseURL}${
            config.url
          }\nDATA: ${JSON.stringify(config.data)}`
        );
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          config.headers['x-access-token'] = `${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        console.error(
          `Request [Error]:${error} ${error.config?.baseURL}${
            error.config?.url
          }\n${JSON.stringify(error.response?.data)}`
        );
        return Promise.reject(error);
      }
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `[Response] ${response.status} - ${response.config.baseURL}${
            response.config.url
          }\nDATA : ${JSON.stringify(response.data)}`
        );
        return response;
      },
      (error: AxiosError) => {
        console.error(
          `Response [Error]:  ${error} ${error.config?.baseURL}${
            error.config?.url
          }\n${JSON.stringify(error.response?.data)}`
        );
        return Promise.reject(error);
      }
    );

    return instance;
  }, [baseURL]);
  const setAccessToken = (token: string) => {
    setToken(token);
  };

  const get = <T>(
    endpoint: string,
    params: object = {}
  ): Promise<AxiosResponse<T>> => {
    return api.get<T>(endpoint, { params });
  };

  const post = <T>(
    endpoint: string,
    data: object = {}
  ): Promise<AxiosResponse<T>> => {
    return api.post<T>(endpoint, data);
  };

  const put = <T>(
    endpoint: string,
    data: object = {}
  ): Promise<AxiosResponse<T>> => {
    return api.put<T>(endpoint, data);
  };

  const del = <T>(
    endpoint: string,
    data: object = {}
  ): Promise<AxiosResponse<T>> => {
    return api.delete<T>(endpoint, { data });
  };

  const patch = <T>(
    endpoint: string,
    data: object = {}
  ): Promise<AxiosResponse<T>> => {
    return api.patch<T>(endpoint, data);
  };

  const upload = <T>(
    endpoint: string,
    file: any,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ): Promise<AxiosResponse<T>> => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post<T>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onUploadProgress) {
          onUploadProgress(progressEvent);
        }
      },
    });
  };

  return { get, post, put, del, patch, upload, setAccessToken };
};

export default useApiService;
