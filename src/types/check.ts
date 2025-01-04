export interface Check {
    id: string;
    user_id: string;
    last_ping_time: string;
    site_name: string;
    cron_time: number;
    max_notifications: number;
    sent_notification_count: number;
    created: string;
    updated: string;
}