import { UUID } from 'crypto';

export interface Ticket {
    id: UUID;
    title: string;
    description: string | null;
    contact_info: string | null;
    status: 'Pending' | 'Accepted' | 'Resolved' | 'Rejected';
    created_at: Date;
    updated_at: Date;
}
