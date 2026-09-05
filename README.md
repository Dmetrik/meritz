# product-spec

사내 표준 **Product Spec 문서를 자동으로 작성하고 갱신하는** Claude Code 플러그인입니다.

바이브 코딩으로 제품이 빠르게 늘어나면 두 가지가 무너집니다. 팀마다 문서 양식이 제각각이고,
한 번 쓴 문서는 아무도 갱신하지 않습니다. 이 플러그인은 **코드에서 사실을 뽑아 통일된 양식으로
쓰고, 코드가 바뀌면 바뀐 섹션만 다시 씁니다. 사람이 직접 쓴 문장은 건드리지 않습니다.**

## 설치 (30초)

```bash
/plugin marketplace add <이 저장소 URL>
/plugin install product-spec@meritz
```

로컬에서 먼저 시험해 보려면 URL 대신 이 폴더의 절대 경로를 넣으면 됩니다.

## 쓰기

문서로 남기고 싶은 제품 폴더에서 Claude Code를 열고:

```bash
/product-spec:init      # 최초 1회 — 리포 스캔 + 연동 설정
/product-spec:new       # 스펙 문서 작성
/product-spec:update    # 코드가 바뀐 뒤 갱신
/product-spec:check     # 코드↔문서 어긋난 곳 점검
/product-spec:publish   # Confluence·Notion에 발행, Slack에 알림
```

커맨드를 외울 필요는 없습니다. "이 제품 스펙 문서 만들어줘"라고 말해도 스킬이 붙습니다.

## 연동 — 회사마다 다른 툴 끼우기

툴은 세 슬롯으로 추상화되어 있고, 각 리포의 `.claude/product-spec.json`에서 고릅니다.
**하나도 연결하지 않아도 완전히 동작합니다.** 연동은 코드에 없는 맥락(왜 만들었는지)을
채우는 용도입니다.

| 슬롯 | 고를 수 있는 것 |
|---|---|
| `tracker` | Jira (Cloud·온프레미스) · YouTrack · Linear · GitHub Issues · 안 씀 |
| `chat` | Slack · 안 씀 |
| `wiki` | Confluence (Cloud·온프레미스) · Notion · 안 씀 |

`/product-spec:init`이 물어보고 설정 파일까지 만들어 줍니다. 연결 명령어와 토큰 발급 위치는
[`references/tools/`](plugins/product-spec/skills/product-spec/references/tools/)에 툴별로
정리돼 있습니다.

## 만들어지는 문서

**기획자와 디자이너가 주 독자입니다.** 개발자는 아쉬우면 코드를 열 수 있지만 그들은 그럴 수
없기 때문입니다. 문서는 두 부분입니다.

| | 읽는 사람 | 담는 것 |
|---|---|---|
| **Ⅰ부 제품** (표제부 + 1~10절) | 기획·디자인·개발 모두 | 개요 · 배경 및 문제 정의 · 사용자 정의 · 사용자 시나리오 · 화면 정의 · 기능 요구사항 · 범위 제외 · 성공 지표 · 미결 사항 · 개정 이력 |
| **Ⅱ부 개발 참고** (11~16절 + 부록) | 개발자 | 데이터·인터페이스 · 권한 · 연동 · 비기능 요구사항 · 배포 운영 · 기술 제약 |

Ⅰ부에는 엔드포인트 경로나 함수 이름이 나오지 않습니다. 코드에서 발견한 기술적 사실은
사용자가 겪는 일로 번역해서 적고, 원문은 Ⅱ부에 남깁니다.
**절 제목은 실무 문서 형식으로, 문장은 쉬운 말로** 씁니다.

원본은 **리포 안**(`docs/specs/*.md`)에 두고, 위키는 복사본으로 발행합니다.
코드와 같은 PR에서 리뷰되고 diff로 변경이 추적됩니다.

실제 출력은 [예시 문서](plugins/product-spec/examples/sample-app/docs/specs/CO-001-coffee-order.md)를
보세요. 연동 없이 코드만 읽어서 만든 뒤, 기능이 하나 추가되어 한 번 갱신된(v1.1.0) 상태입니다.
사람이 쓴 메모가 갱신 후에도 그대로 남아 있는 것을 확인하실 수 있습니다.

핵심 장치 두 가지:

- **`spec:human` 블록** — 사람이 쓴 부분. 자동 갱신이 절대 건드리지 않습니다
- **`❓ 확인 필요`** — 코드로 알 수 없는 것은 지어내지 않고 질문으로 남기고,
  9절 미결 사항에 `Q-01`부터 번호를 매겨 모읍니다. 담당·기한 칸이 함께 있습니다
- **`FR-01` / `TN-01` ID** — 기능과 기술 이슈에 번호를 붙여, 티켓·QA·회의록에서
  이 문서를 가리킬 수 있게 합니다

## 시험해 보기

[`examples/sample-app/`](plugins/product-spec/examples/sample-app/)에 연습용 가짜 제품이
있습니다. 그 폴더에서 `/product-spec:new`를 돌려보고, 코드를 조금 고친 뒤
`/product-spec:update`가 사람이 쓴 부분을 지키는지 확인해 보세요.

## 다른 회사·다른 조직에서 쓰기

이 플러그인에는 특정 회사에 종속된 값이 없습니다.

1. 이 저장소를 포크하고 `.claude-plugin/marketplace.json`의 `name`과 `owner`를 바꿉니다
2. 조직의 Git 호스트에 올립니다
3. `/plugin marketplace add <URL>` → `/plugin install product-spec@<이름>`을 공지합니다

표준 양식을 조직 사정에 맞게 바꾸려면
[`assets/SPEC_TEMPLATE.md`](plugins/product-spec/skills/product-spec/assets/SPEC_TEMPLATE.md)와
[`references/spec-format.md`](plugins/product-spec/skills/product-spec/references/spec-format.md)
두 파일만 고치면 됩니다.

## 구성

```
plugins/product-spec/
├── commands/          5개 슬래시 커맨드
├── skills/product-spec/
│   ├── SKILL.md       작성·갱신 워크플로
│   ├── references/    양식 정의, 갱신 알고리즘, 근거 규칙, 툴별 연동
│   └── assets/        문서 템플릿, 설정 예시, CI 워크플로
└── examples/          연습용 샘플 제품
```
