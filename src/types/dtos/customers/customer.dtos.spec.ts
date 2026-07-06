import { describe, expect, it } from "vitest";
import { CustomerDTO, CustomerSchema } from "./customer.dtos";
import { IDSchema } from "../ids.dtos";


describe("CommentsSchema", () => {
    describe("GetDTO", () => {
        const valid: CustomerDTO.Get[] = [
            {
                customer_id:      IDSchema.CustomerID.parse("ACCT-1001"),
                customer_name:    "Evergreen Office Co.",
                customer_class:   "Commercial",
                status:           "Active",
                territory_number: "Northwest",
                sales_rep_name:   "Jordan Rivera",
            },
            {
                customer_id:    "ACCT-1002",
                customer_name:  "Summit Workspace",
                customer_class: "Enterprise",
                address: {
                    address_line_1: "840 Sample Street",
                    city:           "Seattle",
                    state:          "WA",
                    postal_code:    "98101",
                },
                geolocation: {
                    latitude:    47.608,
                    longitude: -122.335,
                },
                contacts: {
                    purchasing: {
                        area_code:    "555",
                        phone_number: "0103",
                        full:         "+1555010103",
                    },
                    accounts_payable: {
                        area_code:    "555",
                        phone_number: "0104",
                        full:         "+1555010104",
                    },
                },
                status:           "Suspended",
                territory_number: "Coastal",
                sales_rep_name:   "Riley Chen",
            },
        ];

        it("should parse valid object", () => {
            for (const customer of valid) {
                const result = CustomerSchema.GetDTO.safeParse(customer);
                expect(result.success).toBe(true);
                expect(result.data).toEqual(customer);
            }
        });

        it("should reject on empty object", () => {
            const result = CustomerSchema.GetDTO.safeParse({});
            expect(result.success).toBe(false);
        });

        it("should reject on missing fields", () => {
            for (const customer of valid) {
                const { customer_id, ...rest } = customer;
                const result = CustomerSchema.GetDTO.safeParse(rest);
                expect(result.success).toBe(false);
            }
        });

        it("should reject wrong field types", () => {
            for (const customer of valid) {
                const { customer_id, ...rest } = customer;
                const result = CustomerSchema.GetDTO.safeParse({
                    ...rest,
                    customer_id: 1,
                });
                expect(result.success).toBe(false);
            }
        });
    });
});
