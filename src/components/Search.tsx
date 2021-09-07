import {Button, FormControl, Input, Select, VStack} from '@chakra-ui/react'
import {pipe} from 'fp-ts/lib/function'
import * as React from 'react'
import {Category, CategoryInput, searchImages} from '../pixabay'
import {Options} from './Options'

export type Search_OnSubmit = ({
  keywords,
  category,
}: {
  keywords: string
  category: CategoryInput
}) => void

export const Search: React.FC<{
  spacing: number
  onSubmit: (params: Parameters<typeof searchImages>[0]) => void
}> = ({spacing, onSubmit}) => {
  const [keywords, setKeywords] = React.useState<string>('')
  const [category, setCategory] = React.useState<CategoryInput>()

  const keywordOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setKeywords(event.currentTarget.value)

  const categoryOnChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    pipe(event.currentTarget.value, CategoryInput.parse, setCategory)

  const formOnSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit({keywords, category})
  }

  return (
    <form onSubmit={formOnSubmit}>
      <VStack spacing={spacing} padding={0}>
        <FormControl>
          <Input
            placeholder="Keyword..."
            _placeholder={{color: 'grey'}}
            onChange={keywordOnChange}
            isRequired
          ></Input>
        </FormControl>
        <FormControl>
          <Select placeholder="Category" onChange={categoryOnChange}>
            {Options<Category>(Category.options)}
          </Select>
        </FormControl>
        <Button type="submit" color="white" bg="blue" width="full">
          Button
        </Button>
      </VStack>
    </form>
  )
}
