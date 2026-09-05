---
spec_id: CO-001
title: 사내 카페 사전 주문
owner: 미지정
status: draft
spec_version: 1.1.0
last_synced_commit: 
last_synced_at: 2026-09-05
repo: examples/sample-app
tracker_ref: 
wiki_url: 
---

<!--
  이 문서는 product-spec 스킬이 코드에서 자동 생성·갱신합니다.
  "spec:human" 주석으로 열고 닫은 구간은 사람의 영역이며 자동 갱신이 건드리지 않습니다.
  갱신: /product-spec:update   |   점검: /product-spec:check
-->

# 사내 카페 사전 주문

> 📎 이 파일은 `/product-spec:new`를 실제로 실행해서 나온 결과입니다. 손으로 쓴 예시가 아닙니다.
> 연동은 `tracker`/`chat`/`wiki` 를 모두 "안 씀"으로 두고 코드만 읽은 상태입니다.

<!-- spec:section id=summary -->
## 한 줄 요약

카페에 줄 서지 않고 자리에서 미리 음료를 주문하고, 바리스타는 주문을 화면으로 받아 준비
상태를 관리한다. 주문이 들어오면 바리스타 채널로 알림이 간다.

|  |  |
|---|---|
| 상태 | 개발 중 |
| 담당 | 미지정 |
| 최종 갱신 | 2026-09-05 |
<!-- /spec:section -->

<!-- spec:section id=problem -->
## 1. 왜 만드나

<!-- spec:human -->
> ❓ 확인 필요: 이걸 만들게 된 계기가 무엇인가요? 점심시간 대기 줄 때문인지,
> 바리스타가 구두로 주문받는 부담 때문인지에 따라 성공 기준이 달라집니다.
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=users -->
## 2. 누가 쓰나

코드는 사용자를 두 종류로 구분한다.

| | 어떤 사람 | 쓰는 상황 |
|---|---|---|
| **주문하는 사람** | 사내 구성원 | 자리에서 음료를 미리 주문하고, 준비됐는지 확인할 때 |
| **바리스타** | 카페 운영 담당 | 들어온 주문을 순서대로 만들고 상태를 넘길 때 |

<!-- spec:human -->
> ❓ 확인 필요: 주문하는 사람은 전 직원인가요, 특정 층·팀으로 제한되나요?
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=flows -->
## 3. 어떻게 쓰나

### 흐름 1 — 음료 주문하기

1. 오늘의 메뉴에서 마실 것을 고른다. **품절된 메뉴는 목록에 아예 나오지 않는다**
2. 사이즈를 톨과 그란데 중에 고르고, 요청사항을 100자까지 적을 수 있다
3. 주문하면 "준비중" 상태로 접수된다
4. 동시에 바리스타 채널로 주문 번호가 올라간다

**잘 안 될 때** — 사이즈를 고르지 않았거나 요청사항이 100자를 넘으면 접수되지 않는다.
바리스타 채널 알림은 실패해도 주문자 화면에는 아무 표시가 없다. 알림이 안 갔는지 주문자는
알 수 없다.

### 흐름 2 — 주문을 취소하기

1. 내 주문 목록에서 아직 만들기 전인 주문을 고른다
2. 취소하면 바로 취소되고, 바리스타 채널에도 취소 알림이 간다

**잘 안 될 때** — **이미 만들기 시작한 주문은 취소할 수 없다.** 그때는 바리스타에게 직접
말해야 한다. 남의 주문도 취소할 수 없다.

### 흐름 3 — 바리스타가 주문을 처리하기

1. 대기열 화면에서 들어온 주문을 본다
2. 음료를 만들고 "준비완료"로 넘긴다
3. 손님이 가져가면 "픽업완료"로 넘긴다

**잘 안 될 때** — 상태를 잘못 넘겨도 되돌릴 수 있지만, 되돌리는 걸 막는 장치가 없다.
이미 취소된 주문을 실수로 "준비중"으로 되돌릴 수도 있다.

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=screens -->
## 4. 화면

| 화면 | 무엇을 하는 곳 | 누가 들어오나 | 여기서 할 수 있는 것 |
|---|---|---|---|
| 대기열 | 들어온 주문을 순서대로 보는 곳 | **바리스타만** | 주문 확인, 준비 상태 넘기기 |

**빈 상태·오류 상태** — 바리스타가 아닌 사람이 대기열에 들어가면 접근이 막힌다.

> ❓ 확인 필요: 주문하는 쪽 화면은 이 저장소에 없습니다. 별도 앱인가요?
> 그렇다면 그 화면들도 이 문서에 넣을지, 따로 문서를 만들지 정해야 합니다.

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=features -->
## 5. 무엇을 할 수 있나

| 기능 | 설명 | 쓰는 사람 |
|---|---|---|
| 오늘의 메뉴 보기 | 지금 주문 가능한 음료와 가격을 본다. 품절은 안 보인다 | 모두 |
| 음료 주문 | 메뉴·사이즈·요청사항(100자)을 골라 주문한다 | 주문하는 사람 |
| 내 주문 확인 | 내가 넣은 주문을 최근 순으로 본다 | 주문하는 사람 |
| 주문 취소 | 아직 만들기 전인 내 주문을 되돌린다 | 주문하는 사람 |
| 대기열 확인 | 들어온 주문을 화면으로 받는다 | 바리스타 |
| 준비 상태 넘기기 | 준비중 → 준비완료 → 픽업완료로 넘긴다 | 바리스타 |
| 주문 알림 | 주문과 취소가 생기면 채널로 알린다 | (자동) |

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=scope -->
## 6. 안 하는 것

| 안 하는 것 | 이유 |
|---|---|
| 결제 | 앱에서 돈을 받지 않는다. 가격만 보여준다 |
| 만들기 시작한 주문 취소 | 이미 만든 음료가 버려지므로 막아 뒀다 |
| 바리스타의 대리 취소 | 주문자 본인만 취소할 수 있다 |
| 메뉴 등록·수정·품절 처리 | 화면이 없다. 데이터를 직접 손봐야 한다 |
| 알림이 갔는지 확인 | 채널 알림은 한 방향이라 실패해도 아무도 모른다 |
| 로그인 | 이 앱은 로그인을 직접 처리하지 않는다 |

<!-- spec:human -->
> 결제는 카페 사장님이 월말에 부서별로 정산하는 구조라 앱에 안 넣기로 함.
> 2026-08 카페 미팅에서 결정. 나중에 사내포인트 붙이면 그때 재논의. — PO팀
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=metrics -->
## 7. 무엇이 좋아지면 성공인가

<!-- spec:human -->
> ❓ 확인 필요: 어떤 숫자가 얼마나 달라지면 성공인가요?
> (예: 주문부터 픽업까지 평균 시간, 하루 주문 건수, 카운터 대기 인원)
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=open-questions -->
## 8. 확인이 필요한 것

_코드만 봐서는 알 수 없어 사람이 답해야 하는 것들입니다. 답이 정해지면 해당 섹션에 옮겨 적고
여기서 지웁니다. 이 목록은 갱신할 때마다 자동으로 다시 만들어집니다._

| | 섹션 | 확인할 내용 | 답해줄 사람 |
|---|---|---|---|
| ☐ | 1. 왜 만드나 | 대기 줄 때문인가, 주문 접수 부담 때문인가 | |
| ☐ | 2. 누가 쓰나 | 전 직원인가, 특정 층·팀 제한인가 | |
| ☐ | 4. 화면 | 주문하는 쪽 화면은 별도 앱인가, 이 문서에 포함할 것인가 | |
| ☐ | 7. 성공 지표 | 어떤 숫자가 얼마나 달라져야 하나 | |
| ☐ | 개발 참고 B | 로그인 정보를 앞단에서 항상 넣어준다고 봐도 되나 | |
<!-- /spec:section -->

<!-- spec:section id=changelog -->
## 9. 변경 이력

| 날짜 | 문서 버전 | 변경 요약 | 관련 이슈 |
|---|---|---|---|
| 2026-09-05 | 1.1.0 | 아직 만들기 전인 주문을 주문자가 직접 취소할 수 있음. 취소 시에도 채널 알림 | |
| 2026-09-05 | 1.0.0 | 최초 문서화 | |
<!-- /spec:section -->

---

# 개발 참고

_여기서부터는 만드는 사람을 위한 내용입니다. 기획·디자인 검토에는 필요하지 않습니다._

<!-- spec:section id=data-api -->
## A. 데이터와 API

### 다루는 데이터

정의 위치: `src/db/schema.sql`

| 이름 | 담는 내용 | 비고 |
|---|---|---|
| `menu` | `id`, `name`, `price`, `sold_out` | 품절은 플래그로만 관리 |
| `orders` | `id`, `user_id`, `menu_id`, `size`, `note`, `status`, `created_at` | `menu_id` → `menu.id` (`src/db/schema.sql:11`) |

`status`는 `preparing` / `ready` / `picked_up` / `canceled` 네 가지다 (`src/db/schema.sql:14`).
`size`와 `status` 모두 애플리케이션에서만 값을 제한하고 **DB에는 제약이 없다**
(`src/api/orders.js:8`, `src/api/orders.js:45` vs `src/db/schema.sql:12,14`).

### API

| 메서드 | 경로 | 용도 | 인증 | 정의 위치 |
|---|---|---|---|---|
| GET | `/api/menu` | 품절 아닌 메뉴 목록 | 없음 | `src/api/menu.js:5` |
| POST | `/api/orders` | 주문 생성 | `req.user` 필요 | `src/api/orders.js:14` |
| GET | `/api/orders/mine` | 내 주문 목록 | `req.user` 필요 | `src/api/orders.js:24` |
| DELETE | `/api/orders/:id` | 주문 취소 | `req.user` + 소유자 | `src/api/orders.js:29` |
| PATCH | `/api/orders/:id/status` | 상태 변경 | **스태프** | `src/api/orders.js:43` |
| GET | `/queue` | 대기열 화면 | **스태프** | `src/server.js:13` |

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=permissions -->
## B. 권한과 보안

| 역할 | 할 수 있는 것 | 근거 |
|---|---|---|
| 인증 없음 | 메뉴 조회 | `src/api/menu.js:5` — 미들웨어가 없다 |
| `req.user` 보유 | 주문 생성, 내 주문 조회 | `src/api/orders.js:18`, `src/api/orders.js:25` |
| `req.user` + 소유자 | 본인 주문 취소 | `src/api/orders.js:32-34` |
| `role === "staff"` | 대기열 화면, 상태 변경 | `src/middleware/auth.js:3` |

- **인증 방식**: 이 앱은 인증을 하지 않는다. 게이트웨이가 사내 SSO를 검증한 뒤 `req.user`를
  주입한다고 전제한다 (`src/middleware/auth.js:1` 주석).
- **소유자 검사**: 주문 취소만 소유자를 확인한다. 상태 변경은 스태프면 누구 주문이든 바꾼다.
- **민감정보**: 주문 요청사항 `note`가 100자 자유 입력이다 (`src/api/orders.js:9`).

> ❓ 확인 필요: `req.user`가 없을 때의 처리가 없습니다. 게이트웨이가 항상 주입한다고 봐도 되나요?

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=dependencies -->
## C. 연동과 의존성

### 외부 서비스

| 서비스 | 용도 | 없으면 어떻게 되나 |
|---|---|---|
| Slack | 주문·취소 알림 | webhook 이 없으면 알림을 건너뛴다 (`src/lib/notify.js:4`) |

### 환경변수

| 이름 | 용도 | 없을 때 |
|---|---|---|
| `PORT` | 서버 포트 | 3000 사용 (`src/server.js:17`) |
| `DATABASE_PATH` | SQLite 파일 경로 | `./data/coffee.db` 사용 (`src/db/client.js:3`) |
| `SLACK_WEBHOOK_URL` | 알림 대상 | 알림을 보내지 않음 |

### 주요 라이브러리

| 패키지 | 버전 | 용도 |
|---|---|---|
| `express` | ^4.19.2 | HTTP 서버·라우팅 |
| `better-sqlite3` | ^11.0.0 | SQLite 동기 접근 |
| `zod` | ^3.23.8 | 주문 입력 검증 |

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=ops -->
## D. 배포와 운영

- **실행**: `npm start` → `NODE_ENV=production node src/server.js`
- **데이터 저장**: 로컬 SQLite 파일 하나. 컨테이너면 볼륨이 없으면 재시작 시 주문이 사라진다
- **스키마 적용**: `schema.sql`을 실행하는 코드가 없다. 테이블을 수동으로 만들어야 한다
- **배포 방식·롤백·모니터링**: 확인되지 않음. Dockerfile·CI 설정이 없다

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=tech-notes -->
## E. 기술적 제약과 알려진 이슈

| 항목 | 내용 | 영향 | 근거 |
|---|---|---|---|
| 취소된 주문 되살리기 | 상태 변경이 현재 상태를 보지 않는다 | 취소된 주문을 `preparing`으로 되돌릴 수 있다 | `src/api/orders.js:43-48` |
| 뷰 엔진 미설정 | `res.render`를 쓰는데 view engine 설정도 템플릿도 없다 | `/queue` 접근 시 오류 가능성 | `src/server.js:13-15` |
| 알림 예외 미처리 | `notifySlack`이 `async`인데 `await`도 `.catch()`도 없다 | webhook 실패 시 unhandled rejection | `src/api/orders.js:19`, `:38` |
| 취소 시 경합 | 상태 확인과 UPDATE 사이에 다른 요청이 끼어들 수 있다 | 준비 시작된 주문이 취소될 여지 | `src/api/orders.js:35-39` |
| SQLite 단일 파일 | 동시 쓰기에 약하다 | 주문이 몰리면 지연 | `src/db/client.js:3` |
| `SELECT *` 반환 | 내 주문 조회가 전체 컬럼을 내려준다 | 불필요한 필드 노출 | `src/db/client.js:20` |

<!-- spec:human -->
> 뷰엔진 건은 알고 있음. /queue 는 아직 안 쓰고 있어서 급하지 않슴.
> 프론트 붙일때 같이 정리 예정. — PO팀 2026-09
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=sources -->
## F. 근거

| 섹션 | 근거 |
|---|---|
| 3. 어떻게 쓰나 | `src/api/orders.js`, `src/api/menu.js`, `src/server.js` |
| 4. 화면 | `src/server.js:13-15`, `src/middleware/auth.js:3` |
| 5. 무엇을 할 수 있나 | `src/api/orders.js`, `src/api/menu.js`, `src/db/client.js` |
| 6. 안 하는 것 | `src/api/orders.js:32-37`, `src/lib/notify.js:4`, `src/api/menu.js:3-8` |
| 개발 참고 전체 | `package.json`, `.env.example`, `src/db/schema.sql`, `src/db/client.js` |

- **이슈**: 없음 (`tracker: none`)
- **논의**: 없음 (`chat: none`)
<!-- /spec:section -->
