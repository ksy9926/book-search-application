import axios from 'axios'

export const fetchBooksInfo = async () => {
  // 받아오는 res.data의 type이 axios.get<> 안에 들어감.
  const res = await axios.get<any>('https://openapi.naver.com/v1/serach/book.json', {
    headers: {
      'X-Naver-Client-Id': 'spT7e4fr9Fv0p2YvkrOX',
      'X-Naver-Client-Secret': 'TID7RpKb9p'
    },
    withCredentials: true
  },);
  console.log('res', res)
  return res
};