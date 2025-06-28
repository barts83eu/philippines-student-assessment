import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { User, AuthState } from '../types';
import { trackUserLogin, trackUserRegistration } from '../utils/analytics';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  clearError: () => void;
  getTestAccounts: () => Array<{ email: string; password: string; profile: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  grade: number;
  preferredLanguage: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced mock user database with diverse test accounts
const mockUsers: Array<User & { password: string; isTestAccount: boolean }> = [
  {
    id: 'user-001',
    email: 'maria.santos@email.com',
    password: 'student2024',
    firstName: 'Maria',
    lastName: 'Santos',
    age: 14,
    grade: 8,
    preferredLanguage: 'en',
    createdAt: new Date('2024-01-15'),
    lastLoginAt: new Date('2024-12-01'),
    isTestAccount: true
  },
  {
    id: 'user-002',
    email: 'juan.dela.cruz@email.com',
    password: 'pinoy123',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    age: 16,
    grade: 10,
    preferredLanguage: 'tl',
    createdAt: new Date('2024-02-20'),
    lastLoginAt: new Date('2024-11-28'),
    isTestAccount: true
  },
  {
    id: 'user-003',
    email: 'ana.reyes@email.com',
    password: 'math2024',
    firstName: 'Ana',
    lastName: 'Reyes',
    age: 12,
    grade: 6,
    preferredLanguage: 'en',
    createdAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2024-12-02'),
    isTestAccount: true
  },
  {
    id: 'user-004',
    email: 'carlos.garcia@email.com',
    password: 'science123',
    firstName: 'Carlos',
    lastName: 'Garcia',
    age: 17,
    grade: 11,
    preferredLanguage: 'bsy',
    createdAt: new Date('2024-04-05'),
    lastLoginAt: new Date('2024-11-30'),
    isTestAccount: true
  },
  {
    id: 'user-005',
    email: 'sofia.martinez@email.com',
    password: 'reading2024',
    firstName: 'Sofia',
    lastName: 'Martinez',
    age: 13,
    grade: 7,
    preferredLanguage: 'hlg',
    createdAt: new Date('2024-05-12'),
    lastLoginAt: new Date('2024-12-01'),
    isTestAccount: true
  },
  {
    id: 'user-006',
    email: 'miguel.torres@email.com',
    password: 'student456',
    firstName: 'Miguel',
    lastName: 'Torres',
    age: 15,
    grade: 9,
    preferredLanguage: 'il',
    createdAt: new Date('2024-06-18'),
    lastLoginAt: new Date('2024-11-29'),
    isTestAccount: true
  },
  {
    id: 'user-007',
    email: 'isabella.cruz@email.com',
    password: 'pisa2024',
    firstName: 'Isabella',
    lastName: 'Cruz',
    age: 18,
    grade: 12,
    preferredLanguage: 'en',
    createdAt: new Date('2024-07-22'),
    lastLoginAt: new Date('2024-12-02'),
    isTestAccount: true
  },
  {
    id: 'user-008',
    email: 'rafael.santos@email.com',
    password: 'assessment123',
    firstName: 'Rafael',
    lastName: 'Santos',
    age: 11,
    grade: 5,
    preferredLanguage: 'tl',
    createdAt: new Date('2024-08-14'),
    lastLoginAt: new Date('2024-11-27'),
    isTestAccount: true
  },
  {
    id: 'user-009',
    email: 'camila.rodriguez@email.com',
    password: 'skills2024',
    firstName: 'Camila',
    lastName: 'Rodriguez',
    age: 10,
    grade: 4,
    preferredLanguage: 'en',
    createdAt: new Date('2024-09-08'),
    lastLoginAt: new Date('2024-12-01'),
    isTestAccount: true
  },
  {
    id: 'user-010',
    email: 'diego.fernandez@email.com',
    password: 'learning123',
    firstName: 'Diego',
    lastName: 'Fernandez',
    age: 9,
    grade: 3,
    preferredLanguage: 'bsy',
    createdAt: new Date('2024-10-03'),
    lastLoginAt: new Date('2024-11-26'),
    isTestAccount: true
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const storedUser = localStorage.getItem('studentassessment_user');
        const storedToken = localStorage.getItem('studentassessment_token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          // In production, validate token with backend
          setAuthState({
            user: {
              ...user,
              createdAt: new Date(user.createdAt),
              lastLoginAt: new Date(user.lastLoginAt)
            },
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkExistingSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Invalid email or password'
        }));
        return false;
      }

      const { password: _, isTestAccount: __, ...userWithoutPassword } = user;
      const updatedUser = {
        ...userWithoutPassword,
        lastLoginAt: new Date()
      };

      // Store in localStorage (in production, use secure token storage)
      localStorage.setItem('studentassessment_user', JSON.stringify(updatedUser));
      localStorage.setItem('studentassessment_token', `token_${user.id}_${Date.now()}`);

      // Track login event
      trackUserLogin('email');

      // Mark login in database (simulate database update)
      if (user.isTestAccount) {
        console.log(`✅ Test Account Login: ${user.email} - ${user.firstName} ${user.lastName} (Grade ${user.grade})`);
      }

      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please try again.'
      }));
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'An account with this email already exists'
        }));
        return false;
      }

      // Create new user
      const newUser: User & { password: string; isTestAccount: boolean } = {
        id: `user-${Date.now()}`,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        grade: userData.grade,
        preferredLanguage: userData.preferredLanguage,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isTestAccount: false
      };

      // Add to mock database
      mockUsers.push(newUser);

      const { password: _, isTestAccount: __, ...userWithoutPassword } = newUser;

      // Store in localStorage
      localStorage.setItem('studentassessment_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('studentassessment_token', `token_${newUser.id}_${Date.now()}`);

      // Track registration event
      trackUserRegistration('email');

      console.log(`✅ New Account Created: ${newUser.email} - ${newUser.firstName} ${newUser.lastName}`);

      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed. Please try again.'
      }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('studentassessment_user');
    localStorage.removeItem('studentassessment_token');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = { ...authState.user, ...userData };
      
      // Update in mock database
      const userIndex = mockUsers.findIndex(u => u.id === authState.user!.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      }

      // Update localStorage
      localStorage.setItem('studentassessment_user', JSON.stringify(updatedUser));

      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false
      }));

      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update profile'
      }));
      return false;
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  const getTestAccounts = () => {
    return mockUsers
      .filter(user => user.isTestAccount)
      .map(user => ({
        email: user.email,
        password: user.password,
        profile: `${user.firstName} ${user.lastName} - Grade ${user.grade}, Age ${user.age} (${user.preferredLanguage.toUpperCase()})`
      }));
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
      clearError,
      getTestAccounts
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};