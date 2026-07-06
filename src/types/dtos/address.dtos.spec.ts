import { describe, expect, it } from "vitest";
import { AddressDTO, AddressSchema } from "./address.dtos";


describe('AddressDTO', () => {
    describe('GetDTO', () => {
        it('should accept a fully-populated fields', () => {
            const valid: AddressDTO.Get = {
                address_line_1: '1200 Demo Way',
                address_line_2: 'Suite 220',
                address_line_3: 'Attention: Demo Team',
                city:           'Portland',
                state:          'OR',
                postal_code:    '97205',
            };
            const result = AddressSchema.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });

        it('should accept partial payload', () => {
            const valid: AddressDTO.Get = {
                address_line_1: '840 Sample Street',
                city:           'Seattle',
                state:          'WA',
                postal_code:    '98101',
            };
            const result = AddressSchema.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });


        it('should accept empty object', () => {
            const result = AddressSchema.GetDTO.safeParse({});
            expect(result.success).toBe(true);
        });
    });
});
