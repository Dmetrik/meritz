---
description: Product Spec 스킬 온보딩 — 리포를 스캔하고 이슈 트래커·커뮤니케이션·위키 연동을 설정합니다
argument-hint: "[대상 디렉터리 (모노레포일 때)]"
---

`product-spec` 스킬의 온보딩을 진행합니다.

`${CLAUDE_PLUGIN_ROOT}/skills/product-spec/references/onboarding.md`를 읽고 그 절차를
그대로 따르세요. 툴별 연결 방법은 사용자가 고른 뒤에
`${CLAUDE_PLUGIN_ROOT}/skills/product-spec/references/tools/<type>.md`에서 확인하세요.
연결 명령어를 기억에 의존해 적지 말고 반드시 참고 문서를 읽고 옮기세요.

대상: $1 (비어 있으면 현재 디렉터리)

핵심만 다시 짚으면:

- 질문하기 **전에** 리포를 먼저 스캔하고, 알아낸 것은 기본값으로 제시해 확인만 받으세요
- 세 슬롯(`tracker` / `chat` / `wiki`)을 하나씩 묻고, "안 씀"도 정상적인 답으로 제시하세요
- Jira를 고르면 Cloud인지 온프레미스인지 반드시 되물으세요. 연결 방법이 완전히 다릅니다
- `claude mcp add` 실행과 OAuth 승인은 **사용자가 직접** 합니다. 대신 하려 하지 마세요
- 토큰 값을 채팅으로 받지 말고, 환경변수로 넣는 방법을 안내하세요
- 이미 `.claude/product-spec.json`이 있으면 덮어쓰지 말고 현재 설정을 보여준 뒤 바꿀 부분만 물으세요
- 설정이 끝나면 각 연동에 읽기 전용 호출을 한 번씩 해서 실제로 되는지 확인하고 표로 보고하세요
- 마지막에 첫 스펙 초안을 만들지 제안하세요. 설정만 하고 끝내지 마세요
