import {capitalize} from './capitalize'

test.each<[string, string]>([
  ['foo', 'Foo'],
  ['some sentence', 'Some sentence'],
  ['Already', 'Already'],
  ['nature', 'Nature'],
])('%p -> %p', (input, output) => {
  expect(capitalize(input)).toEqual(output)
})
