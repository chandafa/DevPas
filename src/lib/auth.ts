// MOCK AUTH
// In a real app, you'd use a library like next-auth or a context with Firebase auth.

// We'll use a simple localStorage check to persist login state across reloads for a better demo experience.
import { useState, useEffect } from 'react';

const MOCK_USER = {
  name: 'Alex',
  email: 'alex@example.com',
  image: 'https://picsum.photos/seed/user-alex/100/100',
};

export const useAuth = () => {
  const [user, setUser] = useState<typeof MOCK_USER | null>(null);

  useEffect(() => {
    // This runs only on the client
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setUser(MOCK_USER);
    }
  }, []);

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setUser(MOCK_USER);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setUser(null);
  };

  return { user, login, logout, isLoggedIn: !!user };
};
