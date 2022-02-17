import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'
import styled from 'styled-components'
import Search from 'components/Search'
import Books from 'components/Books'

const Main = () => {
  const { searchState } = useSelector((state: RootState) => state.search)

  return (
    <MainWrap>
      <Search />
      {searchState ? <Books /> : <div>검색된 결과가 없습니다.</div>}
    </MainWrap>
  )
}

export default Main

const MainWrap = styled.main`
  margin: 80px auto 0;
  max-width: 1130px;
`
