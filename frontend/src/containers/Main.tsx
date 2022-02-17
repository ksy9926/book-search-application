import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'
import styled from 'styled-components'
import Search from 'components/Search'
import Books from 'components/Books'
import BooksNone from 'components/BooksNone'
import BooksDetailSearch from 'components/BooksDetailSearch'

const Main = () => {
  const search = useSelector((state: RootState) => state.search)
  const { searchState, isDetail } = search

  return (
    <MainWrap>
      <Search />
      {searchState ? (
        isDetail ? (
          <BooksDetailSearch />
        ) : (
          <Books />
        )
      ) : (
        <BooksNone />
      )}
    </MainWrap>
  )
}

export default Main

const MainWrap = styled.main`
  margin: 160px auto 0;
  max-width: 1130px;
`
