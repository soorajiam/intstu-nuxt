// composables/useSsrfetch.js
import { useAsyncData } from 'nuxt/app';

export const useSsrfetch = (url ,params) => {
  return useAsyncData('institutes', async () => {
    const query = new URLSearchParams(params).toString();
    const baseURL = import.meta.env.VITE_ROOT_API
    const queryURL = baseURL+url+'?'+query;
    const response = await fetch(queryURL);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  });
};
