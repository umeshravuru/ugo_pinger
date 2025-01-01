import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useChecks } from '../hooks/useChecks';
import { ChecksList } from '../components/dashboard/ChecksList';
import { Modal } from '../components/ui/Modal';
import { CreateCheckForm } from '../components/dashboard/CreateCheckForm';
import { Button } from '../components/ui/Button';

export function Dashboard() {
    const { user } = useAuth();
    const { checks, isLoading, error } = useChecks();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckCreated = () => {
        setIsModalOpen(false);
        // Reload the page to refresh the checks list
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Welcome back, {user?.email}
                            </p>
                        </div>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="w-auto px-3"
                        >
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <ChecksList
                        checks={checks}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Check To Monitor"
            >
                <CreateCheckForm
                    onSuccess={handleCheckCreated}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}