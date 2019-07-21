import { SyntaxToken, TokenType } from '../constants.js';


/**
 * Matches a value to a syntax symbol and returns a token; otherwise `undefined`.
 *
 * @param {string} value A string to analyze.
 */
export function lexSyntax(value) {
    const match = Object.values(SyntaxToken).find(syntax =>
        value.startsWith(syntax)
    );

    if (match) {
        return {
            type: TokenType.SYNTAX,
            value: match,
            source: match
        };
    }

    return null;
}
