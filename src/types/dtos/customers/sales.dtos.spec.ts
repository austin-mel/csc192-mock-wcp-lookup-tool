import { describe, expect, it } from "vitest";
import { CustomerSalesScheme } from "./sales.dtos";


describe("CustomerSalesScheme", () => {
    describe("GetDTO", () => {
        const valid = {
            month_to_date:    10_000,
            year_to_date:  1_000_000,
        }

        it("should parse valid payload", () => {
            const result = CustomerSalesScheme.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });

        it("should parse valid partial payload", () => {
            const result = CustomerSalesScheme.GetDTO.safeParse({});
            expect(result.success).toBe(true);
            expect(result.data).toEqual({});
        });

        it("should reject wrong field types", () => {
            const result = CustomerSalesScheme.GetDTO.safeParse({
                month_to_date:    "10_000",
                year_to_date:  "1_000_000",
            });
            expect(result.success).toBe(false);
        });
    });
});