# 프론트엔드 AI 코딩 가이드

MakerShelf 프론트엔드 작업에서 AI 코딩 도구(Claude, ChatGPT, Cursor 등)를 활용할 때 참고할 팁을 정리했어요. 스택은 React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui예요.

## 시작하기 전에

- 작업할 화면의 Figma 디자인이 승인되었는지 먼저 확인하세요 (CONTRIBUTING.md 4-1 참고). 승인된 디자인 없이 AI에게 레이아웃을 즉석에서 만들어달라고 요청하지 마세요.
- 작업을 시작하기 전에 해당하는 백엔드 PR이나 이슈에서 실제 API 계약을 가져오세요. 필드 이름이나 응답 형태를 AI가 추측하게 두지 말고, 프롬프트에 직접 붙여넣으세요.
- 폴더 구조와 경로 별칭(`@/*` → `src/*`)은 `frontend/README.md`에서 먼저 확인하세요.

## AI 도구를 쓸 때

- 한 세션에는 화면 하나, 기능 하나만 다루세요. 여러 화면을 한 번에 요청하면 리뷰하기 힘들 만큼 큰 diff가 나와요.
- 새 컴포넌트를 만들기 전에, `src/components/` 아래 있는 기존 컴포넌트를 AI에게 먼저 보여주세요. 그래야 기존 패턴과 맞는 결과가 나와요.
- shadcn/ui 프리미티브는 `npx shadcn@latest add <이름>`으로 추가하세요. AI가 shadcn 컴포넌트를 직접 손으로 작성하게 하지 마세요.
- `package.json`에 이미 있는 의존성 외에 새 패키지를 추가하려면, 먼저 리더에게 확인받으세요.
- 정말 공유 상태가 필요한 기능이 아니라면 로컬 상태로 충분해요. AI가 기본값으로 상태 관리 라이브러리를 꺼내 들게 두지 마세요.

## 프롬프트 템플릿

```
프로젝트: MakerShelf 프론트엔드 (React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui).
경로 별칭: `@/*` → `src/*`. shadcn 컴포넌트는 `src/components/ui/`에 있고,
`npx shadcn@latest add <이름>`으로 추가해요. shadcn 프리미티브를 직접 작성하지 마세요.

작업: [화면/기능 설명]

API 계약 ([PR/이슈 링크] 기준. 엔드포인트나 필드 이름을 임의로 만들지 마세요):
[엔드포인트 목록, 요청/응답 형태, 에러 코드를 여기 붙여넣으세요]

제약 사항:
- frontend/ 아래 파일만 수정하세요. backend/는 건드리지 마세요.
- 커밋 형식: `<Action>: <요약>` (Add/Update/Fix/Remove/Refactor/Docs/Test/Build/Style).
- [링크]의 Figma 디자인을 따르세요. 레이아웃이나 간격을 임의로 바꾸지 마세요.
- 승인 없이 package.json에 없는 의존성을 추가하지 마세요.
```

## PR을 올리기 전에

- 로컬에서 `npm run build`를 실행해보세요. 개발 모드에서는 되는데 빌드에서 깨지는 AI 생성 코드가 있을 수 있어요.
- diff는 직접 다시 읽어보세요. PR에는 본인 이름이 올라가요.
