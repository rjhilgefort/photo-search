import {Icon, Text, HStack} from '@chakra-ui/react'
import * as React from 'react'
import {IconType} from 'react-icons/lib'

export const ImageStat: React.FC<{
  text: string | number
  icon: IconType
}> = ({text, icon}) => (
  <HStack>
    <Text fontSize="xs">{text}</Text>
    <Icon as={icon} width={3} />
  </HStack>
)
