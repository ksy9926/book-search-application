import styled from 'styled-components'
import COLOR_PALETTE from 'styles/colors'
import { useDispatch } from 'react-redux'
import { setSearchValue } from 'redux/actions/searchAction'
import { useState } from 'react'

const Search = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  return (
    <SearchWrap>
      <SearchTitle>도서검색</SearchTitle>
      <div>
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={() => dispatch(setSearchValue(value))}>
          상세검색
        </button>
      </div>
    </SearchWrap>
  )
}

export default Search

/* ****************************************************************
  Search

[Search Component Size]
- Search Width : 1130px
*******************************************************************/

const SearchWrap = styled.section``

const SearchTitle = styled.h2`
  font-weight: bold;
  font-size: 22px;
  color: ${COLOR_PALETTE.GRAY900};
`
