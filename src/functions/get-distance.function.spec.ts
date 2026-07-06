import { describe, expect, it } from "vitest";
import { calculate_distance, CalculateDistanceParams, toRadians } from "./get-distance.function";


describe('toRadians', () => {
    type TestCase = {
        name:     string;
        input:    number;
        expected: ReturnType<typeof toRadians>;
    }

    const tests: TestCase[] = [
        // Zero
        {
            name:    'should convert 0 degrees to 0 radians',
            input:    0,
            expected: 0,
        },

        // Positive Angles
        {
            name:    'should convert 90 degrees to "π/2" radians',
            input:    90,
            expected: Math.PI / 2,
        },
        {
            name:    'should convert 180 degrees to "π" radians',
            input:    180,
            expected: Math.PI,
        },
        {
            name:    'should convert 270 degrees to "3π/2" radians',
            input:    270,
            expected: 3 * Math.PI / 2,
        },
        {
            name:    'should convert 360 degrees to "2π" radians',
            input:    360,
            expected: 2 * Math.PI,
        },

        // Negative Angles
        {
            name:    'should convert -90 degrees to "-π/2" radians',
            input:    -90,
            expected: (-1) * Math.PI / 2,
        },
        {
            name:    'should convert -180 degrees to "-π" radians',
            input:    -180,
            expected: (-1) * Math.PI,
        },
        {
            name:    'should convert -270 degrees to "-3π/2" radians',
            input:    -270,
            expected: (-1) * 3 * Math.PI / 2,
        },
        {
            name:    'should convert -360 degrees to "-2π" radians',
            input:    -360,
            expected: (-1) * 2 * Math.PI,
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            expect(toRadians(test.input)).toBeCloseTo(test.expected);
        })
    }
});


describe('calculate_distance', () => {
    type TestCase = {
        name:     string;
        input:    CalculateDistanceParams;
        expected: ReturnType<typeof calculate_distance>;
    }

    const tests: TestCase[] = [
        {
            name:  'should return 0 miles when both points are identical',
            input: {
                from_latitude:  0,
                from_longitude: 0,
                to_latitude:    0,
                to_longitude:   0,
            },
            expected: 0,
        },
        {
            name:  'should approximate distance between White House in Washington, D.C. and the Eiffel Tower in Paris',
            input: {
                from_latitude:  38.898,
                from_longitude: 77.037,
                to_latitude:    48.858,
                to_longitude:    2.294,
            },
            expected: 3_633,
        },
        {
            name:  'should approximate distance between New York City and Los Angeles',
            input: {
                from_latitude:    40.7128,
                from_longitude:  -74.0060,
                to_latitude:      34.0522,
                to_longitude:   -118.2437,
            },
            expected: 2_445.8,
        },
        {
            name:  'should approximate distance between New York City and Los Angeles',
            input: {
                from_latitude:    40.7128,
                from_longitude:  -74.0060,
                to_latitude:      34.0522,
                to_longitude:   -118.2437,
            },
            expected: 2_445.3,
        },
    ];

    for (const test of tests) {
        it(test.name, () => {
            expect(calculate_distance(test.input)).toBeCloseTo(test.expected, 0);
        })
    }

    it('should return the same value for symmetric points', () => {
        const A = { from_latitude: 40.7128, from_longitude:  -74.0060 };
        const B = { to_latitude:   34.0522, to_longitude:   -118.2437 };

        const left  = calculate_distance({ ...A, ...B });
        const right = calculate_distance({ ...B, ...A });

        expect(left).toBeCloseTo(right, 5);
    });
});

