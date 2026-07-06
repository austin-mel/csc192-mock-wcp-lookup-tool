import { AddressDTO } from "@/types";
import { describe, expect, it } from "vitest";
import { get_address_point } from "./address-utils.function";


describe('get_address_point', () => {
    type TestCase = {
        name:     string;
        input:    AddressDTO.Get;
        expected: ReturnType<typeof get_address_point>;
    }

    const tests: TestCase[] = [
        {
            name:     'should return "0,0" if no information in address is provided',
            input:    {},
            expected: "0,0",
        },
        {
            name:     'should return "0,0" if city is missing',
            input:    {
                state:       'CA',
                postal_code: '12345',
            },
            expected: '0,0',
        },
        {
            name:     'should return "0,0" if state is missing',
            input:    {
                city:        'Seattle',
                postal_code: '12345',
            },
            expected: "0,0",
        },
        {
            name:     'should return "0,0" if postal code is missing',
            input:    {
                city:        'Seattle',
                state:       'WA',
            },
            expected: "0,0",
        },
        {
            name:     'should return "city, state, postal_code" when address lines are missing',
            input:    {
                city:        'Seattle',
                state:       'WA',
                postal_code: '12345',
            },
            expected: "Seattle, WA 12345",
        },
        {
            name: [
                    'should return "city, state, postal_code"',
                    'when only address_line_2 in address is present'
                ].
                join(' '),
            input:    {
                address_line_2: 'Apt. 220',
                city:           'Seattle',
                state:          'WA',
                postal_code:    '12345',
            },
            expected: "Seattle, WA 12345",
        },
        {
            name: [
                    'should return "city, state, postal_code"',
                    'when only address_line_3 in address is present'
                ].
                join(' '),
            input:    {
                address_line_3: 'Attention: Zachary',
                city:           'Seattle',
                state:          'WA',
                postal_code:    '12345',
            },
            expected: "Seattle, WA 12345",
        },
        {
            name: [
                    'should return "city, state, postal_code"',
                    'when address_line_2 and address_line_3 in address is present'
                ].
                join(' '),
            input: {
                address_line_2: 'Apt. 220',
                address_line_3: 'Attention: Zachary',
                city:           'Seattle',
                state:          'WA',
                postal_code:    '12345',
            },
            expected: "Seattle, WA 12345",
        },
        {
            name: [
                    'should return "address_line1, city, state, postal_code"',
                    'when all fields are present'
                ].
                join(' '),
            input: {
                address_line_1: '123 Sample St',
                address_line_2: 'Apt. 220',
                address_line_3: 'Attention: Zachary',
                city:           'Seattle',
                state:          'WA',
                postal_code:    '12345',
            },
            expected: "123 Sample St, Seattle, WA 12345",
        },
    ];

    for (const test of tests) {
        it(test.name, () => {
            expect(get_address_point(test.input)).toBe(test.expected);
        })
    }
});
