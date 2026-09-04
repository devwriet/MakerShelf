# MakerShelf 팀 GitHub Desktop 가이드

이 문서는 터미널 명령어 대신 **GitHub Desktop**(GUI 앱)으로 작업하는 팀원을 위한 가이드예요. **팀 규칙(브랜치 이름 규칙, 커밋 메시지 형식, PR 절차, 금지 사항 등)은 이 문서가 아니라 [CONTRIBUTING.md](./CONTRIBUTING.md)가 기준이에요** — 여기서는 그 규칙을 GitHub Desktop 화면으로 어떻게 실행하는지만 안내해요. 규칙 자체가 궁금하면 항상 CONTRIBUTING.md를 먼저 확인하세요.

**GitHub Desktop은 Git 작업(클론/브랜치/커밋/푸시/PR)만 대신해줘요.** 백엔드/프론트엔드를 실제로 실행하려면 GitHub Desktop과 별개로 터미널(PowerShell)이 필요해요 — [backend/README.md](./backend/README.md), [frontend/README.md](./frontend/README.md)를 참고하세요. GitHub Desktop을 쓴다고 터미널을 아예 안 써도 되는 건 아니에요.

막히는 부분이 있으면 리더에게 바로 물어보세요.

## 1. 팀 규칙 한눈에 보기

[CONTRIBUTING.md의 "1. 팀 규칙 한눈에 보기"](./CONTRIBUTING.md#1-팀-규칙-한눈에-보기)와 동일해요. 요약: `main` 직접 수정 금지, 작업 끝나면 PR, 리더가 리뷰 후 머지, `main`에 강제 덮어쓰기 금지.

## 2. 용어 (GitHub Desktop 화면 기준)

일반 Git 용어(저장소/브랜치/커밋/푸시/PR)는 [CONTRIBUTING.md의 "2. 용어와 저장 위치"](./CONTRIBUTING.md#2-용어와-저장-위치)를 참고하세요. 아래는 그 용어가 GitHub Desktop 화면에서 어디 있는지예요.

| 용어 | GitHub Desktop에서 |
| --- | --- |
| 스테이징 | 왼쪽 `Changes` 목록에서 파일 체크박스를 켜는 것 (파일 전체 또는 줄 단위로도 가능) |
| 커밋 | `Summary` 입력 후 `Commit to 브랜치명` 버튼 |
| 푸시 | `Push origin` 버튼 (새 브랜치는 처음엔 `Publish branch`) |
| 풀 | `Fetch origin` → 새 커밋이 있으면 버튼이 `Pull origin`으로 바뀜 |
| PR | `Preview Pull Request` → 브라우저에서 `Create Pull Request` |

## 3. 처음 한 번: 설치, 로그인, 클론

### 3-1. 설치

[desktop.github.com](https://desktop.github.com/download/)에서 다운로드해요. Windows는 64비트 설치 파일 또는 MSI, macOS는 Apple Silicon/Intel용이 따로 있어요.

### 3-2. GitHub 계정 로그인

- Windows: `File > Options > Accounts > Sign Into GitHub.com`
- macOS: `GitHub Desktop > Settings > Accounts > Sign Into GitHub.com`

`Continue With Browser`를 누르면 브라우저가 열리고, 브라우저에서 로그인(2단계 인증 포함)한 뒤 다시 Desktop으로 돌아와요. 아이디/비밀번호를 앱에 직접 입력하는 방식이 아니에요.

### 3-3. 커밋에 쓸 이름/이메일 설정

로그인했다고 커밋 이름/이메일이 자동으로 맞춰지는 건 아니에요. 아래에서 직접 확인/설정하세요.

- Windows: `File > Options > Git`
- macOS: `GitHub Desktop > Settings > Git`

`Name`과 `Email`을 입력하고 `Save`.

### 3-4. 저장소 접근 권한 + 클론

먼저 리더에게 이 저장소(MakerShelf)에 팀원으로 초대받았는지 확인하세요 — 초대를 안 받은 상태면 로그인/설치가 다 됐어도 클론이 안 돼요 (`repository not found`류 오류가 나요).

1. GitHub.com에서 저장소 페이지로 이동 → 초록색 `Code` 버튼 → `HTTPS` 탭에서 URL 복사 (또는 리더에게 URL을 직접 받아도 돼요)
2. Desktop에서 `File > Clone Repository` → `URL` 탭 선택 → 복사한 URL 붙여넣기 → 저장할 로컬 폴더를 `Choose...`로 지정 → `Clone`

### 3-5. (충돌 해결에 필요) 기본 에디터 설정

나중에 충돌 해결할 때 파일을 열 에디터가 필요해요. 미리 설정해두세요.

- Windows: `File > Options > Integrations > External Editor`
- macOS: `GitHub Desktop > Settings > Integrations > External Editor`

VS Code 등 목록에 있는 에디터를 선택하고 `Save`. 목록에 없다면 `Configure Custom Editor`로 실행 파일을 직접 지정할 수 있어요. 에디터를 Desktop 실행 중에 설치했다면, Desktop을 껐다 켜야 인식돼요.

## 4. 기능 작업의 표준 흐름

브랜치 이름 규칙(`feature/backend-...` / `feature/frontend-...`, Figma 선행 규칙 포함)과 커밋 메시지 형식은 [CONTRIBUTING.md의 "4-1. 브랜치는 backend/ 또는 frontend/ 한쪽만"](./CONTRIBUTING.md#4-1-브랜치는-backend-또는-frontend-한쪽만-기본-규칙)과 ["4-2. 커밋 메시지 규칙"](./CONTRIBUTING.md#4-2-커밋-메시지-규칙)이 기준이에요 — 아래는 그 규칙을 Desktop에서 어떻게 실행하는지예요.

### 4-1. 최신 main 받고 새 브랜치 만들기

1. 상단 `Current Branch` 드롭다운에서 `main`으로 이동
2. `Fetch origin` 클릭 (새 커밋이 있으면 버튼이 `Pull origin`으로 바뀜 → 클릭해서 반영)
3. 다시 `Current Branch` 드롭다운 → `New Branch` → 이름 입력 (예: `feature/backend-공급자-api`, `feature/frontend-공급자-화면` — CONTRIBUTING.md 4-1 규칙대로) → `Create branch based on...`이 `main`으로 되어 있는지 확인 → `Create Branch`

### 4-2. 작업 중 커밋

1. 왼쪽 `Changes` 목록에서 이번 커밋에 포함할 파일(또는 파일 안의 특정 줄)에 체크
2. 하단 `Summary`(필수)와 `Description`(선택)에 커밋 메시지 작성 — 형식은 CONTRIBUTING.md 4-2와 동일 (`Add: 공급자 등록 API 추가` 형태)
3. `Commit to 브랜치명` 클릭 — 버튼에 브랜치명이 표시되니, 커밋 전에 브랜치를 잘못 고르지 않았는지 확인하는 습관을 들이세요

### 4-3. 푸시

상단 `Push origin` 클릭. 새로 만든 브랜치를 처음 올릴 때는 버튼이 `Publish branch`로 보여요.

**끝난 뒤 상태**: 로컬 커밋이 원격 저장소의 같은 이름 브랜치에 올라가 있어요. `main`은 아직 그대로예요.

## 5. PR 생성

1. 커밋 후 `Push origin`(또는 `Publish branch`)까지 완료
2. 상단에 `Preview Pull Request` 버튼이 보여요 — 클릭
3. `base:` 드롭다운에서 합쳐질 브랜치(`main`) 확인
4. 미리보기에서 `Create Pull Request` 클릭 → 브라우저의 GitHub로 이동
5. 브라우저에서 [PR 템플릿](./.github/PULL_REQUEST_TEMPLATE.md)이 자동으로 채워져요 — 필수 항목(무엇을 바꿨는지, 어떻게 테스트했는지)을 채우고, Figma 링크/API 계약은 해당하는 경우에만 채운 뒤 `Create Pull Request`. **실제 PR은 브라우저에서 만들어져요 — Desktop 안에서 완성되지 않아요.**

## 6. 코드 리뷰와 수정 반영

- **리뷰 코멘트 작성, 승인(Approve), 수정 요청, 머지는 모두 GitHub.com(브라우저)에서 해요.** Desktop에서는 PR의 커밋/diff를 살펴보거나 체크(CI 등)를 다시 실행할 수는 있지만, 리뷰 코멘트를 달거나 승인/머지하는 조작 자체는 Desktop 안에 없어요.
- Desktop `Current Branch` 옆 `Pull Requests` 탭에서 내 PR을 확인할 수 있고, 알림(코멘트/승인/수정요청)도 뜨지만 실제 대화는 클릭해서 브라우저로 가야 해요.
- 코멘트가 달리면: 같은 브랜치에서 파일 수정 → `Changes`에서 체크 → `Summary` 입력 → `Commit to 브랜치명` → `Push origin`. 같은 PR이 자동으로 업데이트돼요.

## 7. 작업 완료 후 최신 main 받기

PR이 머지된 뒤:

1. `Current Branch` → `main`
2. `Fetch origin` → `Pull origin`
3. 로컬 브랜치 삭제: `Current Branch` 드롭다운에서 지울 브랜치가 아닌 **다른** 브랜치(보통 `main`)로 먼저 이동 → `Branch` 메뉴 → 지울 브랜치를 선택 → `Delete...` (Windows `Ctrl+Shift+D`, macOS `Shift+Command+D`). 지금 체크아웃되어 있는 브랜치는 삭제할 수 없어요.

원격 브랜치 삭제는 별개예요 — 머지된 PR 페이지의 `Delete branch` 버튼으로 지워요(보통 리더가 처리).

## 8. 충돌 기초 해결

**충돌이 뭔가요?** [CONTRIBUTING.md의 "8. 충돌 기초 해결"](./CONTRIBUTING.md#8-충돌-기초-해결)과 동일해요 — 같은 파일의 같은 부분을 두 브랜치에서 다르게 고쳤을 때 생기는 상황이고, 지금 작업 중인 사람만 해결하면 돼요.

충돌은 보통 내 기능 브랜치에 최신 `main`을 반영할 때 생겨요. 아래 순서를 따르세요.

1. 지금 작업 중인 기능 브랜치가 `Current Branch`에 선택된 상태인지 확인
2. `Current Branch` 드롭다운 → `Choose a branch to merge into 브랜치명` → `main` 선택 → `Merge main into 브랜치명` 클릭
3. 충돌이 있으면 Desktop이 충돌 화면을 보여줘요. 충돌 난 파일 목록과 남은 개수가 표시돼요.
4. 각 파일 옆의 (버전에 따라 이름이 다를 수 있어요 — `Open in Editor` 또는 설정해둔 에디터 이름) 버튼 클릭 → 설정해둔 에디터로 파일이 열려요. 파일 안에는 이런 표시가 있어요.
   ```text
   <<<<<<< HEAD
   지금 내 브랜치의 내용
   =======
   가져오려는 브랜치(main)의 내용
   >>>>>>> main
   ```
5. `<<<<<<<`, `=======`, `>>>>>>>` 표시를 지우고 최종 내용을 정한 뒤 저장 — 저장하면 Desktop이 다시 확인해서 남은 충돌 파일 개수가 줄어들어요. 어느 쪽이 맞는지 모르겠으면 확실하지 않은 채로 아무거나 고르지 말고 리더나 관련 팀원에게 물어보세요.
6. 모든 파일이 해결되면 화면에 나오는 계속하기/완료 버튼(버전에 따라 `Continue merge` 또는 `Commit merge`로 표시될 수 있어요)을 클릭
7. PR 브랜치였다면 `Push origin`으로 다시 올려요
8. 진행 중인 머지를 취소하고 싶으면 화면의 취소 버튼(`Abort merge` 등, 버전에 따라 이름이 다를 수 있어요)을 찾아 클릭하세요. 안 보이면 리더에게 화면을 캡처해서 문의하세요.

## 9. 금지/주의 사항

[CONTRIBUTING.md의 "9. 금지/주의 사항"](./CONTRIBUTING.md#9-금지주의-사항)과 동일해요 — `main`에 직접 커밋/푸시 금지, 원격 브랜치 강제 덮어쓰기 전 리더 확인, 비밀번호/API 키/`.env` 커밋 금지.

## 10. 자주 쓰는 화면/버튼 모음

| 버튼/메뉴 | 하는 일 | Windows 단축키 | macOS 단축키 |
| --- | --- | --- | --- |
| `Fetch origin` | 원격 최신 정보 확인 (내 파일은 안 바뀜) | — | — |
| `Pull origin` | 원격 변경 사항을 내 브랜치에 반영 | `Ctrl+Shift+P` | `Shift+Command+P` |
| `Push origin` | 내 커밋을 원격으로 전송 | `Ctrl+P` | `Command+P` |
| `Current Branch > New Branch` | 새 브랜치 생성 | `Ctrl+Shift+N` | `Shift+Command+N` |
| `Branch > Delete...` | 로컬 브랜치 삭제 | `Ctrl+Shift+D` | `Shift+Command+D` |
| `Branch > View Pull Request on GitHub` | 현재 브랜치의 PR을 브라우저에서 열기 | `Ctrl+R` | `Command+R` |
| `File > Clone Repository` | 저장소 클론 | `Ctrl+Shift+O` | `Shift+Command+O` |

PR을 새로 만드는 것 자체는 정해진 단축키가 없어요 — 상단의 `Preview Pull Request` 버튼을 클릭해요 (5번 참고).

## 11. 문제 해결 / FAQ

일반적인 Git 개념(브랜치가 뭔지, 커밋과 푸시의 차이 등)에 대한 질문은 [CONTRIBUTING.md의 "11. 문제 해결 / FAQ"](./CONTRIBUTING.md#11-문제-해결--faq)도 함께 보세요. 아래는 GitHub Desktop 특유의 문제만 모았어요.

**저장에 파일을 고쳤는데 `Changes` 목록에 아무것도 안 떠요.**
`.gitignore`에 걸리는 파일인지, 다른 저장소 경로를 보고 있는 건 아닌지 확인하세요. Desktop이 백그라운드에 있다가 목록이 오래된 채로 안 갱신될 때도 있어요 — Desktop 창을 다시 포커스하거나 재시작해보세요.

**다른 컴퓨터(또는 팀원)가 이미 푸시했는데 내 Desktop은 "최신 상태"라고 나와요.**
로컬에 저장된 원격 정보가 오래된 거예요. `Fetch origin`을 눌러서 원격의 최신 상태를 다시 확인하세요.

**Desktop에서는 별일 없어 보이는데 터미널(`git status`)이랑 결과가 달라요.**
Desktop이 다른 폴더에 새로 클론했을 수 있어요. 두 프로그램이 서로 다른 폴더(=서로 다른 복사본)를 보고 있으면 당연히 다르게 보여요. Desktop에서 저장소 경로를 확인(우클릭 → `Show in Explorer`/`Show in Finder`)하고, 터미널에서도 같은 경로를 열고 있는지 확인하세요.

**`Push origin`을 눌렀는데 새 창이 뜨면서 `New Commits on Remote`라고 해요.**
누군가 먼저 푸시했다는 뜻이에요. 창에 있는 `Fetch` 버튼을 눌러 원격 내용을 받고, 반영(pull) → 필요하면 충돌 해결(8번 참고) → 다시 `Push origin`.

**작업하다 보니 지금 `Current Branch`가 내가 원했던 브랜치가 아니에요.**
커밋하기 전이라면 `Current Branch`에서 원하는 브랜치로 바꾸면 돼요 — Desktop이 저장 안 된 변경 사항을 지금 브랜치에 남길지, 새 브랜치로 가져갈지 물어봐요 (`Bring my changes to ...`를 고르면 옮겨져요). 이미 잘못된 브랜치에 커밋까지 해버렸다면 되돌리기 전에 리더에게 먼저 알리세요.

**"Authentication failed"라고 나오는데 웹사이트 로그인은 잘 돼요.**
Desktop에 저장된 로그인 정보가 오래됐거나 만료된 거예요. `File > Options > Accounts`(macOS는 `Settings > Accounts`)에서 로그아웃 후 다시 로그인하세요. 그래도 안 되면: Windows는 `자격 증명 관리자`(Credential Manager)에서 `github.com` 관련 항목 삭제 후 재시도, macOS는 `키체인 접근`(Keychain Access)에서 GitHub 관련 항목 삭제 후 재시도. 저장소에 접근 권한이 있는 계정으로 로그인했는지도 확인하세요 (3-4번 참고).

**`Fetching origin`이나 `Syncing`에서 화면이 멈춘 것처럼 안 움직여요.**
저장소가 망가진 게 아니에요. 인터넷 연결, 로그인 상태, (SSH로 클론했다면) SSH 키 문제 등 원인이 여러 가지일 수 있어요. 오래 멈춰있으면 화면을 캡처해서 리더에게 문의하세요.

**`LF will be replaced by CRLF`라는 경고가 뜨고, 안 고친 파일들도 전부 바뀐 것처럼 나와요.**
Windows(CRLF)와 macOS/Linux(LF)의 줄바꿈 방식 차이 때문이에요. 코드 내용이 실제로 바뀐 게 아니에요. 당황해서 무작정 커밋하지 말고, 리더에게 먼저 알려서 팀 전체의 줄바꿈 규칙을 정하도록 하세요 (보통 `.gitattributes` 파일로 해결해요).

**`.gitignore`에 넣었는데 Desktop이 계속 그 파일을 커밋하려고 해요.**
이미 한 번 커밋된 적 있어서 추적 중인 파일이면 `.gitignore`가 안 통해요. 이 경우는 터미널이 필요해요 (`git rm --cached 파일명`) — 리더나 [CONTRIBUTING.md 11번](./CONTRIBUTING.md#11-문제-해결--faq)을 참고해서 처리하세요.

**커밋은 됐다고 나오는데 Push가 안 돼요.**
커밋은 로컬에만 기록되고, Push가 따로 성공해야 GitHub에 실제로 올라가요. Push 에러 메시지를 읽고, 원격에 새 커밋이 있는지(`Fetch origin`), 저장소에 푸시 권한이 있는 계정인지, 브랜치가 보호되어 있진 않은지 확인하세요.

**충돌 화면에서 `Open in Editor`를 눌러도 반응이 없어요.**
기본 에디터가 설정 안 되어 있을 수 있어요. 3-5번대로 `File > Options > Integrations`(macOS는 `Settings > Integrations`)에서 에디터를 설정하세요. 에디터를 방금 설치했다면 Desktop을 재시작해야 인식돼요.

**GUI를 쓰면 Git 개념을 몰라도 되나요?**
아니요 — 브랜치, 스테이징, 커밋, 원격, 충돌 같은 개념은 CLI든 GUI든 똑같이 알아야 해요. GitHub Desktop은 버튼으로 편하게 해주는 것뿐, Git 자체의 동작 방식을 바꾸는 건 아니에요. 헷갈리면 CONTRIBUTING.md의 2번(용어)을 같이 참고하세요.

막히면 참고 서면으로 끝내지 말고 팀 채팅이나 리더에게 바로 물어보세요.

---

터미널(CLI)로 작업한다면 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참고하세요 — 팀 규칙과 명령어 기준 안내가 모두 거기 있어요.
