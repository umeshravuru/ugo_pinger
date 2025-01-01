import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {pb} from '../lib/pocketbase';
import type {LoginData, AuthError} from '../types/auth';

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<AuthError>({});
    const navigate = useNavigate();

    const login = async (data: LoginData) => {
        setIsLoading(true);
        setErrors({});

        try {
            const authData = await pb.collection('users').authWithPassword(data.email, data.password);
            console.error(authData);
            if (!authData.record.verified) {
                throw new Error('Your email address is not verified. Please verify your email before logging in.');
            }
            navigate('/dashboard');
        } catch (error: any) {
            setErrors({
                email: error.message.includes("not verified") ? error.message : 'Invalid email or password',
                password: error.message.includes("not verified") ? "" : 'Invalid email or password'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {login, isLoading, errors};
}