import { describe } from "node:test";
import { expect, it } from "vitest";
import { ToRevenue } from "./to-revenue.function";


describe('toRevenue', () => {
    type TestCase = {
        name:     string;
        input:    any;
        expected: ReturnType<typeof ToRevenue>;
    };

    type TestGroups = Record<string, TestCase[]>;

    const tests: TestGroups = {
        'invalid or missing values': [
            {
                name:     'should return "N/A" for undefined',
                input:    undefined,
                expected: 'N/A',
            },
            {
                name:     'should return "N/A" for null',
                input:    null,
                expected: 'N/A',
            },
            {
                name:     'should return "N/A" for NaN',
                input:    NaN,
                expected: 'N/A',
            },
        ],

        'zero and values below 1,000': [
            {
                name:     'should return "0" for 0',
                input:     0,
                expected: '0',
            },
            {
                name:     'should return "1" for 1',
                input:     1,
                expected: '1',
            },
            {
                name:     'should return "500" for 500',
                input:     500,
                expected: '500',
            },
            {
                name:     'should return "999" for 999',
                input:     999,
                expected: '999',
            },
            {
                name:     'should return "-200" for -200',
                input:     -200,
                expected: '-200',
            },
        ],

        'values from 1,000 up to 1,000,000': [
            {
                name:     'should return "1K+" for 1,000',
                input:     1_000,
                expected: '1K+',
            },
            {
                name:     'should return "1K+" for 1,500',
                input:     1_500,
                expected: '1K+',
            },
            {
                name:     'should return "2K+" for 2,000',
                input:     2_000,
                expected: '2K+',
            },
            {
                name:     'should return "15K+" for 15,000',
                input:     15_000,
                expected: '15K+',
            },
            {
                name:     'should return "231K+" for 231,455',
                input:     231_455,
                expected: '231K+',
            },
            {
                name:     'should return "999K+" for 999,000',
                input:     999_000,
                expected: '999K+',
            },
        ],

        'values from 1,000,000 up to 1,000,000,000': [
            {
                name:     'should return "1M+" for 1,000,000',
                input:     1_000_000,
                expected: '1M+',
            },
            {
                name:     'should return "1M+" for 1,500,000',
                input:     1_500_000,
                expected: '1M+',
            },
            {
                name:     'should return "2M+" for 2,000,000',
                input:     2_000_000,
                expected: '2M+',
            },
            {
                name:     'should return "23M+" for 23,000,994',
                input:     23_000_994,
                expected: '23M+',
            },
            {
                name:     'should return "231M+" for 231,455,000',
                input:     231_455_000,
                expected: '231M+',
            },
            {
                name:     'should return "999M+" for 999,000,000',
                input:     999_000_000,
                expected: '999M+',
            },
        ],

        'values of 1,000,000,000 and above': [
            {
                name:     'should return "1B+" for 1,000,000,000',
                input:     1_000_000_000,
                expected: '1B+',
            },
            {
                name:     'should return "1B+" for 1,000,000,500',
                input:     1_000_000_500,
                expected: '1B+',
            },
            {
                name:     'should return "2B+" for 2,000,000,000',
                input:     2_000_000_000,
                expected: '2B+',
            },
            {
                name:     'should return "2B+" for 2,000,300,000',
                input:     2_000_300_000,
                expected: '2B+',
            },
            {
                name:     'should return "4B+" for 4,500,000,000',
                input:     4_500_000_000,
                expected: '4B+',
            },
            {
                name:     'should return "9B+" for 9,000,000,000',
                input:     9_000_000_000,
                expected: '9B+',
            },
            {
                name:     'should return "9B+" for 9,999,999,999',
                input:     9_999_999_999,
                expected: '9B+',
            },
            {
                name:     'should return "21B+" for 21,000,000,000',
                input:     9_000_000_000,
                expected: '9B+',
            },
        ]
    };

    for (const [test_group, test_cases] of Object.entries(tests)) {
        describe(test_group, () => {
            for (const test_case of test_cases) {
                it(test_case.name, () => {
                    expect(ToRevenue(test_case.input)).toBe(test_case.expected);
                });
            }
        });
    }
});
