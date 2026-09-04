# MakerShelf 백엔드

Java 17 + Spring Boot + Gradle + Oracle DB (Oracle은 팀 최종 확정 전, 임시 선택). 프로젝트 전체 개요는 [루트 README](../README.md)를 참고하세요.

## 처음 실행하기

### 1. JDK 17 설치 확인

**Windows (PowerShell)**

```powershell
winget install EclipseAdoptium.Temurin.17.JDK
java -version   # 17.x여야 함
```

**macOS**

```bash
brew install openjdk@17
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
java -version
```

Homebrew로 설치해도 `java` 명령이 바로 인식되지 않을 수 있어요 — 위의 `ln` 명령으로 시스템이 찾는 위치에 연결해줘야 해요 (Homebrew가 설치 직후 안내하는 명령을 그대로 따라 해도 됩니다).

`java`가 인식되지 않거나 버전이 다르게 나오면, 설치 직후에는 터미널(PowerShell)을 껐다 다시 켠 뒤 다시 확인하세요. 그래도 `java`를 못 찾거나 Gradle이 `JAVA_HOME` 오류를 낸다면, 오류 메시지 전체와 함께 리더에게 문의하세요 — 여러 JDK 버전이 함께 설치돼 있으면 흔히 생기는 문제입니다.

### 2. Oracle DB 접속 정보 준비

이 프로젝트는 Oracle을 자동으로 설치하거나 생성하지 않습니다. **팀 공용 DB를 쓴다면 리더에게 아래 값을 받아서** `.env.example`을 참고해 본인 환경에 맞게 채우세요.

```
DB_HOST=...
DB_PORT=...
DB_SERVICE=...
DB_USERNAME=...
DB_PASSWORD=...
```

### 3. 환경변수 설정 후 실행

**Windows (PowerShell)**

```powershell
cd backend
$env:DB_HOST = "..."
$env:DB_PORT = "..."
$env:DB_SERVICE = "..."
$env:DB_USERNAME = "..."
$env:DB_PASSWORD = "..."
.\gradlew.bat bootRun
```

**macOS/Linux**

```bash
cd backend
export DB_HOST=...
export DB_PORT=...
export DB_SERVICE=...
export DB_USERNAME=...
export DB_PASSWORD=...
./gradlew bootRun
```

IDE(IntelliJ 등)에서 실행한다면 Run Configuration의 환경변수(Environment variables)에 위 값을 등록해도 됩니다.

### 4. 정상 실행 확인

브라우저나 `curl`로 접속해서 `{"status":"ok"}`가 나오면 정상입니다.

```
GET http://localhost:8080/api/health
```

## 폴더 구조

- `src/main/java/com/makershelf/backend/` — 애플리케이션 코드 (패키지별로 구성)
- `src/main/resources/application.yml` — 설정 (DB 접속 정보는 환경변수 참조, 하드코딩 없음)
- `src/test/` — 테스트 코드

## 자주 겪는 문제

- **`java` 명령을 못 찾는다 / 버전이 다르다**: 설치 후 터미널 재시작. 여러 JDK가 섞여있다면 `JAVA_HOME`을 17로 맞추세요.
- **DB 연결 오류(`ORA-...`, connection refused 등)**: `DB_HOST`/`DB_PORT`/`DB_SERVICE` 값을 다시 확인하고, 그래도 안 되면 비밀번호를 제외한 오류 메시지 전체를 리더에게 공유하세요.
- **`gradlew.bat`을 실행할 수 없다는 오류**: `backend` 폴더 안에서 실행하고 있는지 확인하세요 (`cd backend` 먼저).
