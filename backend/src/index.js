import '../env.js';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const { PORT, API_URL, X_NAVER_CLIENT_ID, X_NAVER_CLIENT_SECRET } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const query = req.query.query;
  const url_encodeURI = encodeURI(`${API_URL}?query=${query}`);

  try {
    const response = await axios.get(url_encodeURI, {
      headers: {
        'X-Naver-Client-Id': X_NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': X_NAVER_CLIENT_SECRET,
      },
    });
    res.status(200).send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
