export const SET_SEARCHVALUE = 'search/SET_SEARCHVALUE' as const;

export const setSearchValue = (value: string) => ({
  type: SET_SEARCHVALUE,
  payload: value
});