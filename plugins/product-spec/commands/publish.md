---
description: 완성된 스펙 문서를 Confluence·Notion에 발행하고 Slack에 알립니다
argument-hint: "[스펙 파일 경로]"
---

스펙 문서를 위키에 발행합니다.

`product-spec` 스킬의 §5(발행)를 따르고, `.claude/product-spec.json`의 `wiki` 슬롯 타입에
해당하는 `${CLAUDE_PLUGIN_ROOT}/skills/product-spec/references/tools/<type>.md`를 읽으세요.

대상: $1 (비어 있으면 `docsDir`의 스펙을 찾고, 여러 개면 어느 것인지 물으세요)

**발행과 알림은 외부로 나가는 동작입니다. 실행 전에 무엇을 어디에 올릴지 보여주고 확인을
받으세요.** 확인 없이 페이지를 만들거나 메시지를 보내지 마세요.

지킬 것:

- 리포의 Markdown이 **원본**이고 위키는 복사본입니다. 이 방향을 뒤집지 마세요
- 페이지 상단에 "이 문서는 `<리포 경로>`에서 자동 생성됩니다. 여기서 수정하면 다음 갱신 때
  사라집니다" 안내를 반드시 넣으세요
- `<!-- spec:... -->` HTML 주석은 위키 본문에서 제거하세요
- 리포 상대 경로 링크는 Git 호스트 절대 URL로 바꾸세요
- 만든 페이지 URL을 스펙 frontmatter의 `wiki_url`에 기록하세요. 다음 발행이 같은 페이지를
  찾는 유일한 단서입니다
- `chat` 슬롯이 있으면 링크와 변경 요약 3줄을 알리세요. 문서 전문을 붙여넣지 말고,
  `@here`·`@channel`은 쓰지 마세요

`wiki` 슬롯이 `none`이면 아무 일도 하지 말고, 리포 Markdown이 원본이라는 점과 나중에
`/product-spec:init`으로 추가할 수 있다는 점만 알리세요.
