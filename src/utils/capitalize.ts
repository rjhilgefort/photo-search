import {replace, toUpper} from 'ramda'

/**
 * @description Capitalizes the first character of a string
 */
export const capitalize = (data: string): string => replace(/^./, toUpper, data)
