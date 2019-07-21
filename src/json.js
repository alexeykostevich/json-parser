import { isString } from './common/string-utils.js';
import { lex } from './lexer/lex.js';
import { parse } from './parser/parse.js';


export function fromString(str) {
    if (!isString(str)) throw new Error('value should be a string');

    // Get a list of tokens by making lexical analysis.
    const tokens = lex(str);

    // Get a value by making syntactic analysis.
    const value = parse(tokens);
    
    return value;
}
