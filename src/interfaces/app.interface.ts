export interface User {
    id: string;
    name: string;
    email: string;
    lastActivity: string;
    isPayer: boolean;
    isActive: boolean;
}

export interface UserExternal {
    id: string;
    name: string;
    email: string;
    status: 'enabled' | 'disabled';
    role: 'admin' | 'editor' | 'viewer' | 'system';
    last_activity: number;
}
