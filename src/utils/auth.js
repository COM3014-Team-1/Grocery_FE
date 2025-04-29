export const getAuthToken = () => {
  const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
  return cookieToken || "";
};
