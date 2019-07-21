import { TokenType } from '../constants.js';


// This Reg Exp does not take into account escaped quotes (e.g. \").
// This is okay, just keep it somple from the beginning.
const STRING_REG_EXP = /^"(.*?)"/;


/**
 * Matches a value to a string and returns a token; otherwise `undefined`.
 *
 * @param {string} value A string to analyze.
 */
export function lexString(value) {
    const match = value.match(STRING_REG_EXP);

    if (match) {
        return {
            type: TokenType.STRING,
            value: match[1],
            source: match[0]
        };
    }

    return null;
}
