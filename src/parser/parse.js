import { TokenType } from '../constants';
import { parseValue } from './parsers.js';


/**
 * Makes a syntactic analyses by iterating over tokens and 
 * matching groups of tokens up to pieces of JSON.
 *
 * If, at any point during syntactic analysis, the parser cannot match
 * the current set of tokens up to a valid grammar, the parser will fail.
 *
 * @see http://notes.eatonphil.com/writing-a-simple-json-parser.html
 * @param {Array<Object>} tokens A list of tokens.
 */
export function parse(tokens) {
    // Remove all the white-spaces since they are just decorative tokens.
    const tokensToParse = tokens
        .filter(token => token.type !== TokenType.WHITE_SPACE);

    // If there are no tokens, this is invalud JSON...
    if (!tokensToParse.length) throw new Error('JSON is invalid.');

    const result = parseValue(tokensToParse);

    // JSON should have only one root value. 
    // So, throw an error if there are some tokens left after parsing a value.
    if (result.tokensUsed !== tokensToParse.length) {
        throw new Error('JSON is invalid.');
    }

    return result.value;
}
