# MakerShelf 프론트엔드

React + TypeScript + Vite + Tailwind CSS + shadcn/ui. 프로젝트 전체 개요는 [루트 README](../README.md)를 참고하세요.

## 처음 실행하기

### 1. Node.js 설치 확인

Vite 최신 버전 기준으로 **Node 20.19 이상, 또는 22.12 이상**이 필요해요 (그 사이 버전은 안 돼요). `winget`/`brew`로 설치하면 보통 최신 LTS가 깔려서 문제없지만, 버전을 꼭 확인하세요.

**Windows (PowerShell)**

```powershell
winget install OpenJS.NodeJS.LTS
node --version   # v20.19 이상 또는 v22.12 이상이어야 함
```

**macOS**

```bash
brew install node
node --version
```

`node`가 인식되지 않으면 PowerShell(또는 터미널)을 껐다 다시 켠 뒤 다시 확인하세요. 그래도 안 되면 오류 메시지 전체와 함께 리더에게 문의하세요.

### 2. 의존성 설치

```bash
cd frontend
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

실행 후 터미널에 뜨는 `Local` 주소(보통 `http://localhost:5173`)를 브라우저에서 열면 됩니다.

## 폴더 구조

- `src/App.tsx` — 최상위 컴포넌트
- `src/components/ui/` — shadcn/ui로 생성된 컴포넌트
- `src/lib/utils.ts` — `cn()` 등 공용 유틸
- `@/*` 경로는 `src/*`를 가리킵니다 (`vite.config.ts`, `tsconfig.json` 설정)

## shadcn/ui 컴포넌트 추가하기

```bash
npx shadcn@latest add <component-name>
```

## 빌드

```bash
npm run build
```

## 자주 겪는 문제

- **`npm install`이 실패한다**: Node 버전을 먼저 확인하세요 (`node --version`, 20.19 이상 또는 22.12 이상 필요).
- **화면에 아무것도 안 뜬다**: 터미널에 에러가 없는지, 그리고 올바른 `Local` 주소로 접속했는지 확인하세요.
