import {Box, Flex, Spinner, VStack} from '@chakra-ui/react'
import {pipe} from 'fp-ts/lib/function'
import {append, isNil, without} from 'ramda'
import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Saved, Search, ErrorFallback, Results} from './components'
import {ImageResult, searchImages, SearchImages_Params} from './pixabay'
import {isUndefined} from './utils'

const LAYOUT_PADDING = 2
const STACK_SPACING = 4

/**
 * @description
 *   App route, primary page.
 */
export const App = () => {
  const loadingInitial = false
  const [loading, setLoading] = React.useState<boolean>(loadingInitial)

  const errorInitial = undefined
  const [error, setError] = React.useState<Error | undefined>(errorInitial)

  const searchResultsInitial = undefined
  const [searchResults, setSearchResults] = React.useState<
    Array<ImageResult> | undefined
  >(searchResultsInitial)

  const savedImagesInitial = []
  const savedImages_storageKey = 'savedImage'
  const [savedImages, setSavedImages] = React.useState<Array<ImageResult>>(
    () => {
      const storageSavedImages = localStorage.getItem(savedImages_storageKey)

      return isNil(storageSavedImages)
        ? savedImagesInitial
        : JSON.parse(storageSavedImages)
    }
  )

  React.useEffect(() => {
    localStorage.setItem(savedImages_storageKey, JSON.stringify(savedImages))
  }, [savedImages])

  const errorBoundaryOnReset = () => {
    setSearchResults(searchResultsInitial)
    setSavedImages(savedImagesInitial)
    setLoading(loadingInitial)
    setError(errorInitial)
  }

  const onSearchSubmit = async (params: SearchImages_Params) => {
    setLoading(true)
    await searchImages(params).then(setSearchResults, setError)
    setLoading(false)
  }

  const onImageSave = (image: ImageResult) =>
    pipe(savedImages, append(image), setSavedImages)

  const onImageUnsave = (image: ImageResult) =>
    pipe(savedImages, without([image]), setSavedImages)

  if (!isUndefined(error)) {
    return (
      <ErrorFallback error={error} resetErrorBoundary={errorBoundaryOnReset} />
    )
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={errorBoundaryOnReset}
    >
      <Flex>
        <VStack
          spacing={STACK_SPACING}
          width="70%"
          paddingY={LAYOUT_PADDING}
          paddingLeft={LAYOUT_PADDING}
          paddingRight={4}
          height="100vh"
          overflowY="scroll"
        >
          <Search spacing={STACK_SPACING} onSubmit={onSearchSubmit} />
          {loading === true ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Results
              images={searchResults}
              savedImages={savedImages}
              onSave={onImageSave}
              onUnsave={onImageUnsave}
            />
          )}
        </VStack>
        <Box
          width="30%"
          fontSize="xs"
          paddingY={LAYOUT_PADDING}
          paddingLeft={6}
          paddingRight={LAYOUT_PADDING}
          height="100vh"
          overflowY="scroll"
          position="relative"
          _before={{
            position: 'absolute',
            bg: 'lightgrey',
            top: LAYOUT_PADDING,
            left: 0,
            bottom: LAYOUT_PADDING,
            width: '1px',
            content: '""',
          }}
        >
          <Saved images={savedImages} />
        </Box>
      </Flex>
    </ErrorBoundary>
  )
}
