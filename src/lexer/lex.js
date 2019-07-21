import { lexNull } from './lex-null.js';
import { lexNumber } from './lex-number.js';
import { lexBoolean } from './lex-boolean.js';
import { lexString } from './lex-string.js';
import { lexSyntax } from './lex-syntax.js';
import { lexWhiteSpace } from './lex-white-space.js';


// A list with all lexers for the JSON language.
const LEXERS = [
    lexNull,
    lexNumber,
    lexBoolean,
    lexString,
    lexSyntax,
    lexWhiteSpace
];


/**
 * Makes lexical analyses and transforms a sequence of characters into a 
 * sequence of tokens, defined by the JSON specification.
 * 
 * @see https://en.wikipedia.org/wiki/Lexical_analysis
 * @see http://notes.eatonphil.com/writing-a-simple-json-parser.html
 * @param {string} value A string for lexical analyses.
 */
export function lex(value) {
    let valueToLex = value;
    const tokens = [];

    // While there is something to analyze...
    while (valueToLex) {
        let token = null;

        // Pass a string though lexers and stop when one of them recognizes a token.
        for (const lexer of LEXERS) {
            token = lexer(valueToLex);

            if (token) break;
        }

        // If no lexers recognize a string, it is invalid JSON.
        if (!token) throw new Error(`Invalid JSON starting from ${valueToLex}`);

        tokens.push(token);
        valueToLex = valueToLex.slice(token.source.length);
    }

    return tokens;
}
