import { describe, expect, it } from "vitest";
import { CustomerContactInformationDTO, CustomerContactInformationScheme } from "./contact-information.dto";


describe('ContactInformationDTO', () => {
    describe('GetDTO', () => {
        it('should accept a fully-populated fields', () => {
            const valid: CustomerContactInformationDTO.Get = {
                area_code:      '209',
                phone_number:   '555-3535',
                extension:      'x221',
                full:           '(209)555-3535x221',
                representative: 'Kyle',
            };
            const result = CustomerContactInformationScheme.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });

        it('should accept partial payload', () => {
            const valid: CustomerContactInformationDTO.Get = {
                area_code:    '209',
                phone_number: '555-3535',
            };
            const result = CustomerContactInformationScheme.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });


        it('should accept empty object', () => {
            const result = CustomerContactInformationScheme.GetDTO.safeParse({});
            expect(result.success).toBe(true);
        });
    });
});
