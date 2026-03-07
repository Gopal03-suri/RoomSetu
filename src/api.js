const API_BASE_URL = '/api';

// Helper function to get CSRF token
function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith('csrftoken=')) {
      return cookie.substring('csrftoken='.length);
    }
  }
  return null;
}

// Helper for API fetch calls with CSRF
async function apiFetch(url, options = {}) {
  const csrfToken = getCSRFToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    ...options.headers,
  };
  
  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}

export const api = {
  // Check if user exists by email in Django backend
  checkUserByEmail: async (email) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/auth/check-user/`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      console.error('API Check User Error:', error);
      throw error;
    }
  },

  // Auth endpoints
  signup: async (userData) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/auth/signup/`, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      console.error('API Signup Error:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    const response = await apiFetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  },

  logout: async () => {
    const response = await apiFetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/current/`, {
      credentials: 'include',
    });
    return response.json();
  },

  // Phone Authentication endpoints
  verifyPhoneLogin: async (idToken, phoneNumber) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/auth/verify-phone-login/`, {
        method: 'POST',
        body: JSON.stringify({
          id_token: idToken,
          phone_number: phoneNumber,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      console.error('API Verify Phone Error:', error);
      throw error;
    }
  },

  saveRole: async (phoneNumber, firebaseUid, role, name = '', city = '') => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/auth/save-role/`, {
        method: 'POST',
        body: JSON.stringify({
          phone_number: phoneNumber,
          firebase_uid: firebaseUid,
          role: role,
          name: name,
          city: city,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      console.error('API Save Role Error:', error);
      throw error;
    }
  },

  checkPhoneExists: async (phoneNumber) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/auth/check-phone/`, {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      console.error('API Check Phone Error:', error);
      throw error;
    }
  },

  // Properties endpoints
  getProperties: async () => {
    const response = await fetch(`${API_BASE_URL}/properties/`);
    return response.json();
  },

  getProperty: async (id) => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}/`);
    return response.json();
  },

  createProperty: async (data) => {
    const response = await apiFetch(`${API_BASE_URL}/properties/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Roommates endpoints
  getRoommates: async () => {
    const response = await fetch(`${API_BASE_URL}/roommates/`);
    return response.json();
  },

  // Chat endpoints
  getChats: async () => {
    const response = await apiFetch(`${API_BASE_URL}/chats/`, {});
    return response.json();
  },

  sendMessage: async (chatId, text) => {
    const response = await apiFetch(`${API_BASE_URL}/chats/${chatId}/send_message/`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    return response.json();
  },
};
