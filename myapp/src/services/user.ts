import type { User } from '@/models/user';

export let data: User;
export let isLoading = false;
export let error: string | null = null;

export const getAllUser = async (): Promise<User | null> =>   {
  isLoading = true;
  try {
    const $session = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(
      `${import.meta.env.VITE_BACK_URI}/users`,
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
