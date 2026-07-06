import { PersonName } from "./person-name.interface";


export interface UserContactInfo {
    phone_number: string;
    
    email:        string;
};


export const UserRoles = [
    'User',
    'Manager',
    'Representative',
    'Admin'
] as const;

export type UserRole = typeof UserRoles[number];


export interface UserInformation {
    name:    PersonName;

    contact: UserContactInfo;

    role:    UserRole;

    // TODO(eugene): Refactor into Union
    department: string;

    // TODO(eugene): Refactor into Date
    date_of_hire: string;

    // TODO(eugene): Refactor into Array<AccountIDs>
    accounts: Array<String>;
}
