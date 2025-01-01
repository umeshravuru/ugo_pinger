import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pb } from '../lib/pocketbase';

export function useAuth() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);

    useEffect(() => {
        // Listen to auth state changes
        pb.authStore.onChange((token, model) => {
            setIsAuthenticated(pb.authStore.isValid);
            if (!pb.authStore.isValid) {
                navigate('/login');
            }
        });

        // Check initial auth state
        if (!pb.authStore.isValid) {
            navigate('/login');
        }
    }, [navigate]);

    return { isAuthenticated, user: pb.authStore.model };
}