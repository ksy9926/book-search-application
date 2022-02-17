import { setSearchValue } from "redux/actions/searchAction";

export type SearchAction = ReturnType<typeof setSearchValue>

export type SearchState = {
  searchValue: string;
  searchState: boolean;
};