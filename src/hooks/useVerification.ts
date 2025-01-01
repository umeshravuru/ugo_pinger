import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { pb } from '../lib/pocketbase';

export function useVerification() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const verifyAccount = async () => {
        const token = searchParams.get('token');

        if (!token) {
            setError('Verification token is missing');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await pb.collection('users').confirmVerification(token);
            navigate('/login?verified=true');
        } catch (err: any) {
            setError(err.message || 'Failed to verify account');
        } finally {
            setIsLoading(false);
        }
    };

    return { verifyAccount, isLoading, error };
}