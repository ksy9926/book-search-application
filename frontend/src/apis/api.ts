import axios from 'axios'

export const fetchBooksInfo = async (query: string) => {
  // 받아오는 res.data의 type이 axios.get<> 안에 들어감.
  const res = await axios.get<any>(`http://localhost:8080?query=${query}`, {
    headers: {
      'X-Naver-Client-Id': 'JmRJSLl_LqA1HOTqhyZ6',
      'X-Naver-Client-Secret': 'R1SgcgwrFp',
    },
  });
  return res.data
};