import axios from 'axios'
import { SearchState } from 'types/types'

export const fetchBooksInfo = async (search: SearchState) => {
  const { query, title, author, publisher, page, isDetail } = search
  const url = isDetail
    ? `http://localhost:8080/detail?title=${title}&author=${author}&publisher=${publisher}`
    : `http://localhost:8080?query=${query}`
  const res = await axios.get<any>(url)

  return res.data
}
