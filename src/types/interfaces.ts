import { AddressDTO } from "./dtos";
import { Contacts } from "./contacts";


  export interface Geolocation {
    latitude?: number;
    longitude?: number;
  }

  export interface SalesData {
    month_to_date?: number;
    year_to_date?: number;
  }
  
  
  export interface SearchResult {
    company_number_id?: string;
    sales_rep_id?: string;
    sales_rep_name?: string;
    customer_fax_number?: string;
    customer_id?: string;
    customer_name?: string;
    customer_class?: string;
    status?: string;
    territory_number?: string;
    address?: AddressDTO.Get;
    geolocation?: Geolocation; 
    contacts?: Contacts;
    distance?: number;
    sales?: SalesData;
  }

  