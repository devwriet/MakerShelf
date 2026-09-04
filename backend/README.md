# MakerShelf 백엔드

Java 17 + Spring Boot + Gradle + Oracle DB. 프로젝트 전체 개요는 [루트 README](../README.md)를 참고하세요.

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

### 2. Docker로 로컬 Oracle DB 띄우기

**왜 이렇게 하나요?** 팀 공용 DB 서버 하나를 다 같이 쓰면, 누군가 실수로 스키마를 바꾸거나 이상한 테스트 데이터를 넣었을 때 전원이 영향을 받아요. 그래서 각자 컴퓨터 안에서 자기만의 Oracle DB를 따로 돌려요. (Oracle을 최종 DB로 쓰기로 팀에서 확정했어요.)

**설치**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)을 다운로드해서 설치하세요. 설치 후 Docker Desktop 앱을 직접 실행하고, 창 왼쪽 아래(또는 메뉴바 아이콘)가 "Running" 상태가 될 때까지 기다리세요 — 앱을 설치만 하고 실행 안 해두면 아래 명령이 전부 "데몬에 연결할 수 없다"는 오류를 냅니다.

```bash
docker --version
docker compose version
```

두 명령 다 버전이 나오면 준비된 거예요. (노트북 사양이 너무 낮아서 Docker Desktop 실행 자체가 버겁다면, 억지로 진행하지 말고 리더에게 먼저 문의하세요 — 팀 공용 방법을 따로 마련할 수 있어요.)

**실행**: 저장소 루트(`MakerShelf/`, `backend/`가 아님)에서:

```bash
docker compose up -d
```

**처음 실행할 때는 시간이 꽤 걸려요** — 이미지 다운로드(수백 MB) + DB 초기화까지 합쳐서 보통 2~3분, 컴퓨터/네트워크 사정에 따라 더 걸릴 수 있어요. 아래 명령으로 로그를 보면서 `DATABASE IS READY TO USE!`가 뜰 때까지 기다리세요.

```bash
docker compose logs -f oracle
```

10분이 지나도 안 뜨면 `Ctrl+C`로 로그 보기를 종료하고 `docker compose ps`와 `docker compose logs --tail=100 oracle`을 확인한 뒤, 그 내용과 함께 리더에게 문의하세요 — 이상한 게 아니라 원인을 같이 찾아야 하는 상황이에요.

준비되면 `Ctrl+C`로 로그 보기를 종료해도 컨테이너는 계속 백그라운드에서 돌아가요. 컴퓨터를 껐다 켜도 데이터는 남아있고(`docker compose up -d`로 다시 켜기만 하면 돼요), 완전히 초기화하고 싶을 때만 아래 명령을 쓰세요 (데이터가 지워지고 다음 `up -d` 때 처음부터 다시 초기화돼요).

```bash
docker compose down -v
```

**이 DB는 로컬 개발 전용이에요.** `docker-compose.yml`에 있는 비밀번호(`LocalDev_1234`)는 평문으로 저장소에 커밋돼 있으니, 진짜 서비스 계정이나 다른 곳에는 절대 재사용하지 마세요. 여기 저장하는 데이터도 실제 서비스 데이터가 아니라 테스트용이에요 — 다른 팀원과 공유되지 않고 내 컴퓨터에만 남아요 (같은 시드 데이터가 필요하면 리더와 상의하세요, 아직 정해진 방법은 없어요).

### 3. 접속 정보 설정 후 실행

`backend/.env.example`의 값이 `docker-compose.yml`의 기본값과 이미 맞춰져 있어요 — 로컬 개발용이라 그대로 써도 됩니다.

**Windows (PowerShell)**

```powershell
cd backend
$env:DB_HOST = "localhost"
$env:DB_PORT = "1521"
$env:DB_SERVICE = "FREEPDB1"
$env:DB_USERNAME = "makershelf"
$env:DB_PASSWORD = "LocalDev_1234"
.\gradlew.bat bootRun
```

**macOS/Linux**

```bash
cd backend
export DB_HOST=localhost
export DB_PORT=1521
export DB_SERVICE=FREEPDB1
export DB_USERNAME=makershelf
export DB_PASSWORD=LocalDev_1234
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
- **`docker` 명령을 찾을 수 없다 / "Cannot connect to the Docker daemon"**: Docker Desktop을 설치만 하고 실행을 안 했을 가능성이 커요. Docker Desktop 앱을 직접 열고 "Running" 상태가 될 때까지 기다린 뒤 다시 시도하세요.
- **DB 연결 오류(`ORA-...`, connection refused 등)**: `docker compose ps`로 `oracle` 컨테이너가 `healthy` 상태인지 먼저 확인하세요. 아직 초기화 중이라면(`starting` 상태) 조금 더 기다렸다가 다시 시도하세요. 컨테이너가 안 떠 있다면 `docker compose up -d`부터 다시 실행하세요.
- **`docker compose up`이 포트 오류를 낸다 (`port is already allocated` 등)**: 컴퓨터에 이미 Oracle이나 다른 프로그램이 1521 포트를 쓰고 있는 경우예요. 그 프로그램을 끄거나, `docker-compose.yml`의 포트를 `"127.0.0.1:1522:1521"`처럼 바꾸고 `.env`의 `DB_PORT`도 맞춰서 바꾸세요.
- **컨테이너가 계속 재시작되거나 "no space left on device" 오류가 난다**: Docker Desktop이 쓸 수 있는 디스크/메모리가 부족한 경우예요. Docker Desktop 설정(Settings → Resources)에서 할당된 메모리/디스크를 확인하고, 컴퓨터 자체 여유 공간도 확인하세요. 이 이미지는 최소 4GB 정도는 Docker에 할당돼 있어야 안정적으로 돌아가요 (참고: 5.7GB 환경에서는 문제없이 동작 확인함 — 이보다 낮은 사양에서도 되는지는 아직 확인 안 됨).
- **`gradlew.bat`을 실행할 수 없다는 오류**: `backend` 폴더 안에서 실행하고 있는지 확인하세요 (`cd backend` 먼저).
