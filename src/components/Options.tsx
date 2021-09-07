import {capitalize} from '../utils'

export const Options = <Option extends string>(
  options: ReadonlyArray<Option>
) =>
  options.map(option => (
    <option key={option} value={option}>
      {capitalize(option)}
    </option>
  ))
