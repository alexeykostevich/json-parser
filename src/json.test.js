import { fromString } from './json.js';


describe('parse', () => {
    test('returns `null` for JSON with null', () => {
        const json = JSON.stringify(null);

        const result = fromString(json);

        expect(result).toBe(null);
    });

    test('returns a number for JSON with number', () => {
        const json = JSON.stringify(42);

        const result = fromString(json);

        expect(result).toBe(42);
    });

    test('returns `true` for JSON with true', () => {
        const json = JSON.stringify(true);

        const result = fromString(json);

        expect(result).toBe(true);
    });

    test('returns `false` for JSON with false', () => {
        const json = JSON.stringify(false);

        const result = fromString(json);

        expect(result).toBe(false);
    });

    test('returns a number for JSON with a string', () => {
        const json = JSON.stringify('Hi');

        const result = fromString(json);

        expect(result).toBe('Hi');
    });

    test('returns an for JSON with an empty object', () => {
        const json = JSON.stringify({});

        const result = fromString(json);

        expect(result).toEqual({ });
    });

    test('returns an for JSON with an object', () => {
        const json = JSON.stringify({ id: 42 });

        const result = fromString(json);

        expect(result).toEqual({ id: 42 });
    });

    test('returns an for JSON with an object with one key', () => {
        const json = JSON.stringify({
            id: 42,
            name: 'Duck'
        });

        const result = fromString(json);

        expect(result).toEqual({
            id: 42,
            name: 'Duck'
        });
    });

    test('returns an for JSON with an object with many keys', () => {
        const json = JSON.stringify({
            id: 42,
            name: 'Duck'
        });

        const result = fromString(json);

        expect(result).toEqual({
            id: 42,
            name: 'Duck'
        });
    });

    test('returns an for JSON with nested objects', () => {
        const json = JSON.stringify({
            id: 42,
            name: 'Duck',
            husband: {
                id: 3,
                name: 'Raccoon',
                isIdiot: true
            }
        });

        const result = fromString(json);

        expect(result).toEqual({
            id: 42,
            name: 'Duck',
            husband: {
                id: 3,
                name: 'Raccoon',
                isIdiot: true
            }
        });
    });
});
