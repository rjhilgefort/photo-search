import {Wrap, WrapItem} from '@chakra-ui/react'
import {pipe} from 'fp-ts/lib/function'
import {map, split, trim} from 'ramda'

/**
 * @description
 *   Displays a string of the form: `one, two, three`
 */
export const Tags: React.FC<{tags: string}> = ({tags}) => {
  const tags_ = pipe(tags, split(','), map(trim))

  return (
    <Wrap>
      {tags_.map(tag => (
        <WrapItem
          key={tag}
          bg="teal"
          color="white"
          paddingX={2}
          paddingY={0}
          margin={0}
          fontSize="xs"
        >
          {tag}
        </WrapItem>
      ))}
    </Wrap>
  )
}
