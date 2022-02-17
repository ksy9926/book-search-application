import { SearchState } from 'types/types'

export const SET_SEARCHVALUE = 'search/SET_SEARCHVALUE' as const
export const SET_PAGE = 'search/SET_PAGE' as const

export const setSearchValue = (values: SearchState) => ({
  type: SET_SEARCHVALUE,
  payload: values,
})

export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page,
})
