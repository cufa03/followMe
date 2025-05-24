import { isAxiosError } from 'axios';
import api from '../config/axios';
import { User } from '../types';

export async function getUser() {
  try {
    const { data } = await api<User>('/user');
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(`Error in DevTreeApi.ts: ${error.response.data.error}`);
    }
  }
}

export async function updateProfile(formData: User) {
  try {
    const { data } = await api.patch<string>('/user', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(`Error in DevTreeApi.ts: ${error.response.data.error}`);
    }
  }
}
type UploadImageResponse = {
  image: string;
};
export async function uploadImage(file: File): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await api.post<UploadImageResponse>(
      '/user/image',
      formData
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(`Error in DevTreeApi.ts: ${error.response.data.error}`);
    }
    throw new Error('Unknown error while uploading image');
  }
}
