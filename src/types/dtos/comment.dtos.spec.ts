import { describe, expect, it } from "vitest";
import { CommentsSchema } from "./comment.dtos";
import { IDSchema } from "./ids.dtos";


describe('CommentsSchema', () => {
    describe('CreateDTO', () => {
        const valid = {
            customer_id:  IDSchema.CustomerID.parse("ACCT-1001"),
            user_id:      IDSchema.UserID.parse(1),
            comment_text: 'New Comment!',
        };

        it('should accept a valid payload', () => {
            const result = CommentsSchema.CreateDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });

        it('should reject on empty object', () => {
            const result = CommentsSchema.CreateDTO.safeParse({});
            expect(result.success).toBe(false);
        });

        it('should reject on missing fields', () => {
            const { comment_text, ...rest } = valid;
            const result = CommentsSchema.CreateDTO.safeParse(rest);
            expect(result.success).toBe(false);
        });

        it('should reject wrong field types', () => {
            const result = CommentsSchema.CreateDTO.safeParse({
                ...valid,
                comment_text: 123
            });
            expect(result.success).toBe(false);
        });
    });


    describe('GetDTO', () => {
        const valid = {
            comment_id:   IDSchema.CommentID.parse(1),
            customer_id:  IDSchema.CustomerID.parse("ACCT-1001"),
            user_id:      IDSchema.UserID.parse(1),
            comment_text: "Comment Text!",
            created_at:   new Date().toISOString(),
        };

        it('should parse valid object', () => {
            const result = CommentsSchema.GetDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });

        it('should reject on empty object', () => {
            const result = CommentsSchema.GetDTO.safeParse({});
            expect(result.success).toBe(false);
        });

        it('should reject on missing fields', () => {
            const { created_at, ...rest } = valid;
            const result = CommentsSchema.GetDTO.safeParse(rest);
            expect(result.success).toBe(false);
        });

        it('should reject wrong field types', () => {
            const { created_at, ...rest } = valid;
            const result = CommentsSchema.GetDTO.safeParse({
                ...rest,
                created_at: 1,
            });
            expect(result.success).toBe(false);
        });
    });


    describe('UpdateDTO', () => {
        const valid = {
            comment_id:   IDSchema.CommentID.parse(1),
            comment_text: 'Updated comment!',
        };

        it('should accepts a valid payload', () => {
            const result = CommentsSchema.UpdateDTO.safeParse(valid);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(valid);
        });

        it('should reject on empty object', () => {
            const result = CommentsSchema.UpdateDTO.safeParse({});
            expect(result.success).toBe(false);
        });

        it('should reject on missing fields', () => {
            const result = CommentsSchema.UpdateDTO.safeParse({
                comment_id: IDSchema.CommentID.parse(1),
            });
            expect(result.success).toBe(false);
        });

        it('should reject wrong field types', () => {
            const result = CommentsSchema.UpdateDTO.safeParse({
                ...valid,
                comment_text: 123
            });
            expect(result.success).toBe(false);
        });
    });
});
