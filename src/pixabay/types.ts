import {z} from 'zod'

export const Category = z.enum([
  'fashion',
  'nature',
  'backgrounds',
  'science',
  'education',
  'people',
  'feelings',
  'religion',
  'health',
  'places',
  'animals',
  'industry',
  'food',
  'computer',
  'sports',
  'transportation',
  'travel',
  'buildings',
  'business',
  'music',
])
export type Category = z.infer<typeof Category>

export const CategoryInput = z.union([Category, z.undefined()])
export type CategoryInput = z.infer<typeof CategoryInput>

export const ImageResult = z.object({
  id: z.number(),
  webformatURL: z.string().url(),
  largeImageURL: z.string().url(),
  tags: z.string(),
  likes: z.number(),
  // NOTE: Using `comments` instead of `favorites` because
  //       that's not present on the response nor the docs.
  comments: z.number(),
})
export type ImageResult = z.infer<typeof ImageResult>
