# MakerShelf 프로젝트 확인 문서

카페가 소규모 창작자의 상품을 위탁판매할 때 쓰는 재고 관리 시스템입니다. 현재 Phase 1(창작자 관리)까지 구현했습니다.

1. [구현한 기능](#1-구현한-기능)
2. [실행 방법 (DB 설치 없이)](#2-실행-방법-db-설치-없이)
3. [팀원별 역할](#3-팀원별-역할)

## 1. 구현한 기능

### 1-1. 창작자 관리 (백엔드 + 프론트엔드, PC 화면 기준)

메인 페이지에서 가는 링크는 아직 없어서 주소를 직접 입력해야 합니다.

| 번호 | 기능 | 확인 방법 | 예상 결과 |
| --- | --- | --- | --- |
| 1 | 목록 조회 | `/creators` 접속 | 처음에는 `등록된 창작자가 없어요`가 나옴 |
| 2 | 등록 | `+ 새 창작자` 클릭 후 이름 입력, 저장 | 목록에 새 창작자가 추가됨 |
| 3 | 수정 | 목록에서 `수정` 클릭 | 제목이 `OOO님 정보 수정`으로 나오고, 저장하면 목록에 반영됨 |
| 4 | 삭제 | 목록에서 `삭제` 클릭 후 확인 | 목록에서 사라짐 |
| 5 | 이름 검증 | 등록 화면에서 이름에 공백만 넣고 저장 | 입력칸 아래에 `must not be blank`가 나옴 |
| 6 | 없는 창작자 처리 | `/creators/99999/edit` 접속 | `창작자를 찾을 수 없어요`가 나옴 |

### 1-2. API (백엔드)

| 번호 | 요청 | 예상 결과 |
| --- | --- | --- |
| 1 | `GET http://localhost:8080/api/health` | `{"status":"ok"}` |
| 2 | `GET /api/creators` | 200, 창작자 목록 |
| 3 | `GET /api/creators/{id}` | 200, 없는 id는 404 |
| 4 | `POST /api/creators` | 201, 이름이 비었거나 100자를 넘으면 400 |
| 5 | `PUT /api/creators/{id}` | 200, 검증 실패 400, 없는 id 404 |
| 6 | `DELETE /api/creators/{id}` | 204, 없는 id는 404 |

### 1-3. 메인 페이지 (프론트엔드)

| 번호 | 기능 | 확인 방법 | 예상 결과 |
| --- | --- | --- | --- |
| 1 | 섹션 스크롤 | `/`에서 아래로 스크롤하거나 방향키 사용 | 첫 화면에서 역할 섹션으로 한 번에 넘어감 |
| 2 | 역할 카드 | 역할 섹션에서 계속 스크롤 | 카드 3장이 차례로 나타남 |
| 3 | 주요 기능 설명 | 주요 기능 섹션의 항목에 마우스 올리기 | 해당 항목의 설명이 나옴 |
| 4 | 사이드 메뉴 | 오른쪽 위 메뉴 버튼 클릭, Esc로 닫기 | 옆에서 열리고, 폭 740px 이하에서는 전체화면으로 열림 |
| 5 | 반응형 상단바 | 창 폭을 1400 / 1100 / 883px 기준으로 줄이기 | 검색창과 로그인 버튼이 아이콘, 메뉴 순으로 접힘 |
| 6 | 한/영 전환 | 상단바의 언어 버튼 클릭 후 새로고침 | 언어가 바뀌고 새로고침해도 유지됨 |
| 7 | 검색창 지우기 | 검색창에 입력 후 X 클릭 | 입력 내용이 지워짐 |
| 8 | 로그인/회원가입 화면 | `/login`, `/signup` 접속, 비밀번호의 눈 아이콘 클릭 | 비밀번호 표시가 전환됨 (화면만 구현, 실제 로그인 없음) |
| 9 | 404 페이지 | `/abc`처럼 없는 주소로 접속 | 안내 화면과 홈으로 가는 버튼이 나옴 |

### 1-4. 개발 환경과 협업

| 번호 | 항목 | 확인 위치 |
| --- | --- | --- |
| 1 | 로컬 Oracle Docker 환경 | `docker-compose.yml` |
| 2 | Oracle 마이그레이션 V1~V3 | `backend/src/main/resources/db/migration/` |
| 3 | 백엔드 자동 테스트 11개 | `backend`에서 `./gradlew test` |
| 4 | PR마다 실행되는 CI | GitHub Actions 탭, `.github/workflows/ci.yml` |
| 5 | 팀 Git 규칙, PR/이슈 템플릿, 로드맵 | `CONTRIBUTING.md`, `.github/`, `ROADMAP.md` |

### 1-5. 아직 구현하지 않은 것

- 실제 로그인/회원가입, 검색, CTA 버튼과 사이드 메뉴 링크 연결
- 창작자 화면의 모바일 레이아웃
- 위탁계약, 입고배치, 판매, 폐기기록, 정산명세서

## 2. 실행 방법 (DB 설치 없이)

Oracle과 Docker 없이 메모리 DB(H2)로 실행합니다. **JDK 17**과 **Node.js 20.19 이상(또는 22.12 이상)** 만 있으면 됩니다. 데이터는 백엔드를 끄면 사라지고, 샘플 데이터 없이 빈 상태로 시작합니다.

### 2-1. 코드 받기

```bash
git clone https://github.com/devwriet/MakerShelf.git
cd MakerShelf
```

### 2-2. 백엔드 실행 (터미널 1)

**Windows (PowerShell)**

```powershell
cd backend
.\gradlew.bat bootTestRun --args="--spring.datasource.url=jdbc:h2:mem:demo --spring.datasource.username=sa --spring.datasource.password= --spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect --spring.jpa.hibernate.ddl-auto=create-drop --spring.flyway.enabled=false"
```

**macOS/Linux**

```bash
cd backend
./gradlew bootTestRun --args="--spring.datasource.url=jdbc:h2:mem:demo --spring.datasource.username=sa --spring.datasource.password= --spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect --spring.jpa.hibernate.ddl-auto=create-drop --spring.flyway.enabled=false"
```

`Started MakerShelfApplication`이 나오면 켜진 것입니다. 진행률이 100%가 되지 않고 멈춰 있어도 정상입니다.

### 2-3. 프론트엔드 실행 (터미널 2)

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`에 접속합니다. 메인 페이지만 볼 때는 백엔드를 켜지 않아도 됩니다.

실제 Oracle로 실행하려면 [backend/README.md](./backend/README.md)를 참고하세요.

## 3. 팀원별 역할

### 유동윤 (devwriet, 팀장) - 백엔드 + 프론트엔드

- 프로젝트 기본 구조와 팀 문서(Git 규칙, PR/이슈 템플릿, 로드맵)
- 로컬 Oracle Docker 환경
- Flyway 도입과 CI (박동은과 함께)
- 창작자 CRUD API (박동은과 함께), API 테스트 10개
- 창작자 테이블 마이그레이션과 시드 데이터
- 창작자 목록/등록/수정 화면
- 메인 페이지 사이드 메뉴와 블러 버그 수정
- 코드 리뷰와 머지

### 박동은 (anwlroxmfl) - 백엔드

- 창작자 엔티티와 리포지토리
- Flyway 도입과 CI 공동 작업 (유동윤과 함께)
- 창작자 CRUD API 공동 작업 (유동윤과 함께), PR 승인과 머지

### 노승현 (JN803STUDIO, hahahyun09) - 프론트엔드

- 메인 페이지: 상단바, 사이드바, 4개 스크롤 섹션
- 로그인/회원가입 화면, 다국어(한/영)
- 코드 리뷰 반영: 접근성, 모바일 레이아웃, 404 페이지, 반응형 메뉴
- 메인 페이지 작업 정리 문서

### 박동현 (selfer08) - 프론트엔드

- 프론트엔드 기본 구조(틀) 작업 참여
- Figma 디자인 피드백

자세한 내용은 [백엔드 README](./backend/README.md#백엔드-팀-역할과-작업-내용)와 [프론트엔드 README](./frontend/README.md)에 있습니다.
