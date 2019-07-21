import { TokenType } from '../constants.js';


const WHITE_SPACE_REG_EXP = /^\s/;


/**
 * Matches a value to a white-space and returns a token; otherwise `undefined`.
 *
 * @param {string} value A string to analyze.
 */
export function lexWhiteSpace(value) {
    const match = value.match(WHITE_SPACE_REG_EXP);

    if (match) {
        return {
            type: TokenType.WHITE_SPACE,
            value: match[0],
            source: match[0]
        };
    }

    return null;
}
