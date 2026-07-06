import { AuthDTO, CommentsDTO, CustomerDTO, GeolocationDTO } from "@/types";

export const DEMO_SESSION_KEY = "portfolio_demo_session";

export const DEMO_CREDENTIALS = {
    email:    "demo.manager@example.com",
    password: "portfolio-demo",
} as const;

export const demoUser: AuthDTO.JwtClaims = {
    sub:              "1001",
    first_name:       "Jordan",
    last_name:        "Rivera",
    email:            DEMO_CREDENTIALS.email,
    role:             "Manager",
    phone_number:     "+15550101001",
    date_of_hire:     "2023-04-17",
    territory_number: "Northwest",
    iat:              1_735_689_600,
    exp:              4_102_444_800,
};

export const demoGeolocation: GeolocationDTO.Get = {
    latitude:  45.5152,
    longitude: -122.6784,
};

export const demoCustomers: CustomerDTO.Get[] = [
    {
        customer_id:      "ACCT-1001",
        customer_name:    "Evergreen Office Co.",
        customer_class:   "Commercial",
        territory_number: "Northwest",
        status:           "Active",
        sales_rep_name:   "Jordan Rivera",
        address: {
            address_line_1: "1200 Demo Way",
            city:           "Portland",
            state:          "OR",
            postal_code:    "97205",
        },
        geolocation: {
            latitude:  45.5209,
            longitude: -122.6819,
        },
        sales: {
            month_to_date: 18420,
            year_to_date:  238900,
        },
        contacts: {
            purchasing: {
                representative: "Taylor Brooks",
                area_code:      "555",
                phone_number:   "0101",
                full:           "+1555010101",
            },
            accounts_payable: {
                representative: "Morgan Lee",
                area_code:      "555",
                phone_number:   "0102",
                full:           "+1555010102",
            },
        },
    },
    {
        customer_id:      "ACCT-1002",
        customer_name:    "Summit Workspace",
        customer_class:   "Enterprise",
        territory_number: "Northwest",
        status:           "Active",
        sales_rep_name:   "Jordan Rivera",
        address: {
            address_line_1: "840 Sample Street",
            city:           "Seattle",
            state:          "WA",
            postal_code:    "98101",
        },
        geolocation: {
            latitude:  47.608,
            longitude: -122.335,
        },
        sales: {
            month_to_date: 26110,
            year_to_date:  410240,
        },
        contacts: {
            purchasing: {
                representative: "Alex Kim",
                area_code:      "555",
                phone_number:   "0103",
                full:           "+1555010103",
            },
        },
    },
    {
        customer_id:      "ACCT-1003",
        customer_name:    "Harbor Paper Studio",
        customer_class:   "Small Business",
        territory_number: "Coastal",
        status:           "Suspended",
        sales_rep_name:   "Riley Chen",
        address: {
            address_line_1: "77 Fictional Avenue",
            city:           "Astoria",
            state:          "OR",
            postal_code:    "97103",
        },
        geolocation: {
            latitude:  46.1879,
            longitude: -123.8313,
        },
        sales: {
            month_to_date: 0,
            year_to_date:  15320,
        },
        contacts: {
            accounts_payable: {
                representative: "Casey Patel",
                area_code:      "555",
                phone_number:   "0104",
                full:           "+1555010104",
            },
        },
    },
    {
        customer_id:      "ACCT-1004",
        customer_name:    "Cascadia Health Supply",
        customer_class:   "Healthcare",
        territory_number: "Southwest",
        status:           "Active",
        sales_rep_name:   "Sam Morgan",
        address: {
            address_line_1: "430 Placeholder Plaza",
            city:           "Eugene",
            state:          "OR",
            postal_code:    "97401",
        },
        geolocation: {
            latitude:  44.0521,
            longitude: -123.0868,
        },
        sales: {
            month_to_date: 9740,
            year_to_date:  128760,
        },
        contacts: {
            purchasing: {
                representative: "Jamie Stone",
                area_code:      "555",
                phone_number:   "0105",
                full:           "+1555010105",
            },
        },
    },
    {
        customer_id:      "ACCT-1005",
        customer_name:    "Metro Facilities Group",
        customer_class:   "Facilities",
        territory_number: "Northwest",
        status:           "Active",
        sales_rep_name:   "Jordan Rivera",
        address: {
            address_line_1: "505 Example Loop",
            city:           "Tacoma",
            state:          "WA",
            postal_code:    "98402",
        },
        geolocation: {
            latitude:  47.2529,
            longitude: -122.4443,
        },
        sales: {
            month_to_date: 14225,
            year_to_date:  198450,
        },
        contacts: {
            purchasing: {
                representative: "Avery Nguyen",
                area_code:      "555",
                phone_number:   "0106",
                full:           "+1555010106",
            },
        },
    },
    {
        customer_id:      "ACCT-1006",
        customer_name:    "Pioneer Learning Center",
        customer_class:   "Education",
        territory_number: "Central",
        status:           "Active",
        sales_rep_name:   "Riley Chen",
        address: {
            address_line_1: "910 Synthetic Road",
            city:           "Bend",
            state:          "OR",
            postal_code:    "97701",
        },
        geolocation: {
            latitude:  44.0582,
            longitude: -121.3153,
        },
        sales: {
            month_to_date: 5810,
            year_to_date:  74950,
        },
        contacts: {
            accounts_payable: {
                representative: "Drew Carter",
                area_code:      "555",
                phone_number:   "0107",
                full:           "+1555010107",
            },
        },
    },
];

export const demoComments: CommentsDTO.Get[] = [
    {
        comment_id:   1,
        customer_id:  "ACCT-1001",
        user_id:      1001,
        comment_text: "Requested a follow-up on quarterly planning options.",
        created_at:   "2026-01-08T17:30:00.000Z",
    },
    {
        comment_id:   2,
        customer_id:  "ACCT-1002",
        user_id:      1001,
        comment_text: "Prefers email updates before recurring account reviews.",
        created_at:   "2026-01-11T19:15:00.000Z",
    },
    {
        comment_id:   3,
        customer_id:  "ACCT-1004",
        user_id:      1001,
        comment_text: "Demo note for portfolio interactions only.",
        created_at:   "2026-01-14T16:45:00.000Z",
    },
];

function encodeBase64Url(value: string) {
    return btoa(value).
        replace(/\+/g, "-").
        replace(/\//g, "_").
        replace(/=+$/g, "");
}

export function createDemoToken(user: AuthDTO.JwtClaims = demoUser) {
    const header = encodeBase64Url(JSON.stringify({ alg: "demo", typ: "JWT" }));
    const payload = encodeBase64Url(JSON.stringify(user));

    return `${header}.${payload}.demo-signature`;
}
