# 30COS Books

네이버 API를 이용한 책 검색 어플리케이션

<br />

## 🗂 목차

- [**프로젝트 소개**](#1)
- [**기술 스택**](#2)
- [**주요 기능**](#3)
- [**개발 기간**](#4)
- [**실행 방법**](#5)
- [**참고 사이트**](#6)

<div id='1'></div>
<br />

### 💁‍♂️ 프로젝트 소개

-

<div id='2'></div>
<br />

### 🛠 기술 스택

1. typescript, react, redux, react-query, styled-components

<div id='3'></div>
<br />

### 💡 주요 기능

- 네이버 api를 이용한 책 검색
- 제목, 저자, 출판사 등을 설정할 수 있는 상세 검색(아직 미완료)
- 검색 결과 책 목록 출력
- 검색 결과 페이지네이션(아직 미완료)

<div id='4'></div>
<br />

### 🗓 개발 기간

`2022.02.16(수) ~ 2022.02.17(목)`

<div id='5'></div>
<br />

### 🖥 실행 방법

- env 파일을 포함하고 있어 따로 설정 없이 저장소 복제 후 패키지를 설치하여 실행하면 됩니다.

1. 저장소 복제

```bash
git clone https://github.com/ksy9926/book-search-application.git
```

2. 프론트엔드 패키지 설치 및 실행

```bash
cd book-search-application/frontend
yarn install
yarn start
```

3. 백엔드 패키지 설치 및 실행(새로운 터미널)

```bash
cd book-search-application/backend
yarn install
node src
```

<div id='6'></div>
<br />

### 📌 참고 사이트

- [react-query 공식문서](https://react-query.tanstack.com/)
- [react-query 사용법 familyman80.log velog](https://velog.io/@familyman80/React-Query-%ED%95%9C%EA%B8%80-%EB%A9%94%EB%89%B4%EC%96%BC)
- [stack overflow dropdown center](https://stackoverflow.com/questions/38419705/position-dropdown-button-and-dropdown-menu-in-center)
