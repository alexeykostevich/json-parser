export const TokenType = Object.freeze({
    NULL: 'NULL',
    NUMBER: 'NUMBER',
    BOOLEAN: 'BOOLEAN',
    STRING: 'STRING',
    SYNTAX: 'SYNTAX',
    WHITE_SPACE: 'WHITE_SPACE'
});


export const SyntaxToken = Object.freeze({
    COMMA: ',',
    COLON: ':',
    SQUARE_LEFT_BRACKET: '[',
    SQUARE_RIGHT_BRACKET: ']',
    CURLY_LEFT_BRACKET: '{',
    CURLY_RIGHT_BRACKET: '}'
});


export const PRIMITIVE_TOKEN_TYPES = [
    TokenType.NULL,
    TokenType.NUMBER,
    TokenType.BOOLEAN,
    TokenType.STRING
];
