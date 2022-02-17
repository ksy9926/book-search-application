import { useQuery, useQueryClient } from 'react-query'
import { fetchBooksInfo } from 'apis/api'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'

const Books = () => {
  const { searchValue } = useSelector((state: RootState) => state.search)
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery(['books', searchValue], () =>
    fetchBooksInfo(searchValue),
  )

  console.log('isLoading: ', isLoading)
  console.log('error: ', error)
  console.log('data: ', data)

  const books = data.items.map((item: any, id: number) => (
    <div key={id}>{item.title}</div>
  ))

  return (
    <div>
      <div>도서 검색결과 총 21건</div>

      {error && <div>검색된 결과가 없습니다.</div>}

      {isLoading ? (
        <div>네이버 책 검색의 데이터를 불러옵니다 ...</div>
      ) : (
        <div>{books}</div>
      )}
    </div>
  )
}

export default Books
