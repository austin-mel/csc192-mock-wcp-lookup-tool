import { describe, expect, it } from "vitest";
import { URLWithParams } from "./url.function";

describe('URLWithParams', () => {
    type TestCase = {
        name: string;
        input: {
            base_url: string;
            query_params: Record<string, any>,
        },
        expected: ReturnType<typeof URLWithParams>,
    };

    type TestGroups = Record<string, TestCase[]>;

    const tests: TestGroups = {
        'when base url has no existing query': [
            {
                name: 'adds "?" to end of base_url and adds a query param',
                input: {
                    base_url:     'https://api.test.unknown/resource',
                    query_params: { key: 'value' },
                },
                expected: 'https://api.test.unknown/resource?key=value'
            },
            {
                name: 'adds "?" to end of base_url and adds a query param',
                input: {
                    base_url:     'https://api.test.unknown/resource',
                    query_params: { key: 'value2' },
                },
                expected: 'https://api.test.unknown/resource?key=value2'
            },
        ],

        'when base url has existing "?" in it': [
            {
                name: 'should use "&" as a query param separator',
                input: {
                    base_url:     'https://api.test.unknown/resource?key=value',
                    query_params: { key1: 'value', key2: 'value' },
                },
                expected: 'https://api.test.unknown/resource?key=value&key1=value&key2=value'
            },
        ],

        'when query params are not just string values': [
            {
                name: 'should encode numbers and booleans',
                input: {
                    base_url:     'https://api.test.unknown/resource',
                    query_params: {
                        zero:      0,
                        negative: -1,
                        true:      true,
                        no:        false,
                    },
                },
                expected: 'https://api.test.unknown/resource?zero=0&negative=-1&true=true&no=false'
            },
        ],

        'when query params special characters': [
            {
                name: 'should encode them using "%"',
                input: {
                    base_url:     'https://api.test.unknown/resource',
                    query_params: {
                        space_key:  ' ',
                        sentence:   'simple sentence',
                        ampersand:  '&',
                        pound_sign: '£',
                        euro_sign:  '€',
                    },
                },
                expected: [
                        'https://api.test.unknown/resource',
                        '?space_key=%20',
                        '&sentence=simple%20sentence',
                        '&ampersand=%26',
                        '&pound_sign=%C2%A3',
                        '&euro_sign=%E2%82%AC'
                    ].join(''),
            },
        ],
    };

    for (const [test_group, test_cases] of Object.entries(tests)) {
        describe(test_group, () => {
            for (const test_case of test_cases) {
                it(test_case.name, () => {
                    const { base_url, query_params } = test_case.input;
                    expect(URLWithParams(base_url, query_params)).toBe(test_case.expected)
                });
            }
        });
    }
});
