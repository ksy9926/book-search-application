export const SET_SEARCHVALUE = 'search/SET_SEARCHVALUE' as const
export const SET_PAGE = 'search/SET_PAGE' as const

export const setSearchValue = (value: string) => ({
  type: SET_SEARCHVALUE,
  payload: value,
})

export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page,
})
