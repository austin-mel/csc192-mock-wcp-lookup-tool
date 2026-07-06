import 'vue-router';
import { UserRole } from '@/types';


declare module 'vue-router' {
    interface RouteMeta {
        title?:          string;

        requires_auth?:  boolean;

        requires_guest?: boolean;

        allowed_roles?:  UserRole[];
    }
}
