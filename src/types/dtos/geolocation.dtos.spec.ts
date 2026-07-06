import { describe, expect, it } from "vitest";
import { GeolocationDTO, GeolocationScheme } from "./geolocation.dtos";


describe("GeolocationScheme", () => {
    describe("GetDTO", () => {
        const valid: GeolocationDTO.Get = {
            latitude:    45.5152,
            longitude: -122.6784,
        };

        it("should parse valid payload", () => {
            const result = GeolocationScheme.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });

        it("should parse valid partial payload", () => {
            const result = GeolocationScheme.GetDTO.safeParse({});
            expect(result.success).toBe(true);
            expect(result.data).toEqual({});
        });

        it("should reject wrong field types", () => {
            const result = GeolocationScheme.GetDTO.safeParse({
                latitude:    "45.5152",
                longitude: "-122.6784",
            });
            expect(result.success).toBe(false);
        });
    });
});
