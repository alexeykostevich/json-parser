/**
 * @fileoverview 
 * A module contains multiple parsers for different JSON values.
 * While it would be better to move each parser into its own separate
 * module, it is impossible to do this without circular dependencies between 
 * modules.
 * This happens because JSON has composite structure: an object can contain an array,
 * which, in turn, can contain another object.
 */
import { PRIMITIVE_TOKEN_TYPES, SyntaxToken, TokenType } from '../constants';
import { isSyntax, throwIfNotOfType, throwIfNotSyntax } from './utils';


/**
 * Tries to patse a primitive value (null, string, etc.) from the list of tokens.
 * Returns a parsing result (value and a number of token used) if the tokens can be parsed;
 * otherwise -- null;
 * @param {Array<Object>} tokens A list of tokens.
 */
function parsePrimitive(tokens) {
    // If the first token does not belong to a primitive, this is not the right parser...
    if (!PRIMITIVE_TOKEN_TYPES.includes(tokens[0].type)) return null;

    return {
        value: tokens[0].value,
        tokensUsed: 1
    };
}


/**
 * Tries to parse an object from the list of tokens.
 * Returns a parsing result (value and a number of token used) if the tokens can be parsed;
 * otherwise -- null;
 * @param {Array<Object>} tokens A list of tokens.
 */
function parseObject(tokens) {
    // If the first token is not '{', this is not the right parser...
    if (!isSyntax(tokens, 0, SyntaxToken.CURLY_LEFT_BRACKET)) return null;

    // Start from `1` since there was CURLY_LEFT_BRACKET already.
    let tokensUsed = 1;
    const obj = { };

    while (!isSyntax(tokens, tokensUsed, SyntaxToken.CURLY_RIGHT_BRACKET)) {
        // Parse a key
        throwIfNotOfType(tokens, tokensUsed, TokenType.STRING);
        const key = tokens[tokensUsed].value;
        tokensUsed += 1;

        // Parse a colon
        throwIfNotSyntax(tokens, tokensUsed, SyntaxToken.COLON);
        tokensUsed += 1;

        // Parse a value recursively
        const valueResult = parseValue(tokens.slice(tokensUsed));
        obj[key] = valueResult.value;
        tokensUsed += valueResult.tokensUsed;

        // Skip a comma if it was the last property in the object
        if (isSyntax(tokens, tokensUsed, SyntaxToken.CURLY_RIGHT_BRACKET)) continue;

        // Parse a comma
        throwIfNotSyntax(tokens, tokensUsed, SyntaxToken.COMMA);
        tokensUsed += 1;
    }

    tokensUsed += 1;

    return {
        value: obj,
        tokensUsed
    };
}


const PARSERS = [
    parsePrimitive,
    parseObject
];


/**
 * Parses a JSON value from the list of tokens.
 * Returns a parsing result (value and a number of token used).
 * @param {Array<Object>} tokens A list of tokens.
 */
export function parseValue(tokens) {
    if (!tokens.length) throw new Error('JSON is invalid.');

    // Use the first compatble parser to parse a list of tokens.
    for (const parser of PARSERS) {
        const result = parser(tokens);

        if (result) return result;
    }

    throw new Error(`JSON is invalid.`);
}

