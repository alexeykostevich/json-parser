import { TokenType } from '../constants.js';


const NULL_REG_EXP = /^null/;


/**
 * Matches a value to `null` and returns a token; otherwise `undefined`.
 *
 * @param {string} value A string to analyze.
 */
export function lexNull(value) {
    const match = value.match(NULL_REG_EXP);

    if (match) {
        return {
            type: TokenType.NULL,
            value: null,
            source: match[0]
        };
    }

    return null;
}
