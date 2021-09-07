/**
 * @description Tests if a value is undefined, type safe
 */
export const isUndefined = (x: unknown): x is undefined => x === undefined
