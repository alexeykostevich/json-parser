import { PARSERS } from './all-parsers.js';


/**
 * Parses a JSON value (object, array, string, boolean, etc.) from the list of tokens.
 * Returns a parsing result (value and a number of token used).
 * @param {Array<Object>} tokens A list of tokens.
 */
export function parseAny(tokens) {
    if (!tokens.length) throw new Error('JSON is invalid.');

    // Use the first compatble parser to parse a list of tokens.
    for (const parser of PARSERS) {
        const result = parser(tokens);

        if (result) return result;
    }

    throw new Error(`JSON is invalid.`);
}

