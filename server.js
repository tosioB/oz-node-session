const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const users = [
  {
    user_id: 'test',
    user_password: '1234',
    user_name: '테스트 유저',
    user_info: '테스트 유저입니다.'
  }
]

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  methods: ['OPTIONS', 'POST', 'GET', 'DELETE'],
  credentials: true // 쿠키를 저장하기 위한 필요한 옵션
}))

app.use(cookieParser()) // 요청에서 쿠키를 파싱하여 req.cookies 객체에 쿠키 데이터를 추가
app.use(express.json()) // 요청 본문을 JSON 형식으로 파싱하여 req.body에 JSON 데이터를 추가

app.use(session({ //
  secret: 'session secret', // 세션을 암호화하는 데 사용할 비밀 키를 설정
  resave: false, // 세션이 수정되지 않더라도 매 요청마다 세션을 다시 저장하지 않는다
  saveUninitialized: false, // 새로 생성된 세션이 수정되지 않았더라도 저장하지 않는다
  name: 'session_id' // 세션 이름
}))

app.post('/', (req, res) => {
  const { userId, userPassword } = req.body;
  const userInfo = users.find((e) => e.user_id === userId && e.user_password === userPassword);

  if (!userInfo) {
    res.status(401).send('로그인 실패')
  } else {
    req.session.userId = userInfo.user_id // Express.js에서 세션을 사용하여 사용자 정보를 저장하는 코드
    res.send("세션 생성 완료!")
  }

  // console.log(userInfo)
  // console.log('Received userId:', userId);
  // console.log('Received userPassword:', userPassword);
})

app.get('/', (req, res) => {
  const userInfo = users.find(e => e.user_id === req.session.userId);
  // console.log(userInfo)
  // console.log(res.json(userInfo))
  return res.json(userInfo)
})

app.delete('/', (req, res) => {
  req.session.destroy(); // 세션에 있는 데이터 삭제
  res.clearCookie('session_id') // 쿠키 삭제
  res.send("세션 삭제 완료!")
})

app.listen(3000, () => console.log('3000번 서버 실행'))