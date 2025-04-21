export const getAuthToken = () => {
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
  
    return cookieToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZmU0YTBlZC00MjA2LTRhNzctOTYxMC01MzJkODlmYWZjODAiLCJ1c2VyX2lkIjoiN2ZlNGEwZWQtNDIwNi00YTc3LTk2MTAtNTMyZDg5ZmFmYzgwIiwicm9sZXMiOlsidXNlciJdLCJleHAiOjE3OTQ3MTgxNzV9.ekdHLKoK_y35JH3nw0GIp3wHO-GFX8Sy7aOkDSEndXQ";
  };
  