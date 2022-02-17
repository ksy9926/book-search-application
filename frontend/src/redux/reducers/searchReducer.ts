import { SET_SEARCHVALUE } from 'redux/actions/searchAction'
import { SearchState, SearchAction } from 'types/types';

const initialState: SearchState = {
  searchValue: '',
  searchState: false
};

function search(
  state: SearchState = initialState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case SET_SEARCHVALUE: // case 라고 입력하고 Ctrl + Space 를 누르면 어떤 종류의 action.type들이 있는지 확인 할 수 있습니다.
      return { searchValue: action.payload, searchState: true };
    default:
      return state;
  }
}

export default search;