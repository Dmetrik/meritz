# coffee-order (예시)

`product-spec` 스킬을 시험해 보기 위한 **가짜 제품**입니다. 실제로 동작시키지 않아도 됩니다.

사내 카페 사전 주문 앱을 흉내 낸 최소 코드로, 스펙 문서를 만들 때 필요한 요소가 골고루
들어 있습니다.

- 라우팅과 화면 (`src/server.js`)
- API 핸들러 (`src/api/`)
- 데이터 스키마 (`src/db/schema.sql`)
- 권한 미들웨어 (`src/middleware/auth.js`)
- 외부 연동과 환경변수 (`src/lib/notify.js`, `.env.example`)

## 시험해 보기

이 디렉터리를 작업 폴더로 열고 Claude Code에서:

```bash
/product-spec:init      # 설정 — 연동은 전부 "안 씀"으로 두어도 됩니다
/product-spec:new       # 스펙 문서 생성
```

이 폴더에는 스킬을 실제로 돌린 결과가 이미 들어 있습니다.
[`docs/specs/CO-001-coffee-order.md`](docs/specs/CO-001-coffee-order.md) — 최초 작성(v1.0.0)
이후 주문 취소 기능이 추가되어 한 번 갱신된(v1.1.0) 상태입니다.
변경 이력 두 줄과, `spec:human` 블록에 사람이 직접 쓴 메모가 남아 있는 것을 보실 수 있습니다.

## 갱신 동작 직접 확인하기

`src/api/menu.js`에 품절 처리 엔드포인트를 하나 추가하고 `/product-spec:update`를 실행해 보세요.
확인 포인트는 두 가지입니다.

1. **`spec:human` 블록의 메모가 오타까지 그대로 남아 있는가** — 이게 이 스킬의 핵심 약속입니다
2. `scope`의 "하지 않는 것"에서 메뉴 관리가 빠지고, `changelog`에 한 줄이 늘고,
   문서 버전이 `1.1.0` → `1.2.0`으로 올라가는가

코드를 건드리지 않고 `/product-spec:update`를 다시 실행하면 **파일을 저장하지 않고**
"변경 없음"으로 끝나는 것도 확인해 보세요.
