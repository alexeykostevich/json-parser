import { TokenType } from '../constants';


export function ofType(tokens, index, tokenType) {
    return !!tokens &&
        index < tokens.length &&
        tokens[index].type === tokenType;
}


export function isSyntax(tokens, index, syntaxToken) {
    return ofType(tokens, index, TokenType.SYNTAX) &&
        tokens[index].value === syntaxToken;
}


export function throwIfNotOfType(tokens, index, tokenType) {
    if (!ofType(tokens, index, tokenType)) {
        throw new Error('JSON is invalid.')
    };
}


export function throwIfNotSyntax(tokens, index, syntaxToken) {
    if (!isSyntax(tokens, index, syntaxToken)) {
        throw new Error('JSON is invalid.')
    };
}
