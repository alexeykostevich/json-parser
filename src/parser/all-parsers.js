/**
 * @fileoverview 
 * A module exports all the parsers for different JSON values.
 * While it would be better to put this into 'parse-any.js', it is impossible
 * to do this without introducing circular dependencies between modules.
 * This happens because JSON has composite structure: an object can contain an array,
 * which, in turn, can contain another object.
 */
import { parsePrimitive } from './parse-primitive.js';
import { parseObject } from './parse-object.js';
import { parseArray } from './parse-array.js';


export const PARSERS = [
    parsePrimitive,
    parseObject,
    parseArray
];
