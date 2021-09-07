import {flow, pipe} from 'fp-ts/lib/function'
import ky from 'ky'
import {defaultTo, join, prop, split} from 'ramda'
import {z} from 'zod'
import {CategoryInput, ImageResult} from './types'

export type SearchImages_Params = {
  keywords: string
  category: CategoryInput
}

const ImageSearchResults = z.object({hits: z.array(ImageResult)})

/**
 * @description Searches the Pixabay API for images best on keywords and category
 */
export const searchImages = async (
  params: SearchImages_Params
): Promise<Array<ImageResult>> => {
  // TODO: These should always be set from the environment but could handle better when/if they aren't
  const PIXABAY_URL = pipe(process.env.REACT_APP_PIXABAY_URL, z.string().parse)
  const PIXABAY_API_KEY = pipe(
    process.env.REACT_APP_PIXABAY_API_KEY,
    z.string().parse
  )

  const keywords = pipe(params.keywords, split(' '), join('+'))
  const category = pipe(params.category, defaultTo(''))

  return ky(PIXABAY_URL, {
    searchParams: {
      key: PIXABAY_API_KEY,
      q: keywords,
      category,
      per_page: 10,
    },
  })
    .json()
    .then(flow(ImageSearchResults.parse, prop('hits')))
}
