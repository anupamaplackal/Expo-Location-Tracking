import useApiCall from '@hooks/api/useApiCall';
import useApiService from '@hooks/api/useApiService';
import { AxiosProgressEvent } from 'axios';

export interface FileUploadResponse {
  files?: Array<FilesEntity>;
}
export interface FilesEntity {
  url: string;
}

const useFileUploadApi = () => {
  const { upload } = useApiService();

  const fileUpload = async (
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    return upload<FileUploadResponse>(
      '/user/fileUpload',
      file,
      onUploadProgress
    );
  };

  return {
    fileUpload: useApiCall<
      FileUploadResponse,
      {
        file: File;
        onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
      }
    >(async (params) => {
      if (!params) throw new Error('Missing parameters for file upload');

      const { file, onUploadProgress } = params;

      return fileUpload(file, onUploadProgress);
    }),
  };
};

export default useFileUploadApi;
