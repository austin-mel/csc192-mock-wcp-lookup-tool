import { describe, expect, it } from "vitest";
import { CustomerContactsDTO, CustomerContactsScheme } from "./contacts.dtos";


describe('CustomerContactsDTO', () => {
    describe('GetDTO', () => {
        it('should accept a fully-populated fields', () => {
            const valid: CustomerContactsDTO.Get = {
                accounts_payable: {
                    area_code:      '209',
                    phone_number:   '555-3535',
                    extension:      'x221',
                    full:           '(209)555-3535x221',
                    representative: 'Kyle',
                },
                purchasing: {
                    area_code:      '209',
                    phone_number:   '555-3535',
                    extension:      'x222',
                    full:           '(209)555-3535x221',
                    representative: 'Tyler',
                },
                fax_number:         '(800)-555-555'
            };
            const result = CustomerContactsScheme.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });

        it('should accept partial payload', () => {
            const valid: CustomerContactsDTO.Get = {
                fax_number: '(800)-555-555',
            };
            const result = CustomerContactsScheme.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });


        it('should accept empty object', () => {
            const result = CustomerContactsScheme.GetDTO.safeParse({});
            expect(result.success).toBe(true);
        });
    });
});
