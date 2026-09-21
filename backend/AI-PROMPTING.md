# 백엔드 AI 코딩 가이드

MakerShelf 백엔드 작업에서 AI 코딩 도구를 활용할 때 참고할 팁을 정리했어요. 스택은 Java 17, Spring Boot, Gradle, Oracle DB예요.

## 시작하기 전에

- ROADMAP.md와 해당 Phase 이슈에서 작업 범위를 먼저 확인하세요. 이슈가 요구하는 범위를 넘어서 AI가 만들지 않도록 하세요.
- 프론트엔드 PR이 내 엔드포인트에 의존한다면, CONTRIBUTING.md 5-1에 따라 API 계약(엔드포인트, 요청, 응답, 에러)을 먼저 정하고, 양쪽 PR 본문에 똑같이 적으세요.
- 새 기능을 시작하기 전에 기존 `creator/` 패키지를 먼저 살펴보세요. 구조(Controller / Service / Repository / Request / Response / 예외 처리)의 기준이 되는 구현이에요.

## AI 도구를 쓸 때

- 도메인별 패키지 구조를 그대로 따르세요: `Controller`, `Service`, `Repository`, `<이름>Request`/`<이름>Response` 레코드, 존재하지 않는 리소스를 위한 전용 예외 클래스와 `@ExceptionHandler`. AI에게 `creator/`를 맞춰야 할 패턴으로 보여주세요.
- 요청 레코드에는 직접 만든 검증 로직 대신 Jakarta Bean Validation(`@Valid`, `@NotBlank`, `@Size` 등)을 사용하세요.
- 기능을 추가할 때 컨트롤러 테스트도 함께 작성하세요. `CreatorControllerTest`가 기준이에요. 테스트 없이 엔드포인트를 올리지 마세요.
- 작업에 실제로 필요한 경우가 아니라면 `docker-compose.yml`, `build.gradle`, Oracle 관련 설정은 건드리지 마세요. 필요하다면 먼저 리더에게 물어보세요.

## 프롬프트 템플릿

```
프로젝트: MakerShelf 백엔드 (Java 17, Spring Boot, Gradle, Oracle DB).
참고 패키지: `backend/src/main/java/com/makershelf/backend/creator/`.
이 구조(Controller / Service / Repository / Request / Response 레코드 / 예외 처리)를 그대로 따라주세요.

작업: [Phase 이슈 #N 기준 엔드포인트/기능 설명]

제약 사항:
- backend/ 아래 파일만 수정하세요. frontend/는 건드리지 마세요.
- 요청 레코드에는 Jakarta Bean Validation을 사용하고, 수동 검증 로직은 작성하지 마세요.
- CreatorControllerTest와 같은 스타일로 컨트롤러 테스트를 추가하세요.
- 커밋 형식: `<Action>: <요약>` (Add/Update/Fix/Remove/Refactor/Docs/Test/Build/Style).
- 프론트엔드 PR이 이 작업에 의존한다면, 코딩 전에 엔드포인트/요청/응답/에러 계약을
  먼저 정리해서 짝이 되는 PR에 공유하세요.
```

## PR을 올리기 전에

- 로컬에서 테스트(`./gradlew test`)를 실행해보세요.
- diff는 직접 다시 읽어보세요. 팀 전체에게 동일하게 적용되는 규칙이에요.
