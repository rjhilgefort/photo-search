import {ExternalLinkIcon} from '@chakra-ui/icons'
import {Heading, Link, List, ListItem} from '@chakra-ui/react'
import * as React from 'react'
import {ImageResult} from '../pixabay'

export const Saved: React.FC<{images: Array<ImageResult>}> = ({images}) => (
  <>
    <Heading size="md" mb="2.5" w="full">
      Saved
    </Heading>
    <List spacing={3.5} w="full">
      {images.map(({id, largeImageURL}) => (
        <ListItem key={id}>
          <Link target="_blank" href={largeImageURL}>
            #{id} <ExternalLinkIcon />
          </Link>
        </ListItem>
      ))}
    </List>
  </>
)
