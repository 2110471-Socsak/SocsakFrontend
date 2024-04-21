import type { Group } from '@/models/group';
import type { User } from '../models/user';

export let data: Group | null = null;
export let isLoading = false;
export let error: string | null = null;

export const getAllGroup = async (): Promise<Group | null> =>   {
  isLoading = true;
  try {
    const $session = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(
      `${import.meta.env.VITE_BACK_URI}/groups`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${$session.token}`
        },
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    data = jsonData;
    console.log(data);
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
    error = error;
  } finally {
    isLoading = false;
  }
  return data;
};
