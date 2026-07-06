export interface Contacts {
    purchasing?: ContactDetails;
    accounts_payable?: ContactDetails;
    fax_number?: string;
  }

  export interface ContactDetails {
    area_code?: string;
    phone_number?: string;
    extension?: string;
    full?: string;
  }
