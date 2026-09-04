# MakerShelf

카페 위탁판매 재고 관리 시스템 — 카페가 소규모 창작자 상품을 위탁판매할 때, 카페 소유 재고와 창작자 소유 재고, 정산을 분리해서 관리합니다.

## 스택

- **백엔드**: Java 17, Spring Boot, Gradle, Oracle DB (팀 최종 확정 전, 임시 선택)
- **프론트엔드**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui

## 시작하기

팀원 대부분은 Windows 환경 기준입니다. PowerShell 명령어를 기본으로 안내하고, macOS/Linux는 괄호로 병기합니다.

터미널 대신 **GitHub Desktop**(GUI 앱)으로 작업하고 싶다면, 아래 단계 대신 [CONTRIBUTING-desktop.md](./CONTRIBUTING-desktop.md)의 3번(설치/로그인/클론)부터 따라가세요.

### 1. Git 설치 확인

**Windows (PowerShell)**

```powershell
winget install --id Git.Git -e
git --version
```

**macOS** — Xcode Command Line Tools에 포함되어 있으며, 없다면 `git`을 처음 실행할 때 설치 안내가 뜹니다.

### 2. 저장소 클론

```bash
git clone <저장소 URL>
cd MakerShelf
```

### 3. 각 폴더 실행 방법

- 백엔드 실행/문제 해결: [backend/README.md](./backend/README.md)
- 프론트엔드 실행/문제 해결: [frontend/README.md](./frontend/README.md)

## 기여 방법

팀의 Git 워크플로우, 브랜치/PR 규칙, 커밋 메시지 규칙, 문제 해결/FAQ는 아래 문서를 참고하세요.

- 터미널(CLI)로 작업한다면 [CONTRIBUTING.md](./CONTRIBUTING.md)
- GitHub Desktop(GUI)으로 작업한다면 [CONTRIBUTING-desktop.md](./CONTRIBUTING-desktop.md)
