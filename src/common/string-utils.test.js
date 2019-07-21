import { isString } from './string-utils.js';


describe('lexer', () => {
    test('returns "true" for a string', () => {
        const result = isString('Hi');

        expect(result).toBe(true);
    });

    test('returns "true" for a boxed string', () => {
        const result = isString(new String('Hi'));

        expect(result).toBe(true);
    });

    test('returns "false" for "null"', () => {
        const result = isString(null);

        expect(result).toBe(false);
    });

    test('returns "false" for "undefined"', () => {
        const result = isString(undefined);

        expect(result).toBe(false);
    });

    test('returns "false" for a number', () => {
        const result = isString(42);

        expect(result).toBe(false);
    });

    test('returns "false" for an object', () => {
        const result = isString({ message: 'Hi' });

        expect(result).toBe(false);
    });
});
