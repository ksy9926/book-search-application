import '../env.js'
import express, { request } from 'express'
import cors from 'cors'
import axios from 'axios'
import convert from 'xml-js'

const app = express()
const { PORT, API_URL, X_NAVER_CLIENT_ID, X_NAVER_CLIENT_SECRET } = process.env

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/', async (req, res) => {
  const query = req.query.query

  const url_encodeURI = encodeURI(`${API_URL}/book.json?query=${query}`)

  try {
    const response = await axios.get(url_encodeURI, {
      headers: {
        'X-Naver-Client-Id': X_NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': X_NAVER_CLIENT_SECRET,
      },
    })

    res.status(200).send(response.data)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/detail', async (req, res) => {
  const title = req.query.title
  const author = req.query.author
  const publisher = req.query.publisher
  const url_encodeURI = encodeURI(
    `${API_URL}/book_adv.xml?d_titl=${title}&d_auth=${author}&d_publ=${publisher}`
  )

  try {
    const response = await axios.get(url_encodeURI, {
      headers: {
        'X-Naver-Client-Id': X_NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': X_NAVER_CLIENT_SECRET,
      },
    })

    const convertedData = convert.xml2json(response.data)

    res.status(200).send(convertedData)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`)
})
