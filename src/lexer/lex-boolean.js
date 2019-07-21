import { TokenType } from '../constants.js';


const BOOLEAN_REG_EXP = /^(true|false)/;


/**
 * Matches a value to a boolean and returns a token; otherwise `undefined`.
 *
 * @param {string} value A string to analyze.
 */
export function lexBoolean(value) {
    const match = value.match(BOOLEAN_REG_EXP);

    if (match) {
        return {
            type: TokenType.BOOLEAN,
            value: match[0] === 'true',
            source: match[0]
        };
    }

    return null;
}
