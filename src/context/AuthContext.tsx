import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User } from '../types/user';
import { getMeAPI } from '../services/auth.service';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    accessToken: string,
    refreshToken: string,
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStoredToken(): string | null {
  return (
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken')
  );
}

function clearAllTokens(): void {
  ['accessToken', 'refreshToken', 'userId'].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getStoredToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    getMeAPI(token)
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => {
        console.warn('Auth bootstrap failed, clearing tokens:', err.message);
        clearAllTokens();
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (
    accessToken: string,
    refreshToken: string,
    rememberMe: boolean
  ): Promise<void> => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('accessToken', accessToken);
    storage.setItem('refreshToken', refreshToken);
    setIsLoading(true);
    try {
      const userData = await getMeAPI(accessToken);
      setUser(userData);
    } catch (err) {
      clearAllTokens();
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    clearAllTokens();
    setUser(null);
  };

  const refetchUser = async (): Promise<void> => {
    const token = getStoredToken();
    if (!token) return;

    try {
      const userData = await getMeAPI(token);
      setUser(userData);
    } catch (err) {
      console.warn('Refetch user failed:', err);
      logout();
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refetchUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}