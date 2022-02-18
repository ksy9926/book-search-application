import styled from 'styled-components'
import COLOR_PALETTE from 'styles/colors'
import { useDispatch } from 'react-redux'
import { setSearchValue } from 'redux/actions/searchAction'
import { useState, CSSProperties, useCallback, useRef } from 'react'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
import { ReactComponent as CancelIcon } from 'assets/icons/cancel.svg'
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrowDown.svg'
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg'
import { ReactComponent as DelIcon } from 'assets/icons/del.svg'
import { DETAIL_FILTER } from 'constants/constants'

const Search = () => {
  const [values, setValues] = useState({
    query: '',
    title: '',
    author: '',
    publisher: '',
    page: 1,
    isDetail: false,
  })
  const [detailState, setDetailState] = useState(false)
  const [filterState, setFilterState] = useState([
    { filter: DETAIL_FILTER.title, isClosed: true, value: '' },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const searchHandler = useCallback(() => {
    if (values.query.trim() !== '') {
      dispatch(setSearchValue({ ...values, isDetail: false }))
      setDetailState(false)
      onResetHandler()
    } else {
      alert('검색어가 비어있거나 공백입니다!')
    }
  }, [values])

  const detailSearchHandler = useCallback(async () => {
    if (
      values.title.trim() !== '' ||
      values.author.trim() !== '' ||
      values.publisher.trim() !== ''
    ) {
      dispatch(setSearchValue({ ...values, isDetail: true }))
      setDetailState(false)
      onResetHandler()
    } else {
      alert('검색어가 비어있거나 공백입니다!')
    }
  }, [values])

  const onFocusHandler = useCallback((): void => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const onEnterHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        searchHandler()
      }
    },
    [values],
  )

  const onResetHandler = useCallback(() => {
    setValues({
      ...values,
      title: '',
      author: '',
      publisher: '',
    })
    setFilterState([{ filter: DETAIL_FILTER.title, isClosed: true, value: '' }])
  }, [values])

  const onDetailHandler = useCallback(
    (e, idx: number) => {
      const newValues = { ...values }

      if (filterState[idx].filter === DETAIL_FILTER.title) {
        newValues.title = e.target.value
      } else if (filterState[idx].filter === DETAIL_FILTER.author) {
        newValues.author = e.target.value
      } else if (filterState[idx].filter === DETAIL_FILTER.publisher) {
        newValues.publisher = e.target.value
      }
      setValues(newValues)
    },
    [values, filterState],
  )

  const onDeleteHanlder = (idx: number, item: any) => {
    const newFilterState = [...filterState]
    const newValues = { ...values }

    newFilterState.splice(idx, 1)

    if (item.filter === DETAIL_FILTER.title) {
      newValues.title = ''
    } else if (item.filter === DETAIL_FILTER.author) {
      newValues.author = ''
    } else if (item.filter === DETAIL_FILTER.publisher) {
      newValues.publisher = ''
    }
    setValues(newValues)
    setFilterState(newFilterState)
  }

  const dropdown = filterState.map((item, idx) => (
    <Dropdown key={idx}>
      <Filter
        onClick={() => {
          const newState = [...filterState]
          newState[idx].isClosed = !newState[idx].isClosed
          setFilterState(newState)
        }}
      >
        {item.filter}
        <ArrowDownIcon style={arrowDownIconStyle} />
        {!item.isClosed && (
          <DropdownListWrap>
            {Object.values(DETAIL_FILTER)
              .filter(v => v !== item.filter)
              .map(v => (
                <DropdownList
                  key={v}
                  onClick={() => {
                    const newState = [...filterState]
                    newState[idx].filter = v
                    setFilterState(newState)
                  }}
                >
                  {v}
                </DropdownList>
              ))}
          </DropdownListWrap>
        )}
      </Filter>
      <DetailInput
        placeholder="검색어 입력"
        onChange={e => onDetailHandler(e, idx)}
      />
      {idx !== 0 ? (
        <DelIcon
          style={delIconStyle}
          onClick={() => {
            onDeleteHanlder(idx, item)
          }}
        />
      ) : (
        <div style={{ width: '32px' }} />
      )}
    </Dropdown>
  ))

  return (
    <SearchWrap>
      <SearchTitle>도서검색</SearchTitle>
      <SearchInnerWrap>
        <InputDiv>
          <SearchIcon style={searchIconStyle} onClick={onFocusHandler} />
          <Input
            placeholder="검색어 입력"
            value={values.query}
            onChange={e => setValues({ ...values, query: e.target.value })}
            onKeyDown={e => onEnterHandler(e)}
            ref={inputRef}
          />
        </InputDiv>
        <DetailSearchButtonDiv>
          <DetailSearchButton onClick={() => setDetailState(!detailState)}>
            상세검색
          </DetailSearchButton>
          {detailState && (
            <DetailWrap>
              <CancelIcon
                style={cancelIconStyle}
                onClick={() => setDetailState(false)}
              />
              {dropdown}
              {filterState.length < 3 && (
                <AddFilter
                  onClick={() =>
                    setFilterState([
                      ...filterState,
                      {
                        filter: DETAIL_FILTER.title,
                        isClosed: true,
                        value: '',
                      },
                    ])
                  }
                >
                  <PlusIcon style={plusIconStyle} />
                  검색 조건 추가
                </AddFilter>
              )}
              <DropdownButtonDiv>
                <ResetButton onClick={onResetHandler}>초기화</ResetButton>
                <SearchButton
                  onClick={() => {
                    detailSearchHandler()
                  }}
                >
                  검색하기
                </SearchButton>
              </DropdownButtonDiv>
            </DetailWrap>
          )}
        </DetailSearchButtonDiv>
      </SearchInnerWrap>
    </SearchWrap>
  )
}

export default Search

/* ****************************************************************
  Search

[Search Info]
- Description : 검색 및 상세검색을 할 수 있는 컴포넌트
*******************************************************************/

const SearchWrap = styled.section`
  margin-top: 80px;
  padding: 0 40px;
`

const SearchTitle = styled.h2`
  font-weight: bold;
  font-size: 22px;
  color: ${COLOR_PALETTE.GRAY900};
`

const SearchInnerWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`

const InputDiv = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 415px;
  height: 20px;
  padding: 15px 15px 15px 50px;
  border: none;
  border-radius: 100px;
  background: ${COLOR_PALETTE.GRAY100};
  font-size: 16px;
  &:focus {
    outline: none;
  }
`

const DetailSearchButtonDiv = styled.div`
  position: relative;
`

const DetailSearchButton = styled.button`
  background: ${COLOR_PALETTE.WHITE};
  padding: 5px 10px;
  border: 1px solid ${COLOR_PALETTE.GRAY300};
  border-radius: 8px;
  margin-left: 16px;
  font-size: 14px;
  color: ${COLOR_PALETTE.GRAY300};
  cursor: pointer;
`

const DetailWrap = styled.div`
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 46px 24px 24px 24px;
  border-radius: 8px;
  margin-left: 8px;
  background: ${COLOR_PALETTE.WHITE};
  box-shadow: 0px 4px 14px 6px rgba(151, 151, 151, 0.15);
`

const DropdownButtonDiv = styled.div`
  text-align: center;
  margin-top: 40px;
`

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const DropdownListWrap = styled.div`
  position: absolute;
  z-index: 1;
  top: 32px;
  left: 0;
  width: 100px;
  padding: 5px;
  background: ${COLOR_PALETTE.WHITE};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`

const DropdownList = styled.div`
  color: ${COLOR_PALETTE.GRAY300};
  font-size: 14px;
  margin-bottom: 8px;
  &:last-child {
    margin: 0;
  }
`

const Filter = styled.div`
  position: relative;
  width: 100px;
  padding: 5px;
  border-bottom: 1px solid ${COLOR_PALETTE.GRAY200};
  font-weight: bold;
  font-size: 14px;
  color: ${COLOR_PALETTE.GRAY700};
  cursor: pointer;
`

const DetailInput = styled.input`
  width: 180px;
  margin-left: 8px;
  padding: 5px;
  border-bottom: 1px solid ${COLOR_PALETTE.BLUE900};
  font-size: 14px;
  color: ${COLOR_PALETTE.GRAY800};
`

const AddFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  padding: 5px;
  border-radius: 4px;
  margin: 8px 0 0 118px;
  font-size: 14px;
  font-weight: 500;
  background: ${COLOR_PALETTE.BLUE500};
  color: ${COLOR_PALETTE.BLUE900};
  cursor: pointer;
`

const ResetButton = styled.button`
  margin-left: 8px;
  background: ${COLOR_PALETTE.GRAY100};
  border-radius: 8px;
  color: ${COLOR_PALETTE.GRAY500};
  font-size: 14px;
  padding: 5px;
`

const SearchButton = styled.button`
  margin-left: 8px;
  background: ${COLOR_PALETTE.BLUE900};
  border-radius: 8px;
  color: ${COLOR_PALETTE.WHITE};
  font-size: 14px;
  padding: 5px;
`

const searchIconStyle: CSSProperties = {
  position: 'absolute',
  left: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
}

const cancelIconStyle: CSSProperties = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  cursor: 'pointer',
}

const arrowDownIconStyle: CSSProperties = {
  position: 'absolute',
  top: '5px',
  right: '10px',
  cursor: 'pointer',
}

const plusIconStyle: CSSProperties = {
  marginRight: '8px',
}

const delIconStyle: CSSProperties = {
  marginLeft: '8px',
  cursor: 'pointer',
}
