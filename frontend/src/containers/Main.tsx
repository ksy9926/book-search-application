import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'
import styled from 'styled-components'
import Search from 'components/Search'
import Books from 'components/Books'
import BooksNone from 'components/BooksNone'

const Main = () => {
  const { searchState } = useSelector((state: RootState) => state.search)

  return (
    <MainWrap>
      <Search />
      {searchState ? <Books /> : <BooksNone />}
    </MainWrap>
  )
}

export default Main

const MainWrap = styled.main`
  margin: 160px auto 0;
  max-width: 1130px;
`
