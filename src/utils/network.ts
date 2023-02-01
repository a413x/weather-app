export const request = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return error;
  }
};
