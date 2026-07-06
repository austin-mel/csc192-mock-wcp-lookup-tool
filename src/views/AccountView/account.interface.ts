export interface UserInformation {
    name: {
        first: string;
        last: string;
    };

    contact: {
        phone_number: string;
        email: string;
    };

    // TODO(eugene): Refactor into Union
    role: string;

    // TODO(eugene): Refactor into Union
    department: string;

    // TODO(eugene): Refactor into Date
    date_of_hire: string;

    // TODO(eugene): Refactor into Array<AccountIDs>
    accounts: Array<String>;
}
