import { describe, expect, it } from "vitest";
import { IDSchema } from "./ids.dtos";


describe("IDSchema", () => {
    describe("CommentID", () => {
        it("should parse a valid number", () => {
            const result = IDSchema.CommentID.safeParse(1);
            expect(result.success).toBe(true);
            expect(result.data).toBe(1);
        });

        it("should reject non-numeric values", () => {
            const result = IDSchema.CommentID.safeParse("not-a-number");
            expect(result.success).toBe(false);
        });
    });


    describe("CustomerID", () => {
        it("should parse a string", () => {
            const result = IDSchema.CustomerID.safeParse("111222");
            expect(result.success).toBe(true);
            expect(result.data).toBe("111222");
        });

        it("should reject non-string values", () => {
            const result = IDSchema.CustomerID.safeParse(1);
            expect(result.success).toBe(false);
        });
    });


    describe("UserID", () => {
        it("should parse a valid number", () => {
            const result = IDSchema.UserID.safeParse(1);
            expect(result.success).toBe(true);
            expect(result.data).toBe(1);
        });

        it("should reject non-numeric values", () => {
            const result = IDSchema.UserID.safeParse("not-a-number");
            expect(result.success).toBe(false);
        });
    });
});
