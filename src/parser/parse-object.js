import { SyntaxToken, TokenType } from '../constants';
import { parseAny } from './parse-any.js';
import { isSyntax, throwIfNotOfType, throwIfNotSyntax } from './utils';


/**
 * Tries to parse an object from the list of tokens.
 * Returns a parsing result (value and a number of token used) if the tokens can be parsed;
 * otherwise -- null;
 * @param {Array<Object>} tokens A list of tokens.
 */
export function parseObject(tokens) {
    // If the first token is not '{', this is not the right parser...
    if (!isSyntax(tokens, 0, SyntaxToken.CURLY_LEFT_BRACKET)) return null;

    // Start from `1` since there was CURLY_LEFT_BRACKET already.
    let tokensUsed = 1;
    const obj = {};

    while (!isSyntax(tokens, tokensUsed, SyntaxToken.CURLY_RIGHT_BRACKET)) {
        // Parse a key
        throwIfNotOfType(tokens, tokensUsed, TokenType.STRING);
        const key = tokens[tokensUsed].value;
        tokensUsed += 1;

        // Parse a colon
        throwIfNotSyntax(tokens, tokensUsed, SyntaxToken.COLON);
        tokensUsed += 1;

        // Parse a value recursively
        const valueResult = parseAny(tokens.slice(tokensUsed));
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
