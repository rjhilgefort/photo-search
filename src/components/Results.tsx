import {Box, Grid, GridItem, Heading, Image, VStack} from '@chakra-ui/react'
import {isEmpty, whereEq, any} from 'ramda'
import * as React from 'react'
import {FaThumbsUp, FaStar} from 'react-icons/fa'
import {ImageResult} from '../pixabay'
import {isUndefined} from '../utils'
import {ActionButton} from './ActionButton'
import {ImageStat} from './ImageStat'
import {Tags} from './Tags'

/**
 * @description
 *   Displays a list of Image Results
 */
export const Results: React.FC<{
  images: Array<ImageResult> | undefined
  savedImages: Array<ImageResult>
  onSave: (imageResult: ImageResult) => unknown
  onUnsave: (imageResult: ImageResult) => unknown
}> = ({images, savedImages, onSave, onUnsave}) => {
  const isSavedImage = (image: ImageResult) =>
    any(whereEq({id: image.id}), savedImages)

  return (
    <VStack width="full" spacing={9}>
      {isUndefined(images) ? null : isEmpty(images) ? (
        <Heading textAlign="center" size="lg" w="full" paddingTop="8">
          No Results!
        </Heading>
      ) : (
        images.map(image => (
          <Grid
            key={image.id}
            templateRows="repeat(2, auto)"
            templateColumns="repeat(2, 1fr)"
            width="full"
            gap={4}
          >
            <GridItem rowSpan={2} display="flex" alignItems="center">
              <Box role="group" position="relative">
                <Image src={image.webformatURL} />
                {isSavedImage(image) ? (
                  <ActionButton
                    text="Saved"
                    bg="orange.400"
                    onClick={() => onUnsave(image)}
                    alwaysVisible
                  />
                ) : (
                  <ActionButton
                    text="Save"
                    bg="pink.500"
                    onClick={() => onSave(image)}
                  />
                )}
              </Box>
            </GridItem>
            <GridItem>
              <Tags tags={image.tags} />
            </GridItem>
            <GridItem
              display="flex"
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <ImageStat text={image.likes} icon={FaThumbsUp} />
              <ImageStat text={image.comments} icon={FaStar} />
            </GridItem>
          </Grid>
        ))
      )}
    </VStack>
  )
}
