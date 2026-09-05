---
description: 코드베이스를 읽어 표준 양식의 Product Spec 문서를 새로 작성합니다
argument-hint: "[제품/기능 이름 또는 대상 경로]"
---

새 Product Spec 문서를 작성합니다.

`product-spec` 스킬의 §2(신규 작성)를 따르세요. 시작하기 전에 반드시 이 두 문서를 읽으세요.

- `${CLAUDE_PLUGIN_ROOT}/skills/product-spec/references/evidence.md` — 근거 규칙
- `${CLAUDE_PLUGIN_ROOT}/skills/product-spec/references/spec-format.md` — 섹션 정의

뼈대는 `${CLAUDE_PLUGIN_ROOT}/skills/product-spec/assets/SPEC_TEMPLATE.md`를 씁니다.

대상: $1 (비어 있으면 현재 리포 전체. 모노레포면 어느 패키지인지 먼저 확정하세요)

핵심만 다시 짚으면:

- `.claude/product-spec.json`이 없으면 `/product-spec:init`부터 하자고 제안하세요.
  설정을 임의로 만들어 진행하지 마세요
- 코드를 다 읽으려 하지 말고 진입점 → 라우팅 → 데이터 모델 → API → 설정 순으로 구조를 잡으세요
- **Ⅰ부(제품)는 기획자·디자이너가 읽습니다.** 엔드포인트·함수·파일 경로를 쓰지 마세요.
  코드에서 본 기술적 사실은 사용자가 겪는 일로 번역해 적고, 원문은 Ⅱ부에 남깁니다
- **절 제목은 격식 있게, 문장은 쉬운 말로.** 검토 자리에 올라가는 문서입니다
- `problem`, `users`, `metrics`는 **코드에 답이 없습니다.** 지어내지 말고 `spec:human` 블록에
  `> ❓ 확인 필요:` 질문으로 남기세요
- 근거 `경로:줄번호`는 **Ⅱ부에만** 답니다. Ⅰ부의 근거는 부록에 절 단위로 모읍니다
- **기능에 `FR-01`부터, 기술 이슈에 `TN-01`부터 ID를 부여하세요.** 티켓이 이 번호를 가리킵니다
- 마지막에 `open-questions`(9절)를 `Q-01`부터 번호를 매겨 다시 만드세요
- 환경변수는 **이름만** 적습니다. 값은 절대 문서에 넣지 마세요
- frontmatter의 `last_synced_commit`에 현재 HEAD 짧은 해시를 넣으세요. 다음 갱신의 기준점입니다
- 끝나면 `❓ 확인 필요` 항목을 목록으로 보여주고, 지금 답해주면 바로 채우겠다고 제안하세요
