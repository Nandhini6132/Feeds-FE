const BASE_URL = `https://feeds-be.onrender.com`;

const refreshAccessToken = async () => {
  try {
    const res = await fetch(`${BASE_URL}/feeds/refreshToken`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();
    localStorage.setItem('token', data.accessToken);
    return true;
  } catch (error) {
    return false;
  }
};

const apiCLient = async <T = any>(
  endpoint: string,
  method: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem('token');

  const config: RequestInit= {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...method,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiCLient<T>(endpoint, config);
    }
  }
  try {
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export default apiCLient;

