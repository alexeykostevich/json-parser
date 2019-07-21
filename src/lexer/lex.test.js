import { TokenType } from '../constants.js';
import { lex } from './lex.js';


describe('lex', () => {
    test('throws when a value contains non-JSON tokens', () => {
        expect(() => lex('{ <>'))
            .toThrow('Invalid JSON starting from <>');
    });

    test('returns a token for `null`', () => {
        const tokens = lex('null');

        expect(tokens).toEqual([
            {
                type: TokenType.NULL,
                value: null,
                source: 'null'
            }
        ]);
    });

    test('returns a token for a number', () => {
        const tokens = lex('42');

        expect(tokens).toEqual([
            {
                type: TokenType.NUMBER,
                value: 42,
                source: '42'
            }
        ]);
    });

    test('returns a token for a boolean', () => {
        const trueToken = lex('true');

        expect(trueToken).toEqual([
            {
                type: TokenType.BOOLEAN,
                value: true,
                source: 'true'
            }
        ]);

        const falseToken = lex('false');

        expect(falseToken).toEqual([
            {
                type: TokenType.BOOLEAN,
                value: false,
                source: 'false'
            }
        ]);
    });

    test('returns a token for an empty string', () => {
        const tokens = lex('""');

        expect(tokens).toEqual([
            {
                type: TokenType.STRING,
                value: '',
                source: '""'
            }
        ]);
    });

    test('returns a token for a string', () => {
        const tokens = lex('"Hi"');

        expect(tokens).toEqual([
            {
                type: TokenType.STRING,
                value: 'Hi',
                source: '"Hi"'
            }
        ]);
    });

    test('returns tokens for the syntax', () => {
        const tokens = lex('{}');

        expect(tokens).toEqual([
            {
                type: TokenType.SYNTAX,
                value: '{',
                source: '{'
            },
            {
                type: TokenType.SYNTAX,
                value: '}',
                source: '}'
            },
        ]);
    });

    test('returns tokens for the array syntax', () => {
        const tokens = lex('[]');

        expect(tokens).toEqual([
            {
                type: TokenType.SYNTAX,
                value: '[',
                source: '['
            },
            {
                type: TokenType.SYNTAX,
                value: ']',
                source: ']'
            },
        ]);
    });

    test('returns tokens for white-spaces', () => {
        const tokens = lex('  \n');

        expect(tokens).toEqual([
            {
                type: TokenType.WHITE_SPACE,
                value: ' ',
                source: ' '
            },
            {
                type: TokenType.WHITE_SPACE,
                value: ' ',
                source: ' '
            },
            {
                type: TokenType.WHITE_SPACE,
                value: '\n',
                source: '\n'
            },
        ]);
    });

    test('returns token for a complex JSON string', () => {
        const tokens = lex(JSON.stringify({
            name: 'Duck',
            interests: ['Soccer', 'Gambling']
        }));

        expect(tokens).toEqual([
            {
                type: TokenType.SYNTAX,
                value: '{',
                source: '{'
            },
            {
                type: TokenType.STRING,
                value: 'name',
                source: '"name"'
            },
            {
                type: TokenType.SYNTAX,
                value: ':',
                source: ':'
            },
            {
                type: TokenType.STRING,
                value: 'Duck',
                source: '"Duck"'
            },
            {
                type: TokenType.SYNTAX,
                value: ',',
                source: ','
            },
            {
                type: TokenType.STRING,
                value: 'interests',
                source: '"interests"'
            },
            {
                type: TokenType.SYNTAX,
                value: ':',
                source: ':'
            },
            {
                type: TokenType.SYNTAX,
                value: '[',
                source: '['
            },
            {
                type: TokenType.STRING,
                value: 'Soccer',
                source: '"Soccer"'
            },
            {
                type: TokenType.SYNTAX,
                value: ',',
                source: ','
            },
            {
                type: TokenType.STRING,
                value: 'Gambling',
                source: '"Gambling"'
            },
            {
                type: TokenType.SYNTAX,
                value: ']',
                source: ']'
            },
            {
                type: TokenType.SYNTAX,
                value: '}',
                source: '}'
            }]);
    });
});
