interface SessionUser {
    id: string;
    firstName: string;
    lastName: string;
}

interface SessionDashboard {
    id: string;
    refreshInterval: number;
}

export interface Session {
    user: SessionUser | null;
    dashboard: SessionDashboard | null;
};