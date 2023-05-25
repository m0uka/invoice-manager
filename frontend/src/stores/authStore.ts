import { create } from 'zustand'
import axios from 'axios';
import { Result } from '../api';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
	jwt: string | null
	username: string | null
	signIn: (username: string, password: string) => Result<string>
	register: (username: string, password: string) => Result<string>
	signOut: () => void;
}

export const useAuthState = create<AuthState>()(
	persist(
		(set) => ({
			jwt: null,
			username: null,
			signIn: async (username: string, password: string) => {
				try {
					const response = await axios.post(`/v1/auth/sign-in`, {
						username,
						password
					});

					set({jwt: response.data, username});
					localStorage.setItem('jwt', response.data);
					return Result.OK(response.data);
				} catch (err: any) {
					return Result.Failure(err.response.data);
				}

			},
			register: async (username: string, password: string) => {
				try {
					const response = await axios.post(`/v1/auth/register`, {
						username,
						password
					});

					set({jwt: response.data, username});
					localStorage.setItem('jwt', response.data);
					return Result.OK(response.data);
				} catch (err: any) {
					return Result.Failure(err.response.data);
				}
			},
			signOut: () => {
				set({jwt: null, username: null});
				window.location.href = '/auth';
			}
		}),
		{
			name: 'auth-state',
		}
	))