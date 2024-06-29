import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse } from './interfaces/user/user.interface';

interface AuthState {
  user: UserResponse | null;
  login: (userData: UserResponse, newRepoLoginValue?: boolean) => void;
  logout: () => void;
}

const updateUserRepoLogin = (user: UserResponse, newValue: boolean): UserResponse => {
  return {
    ...user,
    repo_login: newValue,
  };
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      login: (userData, newRepoLoginValue) =>
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        set((_) => ({
          user: newRepoLoginValue
            ? updateUserRepoLogin(userData, newRepoLoginValue)
            : userData,
        })),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      logout: () => set((_) => ({ user: null })),
    }),
    {
      name: 'auth-store',
      getStorage: () => localStorage,
    }
  )
);