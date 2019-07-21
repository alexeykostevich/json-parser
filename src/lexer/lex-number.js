import { TokenType } from '../constants.js';


const NUMBER_REG_EXP = /^\d+/;


/**
 * Matches a value to a number and returns a token; otherwise `undefined`.
 *
 * @param {string} value A string to analyze.
 */
export function lexNumber(value) {
    const match = value.match(NUMBER_REG_EXP);

    if (match) {
        return {
            type: TokenType.NUMBER,
            value: Number(match[0]),
            source: match[0]
        };
    }

    return null;
}
