import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrowDown.svg'
import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrowLeft.svg'
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrowRight.svg'
import { fetchBooksInfo } from 'apis/api'
import styled, { CSSProperties } from 'styled-components'
import COLOR_PALETTE from 'styles/colors'
import BooksNone from './BooksNone'
import { setPage } from 'redux/actions/searchAction'

const BooksDetailSearch = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const [selectedBooks, setSelectedBooks] = useState<number[]>([])
  const search = useSelector((state: RootState) => state.search)
  const { title, author, publisher, page, isDetail } = search

  const { isLoading, error, data } = useQuery(
    ['booksDetail', title, author, publisher],
    () => fetchBooksInfo(search),
  )

  const booksData = data?.elements
    ? data.elements[0].elements[0].elements
    : data

  if (error) {
    alert('데이터 불러오기 실패')
    return <BooksNone />
  } else if (booksData && booksData[6].elements[0].text === '0') {
    return <BooksNone />
  }

  const booksList = booksData
    ?.filter((item: any) => item.name === 'item')
    .map((item: any, id: number) => {
      if (!selectedBooks.includes(id)) {
        return (
          <BookInfos key={id}>
            <BookImg
              src={item.elements[2].elements[0].text}
              alt="book"
            ></BookImg>
            <BookTitle>
              {item.elements[0].elements[0].text.replace(/<b>|<\/b>/g, '')}
              <BookAuthor>
                {item.elements[3].elements[0].text.replace(/<b>|<\/b>/g, '')}
              </BookAuthor>
            </BookTitle>
            <BookPrice>
              {parseInt(item.elements[4].elements[0].text).toLocaleString()}원
            </BookPrice>
            <BuyButton href={item.link} target="_blank">
              구매하기
            </BuyButton>
            <DetailButton
              onClick={() => setSelectedBooks([...selectedBooks, id])}
            >
              상세보기 <ArrowDownIcon />
            </DetailButton>
          </BookInfos>
        )
      } else {
        return (
          <BookDetailInfos key={id}>
            <BookDetailImg
              src={item.elements[2].elements[0].text}
              alt="book"
            ></BookDetailImg>
            <BookDetailDescription>
              <BookDetailTitle>
                {item.elements[0].elements[0].text.replace(/<b>|<\/b>/g, '')}
                <BookDetailAuthor>
                  {item.elements[3].elements[0].text.replace(/<b>|<\/b>/g, '')}
                </BookDetailAuthor>
              </BookDetailTitle>
              <BookIntroduce>책 소개</BookIntroduce>
              <BookSummary>
                {item.elements[9].elements[0].text.replace(/<b>|<\/b>/g, '')}
              </BookSummary>
            </BookDetailDescription>
            <BookEtcInfo>
              <DetailDetailButton
                onClick={() => {
                  const newSelected = [...selectedBooks]
                  const selectedIdx: number = newSelected.indexOf(id)
                  newSelected.splice(selectedIdx, 1)
                  setSelectedBooks(newSelected)
                }}
              >
                상세보기 <ArrowDownIcon />
              </DetailDetailButton>
              <DetailPrice>
                원가{' '}
                <DetailPriceSpan>
                  {parseInt(item.elements[4].elements[0].text).toLocaleString()}
                </DetailPriceSpan>
              </DetailPrice>
              <DetailDiscount>
                할인가{' '}
                <DetailDiscountSpan>
                  {parseInt(item.elements[5].elements[0].text).toLocaleString()}
                </DetailDiscountSpan>
              </DetailDiscount>
              <DetailBuyButton
                href={item.elements[1].elements[0].text}
                target="_blank"
              >
                구매하기
              </DetailBuyButton>
            </BookEtcInfo>
          </BookDetailInfos>
        )
      }
    })

  return (
    <BooksWrap>
      <ResultWrap>
        <ResultTitle>도서 검색 결과</ResultTitle>
        <ResultCountSpan>
          총{' '}
          <ResultCount>
            {booksData ? booksData[4].elements[0].text : 0}
          </ResultCount>
          건
        </ResultCountSpan>
      </ResultWrap>

      {isLoading ? (
        <div>네이버 책 검색의 데이터를 불러오고 있습니다 ...</div>
      ) : (
        <>
          <BookInfosWrap>{booksList}</BookInfosWrap>
          <Pagination>
            <ArrowLeftIcon style={paginationArrowStyle} />
            {Math.ceil(booksData[4].elements[0].text / 10) > 10 ? (
              Array(10)
                .fill(0)
                .map((item, idx) => (
                  <Page key={idx} onClick={() => dispatch(setPage(idx + 1))}>
                    {idx + 1}
                  </Page>
                ))
            ) : (
              <></>
            )}
            <ArrowRightIcon style={paginationArrowStyle} />
          </Pagination>
        </>
      )}
    </BooksWrap>
  )
}

export default BooksDetailSearch

/* ****************************************************************
  Books

[Books Info]
- Description: 검색 결과 나온 책 목록을 띄워주는 컴포넌트
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

const BookInfosWrap = styled.div`
  margin-top: 40px;
`

const BookInfos = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLOR_PALETTE.GRAY200};
  padding: 16px;
`

const BookImg = styled.img`
  flex: 1;
  width: 48px;
  height: 68px;
`

const BookTitle = styled.div`
  flex: 8;
  margin-left: 48px;
`
const BookAuthor = styled.span`
  margin-left: 16px;
  color: ${COLOR_PALETTE.GRAY300};
`

const BookPrice = styled.div`
  flex: 2;
  margin-left: 16px;
  font-size: 18px;
  font-weight: 700;
`

const BuyButton = styled.a`
  flex: 2;
  padding: 12px 0;
  border-radius: 8px;
  background: ${COLOR_PALETTE.BLUE900};
  text-align: center;
  color: ${COLOR_PALETTE.WHITE};
  cursor: pointer;
`
const DetailButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  padding: 12px 0;
  border-radius: 8px;
  margin-left: 8px;
  background: ${COLOR_PALETTE.GRAY100};
  text-align: center;
  color: ${COLOR_PALETTE.GRAY500};
  cursor: pointer;
`

const BookDetailInfos = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLOR_PALETTE.GRAY200};
  padding: 40px 16px;
`

const BookDetailImg = styled.img`
  flex: 1.5;
`

const BookDetailDescription = styled.div`
  flex: 4;
  margin-left: 48px;
  align-self: flex-start;
`

const BookDetailTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`

const BookDetailAuthor = styled.span`
  margin-left: 16px;
  font-size: 14px;
  color: ${COLOR_PALETTE.GRAY300};
`
const BookIntroduce = styled.div`
  margin-top: 16px;
  font-size: 14px;
`

const BookSummary = styled.div`
  margin-top: 12px;
`

const BookEtcInfo = styled.div`
  flex: 2;
  align-self: start;
  margin-left: 48px;
`

const DetailPrice = styled.div`
  margin-top: 64px;
  text-align: end;
  font-size: 10px;
  color: ${COLOR_PALETTE.GRAY300};
`

const DetailPriceSpan = styled.span`
  margin-left: 8px;
  text-decoration: line-through;
  font-size: 18px;
  color: ${COLOR_PALETTE.GRAY800};
`

const DetailDiscount = styled.div`
  margin-top: 8px;
  text-align: end;
  font-size: 10px;
  color: ${COLOR_PALETTE.GRAY300};
`

const DetailDiscountSpan = styled.span`
  margin-left: 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${COLOR_PALETTE.GRAY800};
`

const DetailDetailButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 12px 0;
  border-radius: 8px;
  margin: 0 0 0 auto;
  background: ${COLOR_PALETTE.GRAY100};
  text-align: center;
  color: ${COLOR_PALETTE.GRAY500};
  cursor: pointer;
`

const DetailBuyButton = styled.a`
  display: block;
  padding: 12px 0;
  border-radius: 8px;
  margin-top: 28px;
  background: ${COLOR_PALETTE.BLUE900};
  text-align: center;
  color: ${COLOR_PALETTE.WHITE};
  cursor: pointer;
`

const Pagination = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin: 56px 0;
`

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid #dadada;
  border-radius: 4px;
  font-size: 14px;
  corlor: ${COLOR_PALETTE.GRAY300};
  cursor: pointer;
`

const paginationArrowStyle: CSSProperties = {
  cursor: 'pointer',
}
