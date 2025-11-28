'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { Auth, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useFirebase } from '@/firebase';

type UserProfile = {
  name: string;
  email: string;
  image?: string;
  role: 'member' | 'admin' | 'manager';
};

type AuthContextType = {
  user: (User & UserProfile) | null;
  logout: () => void;
  isLoggedIn: boolean;
  isUserLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: firebaseUser, isUserLoading, auth, firestore } = useFirebase();
  const [user, setUser] = useState<(User & UserProfile) | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const syncUserProfile = async (fbUser: User | null) => {
      if (fbUser && firestore) {
        try {
          const userDocRef = doc(firestore, 'userProfiles', fbUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userProfile = userDoc.data() as UserProfile;
            setUser({ ...fbUser, ...userProfile });
          } else {
            // If profile doesn't exist, use basic info from auth
            // This might happen right after sign-up before the profile is created.
            setUser({
              ...fbUser,
              name: fbUser.displayName || 'New User',
              email: fbUser.email || '',
              role: 'member', // Default role
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to auth data if Firestore fetch fails
          setUser({
            ...fbUser,
            name: fbUser.displayName || 'New User',
            email: fbUser.email || '',
            role: 'member',
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };
    
    syncUserProfile(firebaseUser);

  }, [firebaseUser, firestore]);

  const logout = async () => {
    if (auth) {
      await auth.signOut();
      setUser(null);
      // Redirect to home or login page after sign out
      window.location.href = '/';
    }
  };

  const value = {
    user,
    logout,
    isLoggedIn: !!user,
    isUserLoading: isLoading || isUserLoading,
  };

  return (
    <AuthContext.Provider value={value}>
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
