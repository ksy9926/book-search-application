import axios from 'axios'

export const fetchBooksInfo = async (
  query: string,
  // title: string,
  // author: string,
  // publisher: string,
) => {
  // 받아오는 res.data의 type이 axios.get<> 안에 들어감.
  const res = await axios.get<any>(
    `http://localhost:8080?query=${query}`,
    // `http://localhost:8080?query=${query}&d_titl=${title}&d_auth=${author}&d_publ=${publisher}`,
  )
  return res.data
}
