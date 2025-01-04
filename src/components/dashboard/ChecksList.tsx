import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { Check } from '../../types/check';

interface ChecksListProps {
    checks: Check[];
    isLoading: boolean;
    error: string | null;
}

export function ChecksList({ checks, isLoading, error }: ChecksListProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-8 text-red-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
            </div>
        );
    }

    if (checks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No checks found
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Ping</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cron Time (sec)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notifications Sent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {checks.map((check) => (
                    <tr key={check.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{check.site_name}</div>
                            <div className="text-xs text-gray-500">ID: {check.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {check.last_ping_time ? new Date(check.last_ping_time).toLocaleString() : "N/A"}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{check.cron_time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{check.sent_notification_count}/{check.max_notifications}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {new Date(check.created).toLocaleString()}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {new Date(check.updated).toLocaleString()}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}