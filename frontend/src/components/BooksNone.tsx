import { ReactComponent as BookIcon } from 'assets/icons/book.svg'
import styled from 'styled-components'
import COLOR_PALETTE from 'styles/colors'

const BooksNone = () => {
  return (
    <BooksWrap>
      <ResultWrap>
        <ResultTitle>도서 검색 결과</ResultTitle>
        <ResultCountSpan>
          총 <ResultCount>0</ResultCount>건
        </ResultCountSpan>
      </ResultWrap>
      <BookIconDiv>
        <BookIcon />
        <NoResult>검색된 결과가 없습니다.</NoResult>
      </BookIconDiv>
    </BooksWrap>
  )
}

export default BooksNone

/* ****************************************************************
  BooksNone

[BooksNone Info]
- Description: 검색을 진행하지 않았을 경우 또는 결과가 0건 일때 표시되는 컴포넌트
*******************************************************************/

const BooksWrap = styled.section`
  margin-top: 32px;
  padding: 0 40px;
`

const ResultWrap = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_PALETTE.GRAY700};
`

const ResultTitle = styled.span``

const ResultCountSpan = styled.span`
  margin-left: 16px;
`
const ResultCount = styled.span`
  color: ${COLOR_PALETTE.BLUE900};
`

const BookIconDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
`

const NoResult = styled.div`
  margin-top: 24px;
  color: ${COLOR_PALETTE.GRAY500};
`
