import {isUndefined} from './isUndefined'

test.each<[unknown, boolean]>([
  ['foo', false],
  [undefined, true],
  [null, false],
])('%p -> %p', (input, output) => {
  expect(isUndefined(input)).toEqual(output)
})
