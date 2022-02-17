import { setPage, setSearchValue } from 'redux/actions/searchAction'

export type SearchAction =
  | ReturnType<typeof setSearchValue>
  | ReturnType<typeof setPage>

export type SearchState = {
  searchState?: boolean
  query: string
  title: string
  author: string
  publisher: string
  page: number
  isDetail: boolean
}
