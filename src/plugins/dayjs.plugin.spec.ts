import { describe } from "node:test";
import { expect, it } from "vitest";
import { dayjs } from "./dayjs.plugin";


describe('DayJS plugin', () => {
    it('should have "UTC" support', () => {
        const time = dayjs('2025-01-01T12:00:00Z');

        expect(typeof time.utc).toBe('function');
        expect(typeof time.format).toBe('function');

        expect(time.utc().format()).toBe('2025-01-01T12:00:00+00:00');
    });

    it('should have "Timezone" support', () => {
        const time = dayjs('2025-01-01T12:00:00Z');

        expect(typeof time.tz).toBe('function');
        
        expect(time.tz('America/Chicago').format('YYYY-MM-DD HH:mm')).
            toBe('2025-01-01 06:00');
    });

    it('should have "AdvancedFormat" support', () => {
        const first_quarter  = dayjs('2025-01-01');
        const fourth_quarter = dayjs('2025-10-01');

        expect(typeof first_quarter.format).toBe('function');
        expect(typeof fourth_quarter.format).toBe('function');

        expect(first_quarter.format('Q')).toBe('1');
        expect(fourth_quarter.format('Q')).toBe('4');
    });

    it('should have "RelativeTime" support', () => {
        const A = dayjs('2025-01-01');
        const B = dayjs('2025-01-02');

        expect(typeof A.from).toBe('function');
        expect(typeof B.from).toBe('function');

        expect(A.from(B)).toBe('a day ago');
        expect(B.from(A)).toBe('in a day');
    });
});
