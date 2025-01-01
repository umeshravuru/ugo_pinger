import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import type { Check } from '../types/check';

export function useChecks() {
    const [checks, setChecks] = useState<Check[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isSubscribed = true;

        async function fetchChecks() {
            try {
                const records = await pb.collection('checks').getList(1, 50, {
                    filter: `user_id.id = "${pb.authStore.model?.id}"`,
                });

                if (isSubscribed) {
                    setChecks(records.items as Check[]);
                }
            } catch (err) {
                if (isSubscribed) {
                    setError('Failed to load checks');
                }
            } finally {
                if (isSubscribed) {
                    setIsLoading(false);
                }
            }
        }

        if (pb.authStore.model?.id) {
            fetchChecks();
        } else {
            setIsLoading(false);
        }

        return () => {
            isSubscribed = false;
        };
    }, []);

    return { checks, isLoading, error };
}