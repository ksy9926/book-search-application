import { SET_SEARCHVALUE, SET_PAGE } from 'redux/actions/searchAction'
import { SearchState, SearchAction } from 'types/types'

const initialState: SearchState = {
  searchState: false,
  query: '',
  title: '',
  author: '',
  publisher: '',
  page: 1,
  isDetail: false,
}

function search(
  state: SearchState = initialState,
  action: SearchAction,
): SearchState {
  switch (action.type) {
    case SET_SEARCHVALUE: // case 라고 입력하고 Ctrl + Space 를 누르면 어떤 종류의 action.type들이 있는지 확인 할 수 있습니다.
      return {
        query: action.payload.query,
        searchState: true,
        page: 1,
        title: action.payload.title,
        author: action.payload.author,
        publisher: action.payload.publisher,
        isDetail: action.payload.isDetail,
      }
    case SET_PAGE:
      return { ...state, page: action.payload }
    default:
      return state
  }
}

export default search
