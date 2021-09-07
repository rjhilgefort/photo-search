import {BackgroundProps, Box} from '@chakra-ui/react'

/**
 * @description
 *   Allows for a hoverable action button on an image
 */
export const ActionButton: React.FC<{
  onClick: (event: React.MouseEvent) => void
  text: string
  bg: BackgroundProps['bg']
  alwaysVisible?: boolean
}> = ({onClick, text, bg, alwaysVisible}) => (
  <Box
    role="group"
    position="absolute"
    bottom={0}
    left={0}
    right={0}
    textAlign="center"
    display={alwaysVisible === true ? 'block' : 'none'}
    _groupHover={{display: 'block'}}
    bg={bg}
    color="white"
    fontWeight="bold"
    cursor="pointer"
    onClick={onClick}
  >
    {text}
  </Box>
)
