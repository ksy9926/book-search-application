import { setPage, setSearchValue } from 'redux/actions/searchAction'

export type SearchAction =
  | ReturnType<typeof setSearchValue>
  | ReturnType<typeof setPage>

export type SearchState = {
  searchValue: string
  searchState: boolean
  page: number
}
