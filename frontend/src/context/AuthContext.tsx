import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');

        // Check: Kya token aur user dono mojood hain aur kya user valid JSON hai?
        if (savedToken && savedUser && savedUser !== "undefined" && savedUser !== "null") {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } else {
          // Agar data kharab hai toh storage saaf kar dein
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.clear(); // Kisi bhi error ki surat mein storage saaf karein
      } finally {
        setLoading(false); // Har haal mein loading band karein
      }
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, userData: any) => {
    if (!newToken || !userData) {
      console.error("Login failed: Missing token or user data");
      return;
    }
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);