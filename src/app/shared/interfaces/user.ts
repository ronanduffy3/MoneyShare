import { Roles } from './roles';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    username?: string;
    emailVerified: boolean;
    roles: Roles;
}
