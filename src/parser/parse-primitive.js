import { PRIMITIVE_TOKEN_TYPES } from '../constants';


/**
 * Tries to patse a primitive value (null, string, etc.) from the list of tokens.
 * Returns a parsing result (value and a number of token used) if the tokens can be parsed;
 * otherwise -- null;
 * @param {Array<Object>} tokens A list of tokens.
 */
export function parsePrimitive(tokens) {
    // If the first token does not belong to a primitive, this is not the right parser...
    if (!PRIMITIVE_TOKEN_TYPES.includes(tokens[0].type)) return null;

    return {
        value: tokens[0].value,
        tokensUsed: 1
    };
}
