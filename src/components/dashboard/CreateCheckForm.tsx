import React, { useState } from 'react';
import { pb } from '../../lib/pocketbase';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface CreateCheckFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CreateCheckForm({ onSuccess, onCancel }: CreateCheckFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        site_name: '',
        cron_time: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const cronTime = parseInt(formData.cron_time);
            if (isNaN(cronTime) || cronTime <= 0 || cronTime > 604800) {
                setErrors({ cron_time: 'Must be between 1 and 604,800 seconds' });
                return;
            }

            await pb.collection('checks').create({
                site_name: formData.site_name,
                cron_time: cronTime,
                user_id: pb.authStore.model?.id,
            });

            onSuccess();
        } catch (error) {
            setErrors({ submit: 'Failed to create check. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Site Name"
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
                maxLength={50}
                error={errors.site_name}
                required
            />

            <Input
                label="Check Interval (seconds)"
                name="cron_time"
                type="number"
                min="1"
                max="604800"
                value={formData.cron_time}
                onChange={handleChange}
                error={errors.cron_time}
                required
            />

            {errors.submit && (
                <p className="text-red-600 text-sm">{errors.submit}</p>
            )}

            <div className="flex justify-end space-x-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isLoading={isLoading}
                >
                    Create Check
                </Button>
            </div>
        </form>
    );
}