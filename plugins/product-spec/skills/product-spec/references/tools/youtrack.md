# YouTrack 어댑터 (`tracker`)

JetBrains YouTrack은 2025.3부터 **공식 원격 MCP 서버**를 제공한다. Cloud와 자체 호스팅
서버 모두 같은 방식이며, 엔드포인트는 인스턴스 주소 뒤에 `/mcp`를 붙인 형태다.

---

## 연결 (`mode: "mcp"`)

### 1. Permanent Token 발급

YouTrack 우상단 프로필 → **Profile → Account Security → Authentication →
New token**. 스코프는 YouTrack만 있으면 된다.

토큰을 환경변수로 넣는다. **설정 파일이나 채팅에 붙여넣지 않는다.**

```bash
echo 'export YOUTRACK_TOKEN="perm:..."' >> ~/.zshrc && source ~/.zshrc
```

### 2. MCP 서버 등록

```bash
claude mcp add --transport http youtrack \
  https://acme.youtrack.cloud/mcp \
  --header "Authorization: Bearer $YOUTRACK_TOKEN"
```

자체 호스팅이면 주소만 바꾼다: `https://youtrack.acme.co.kr/mcp`
(경로 접두어를 쓰는 설치라면 `https://.../youtrack/mcp`가 될 수도 있다. 브라우저 주소창의
기본 경로를 그대로 따르면 된다.)

OAuth를 쓸 수도 있다. 이 경우 `--header` 없이 등록한 뒤 `/mcp`에서 브라우저 승인을 한다.

설정:

```json
{
  "tracker": {
    "type": "youtrack",
    "mode": "mcp",
    "baseUrl": "https://acme.youtrack.cloud",
    "projectKey": "PAY",
    "tokenEnv": "YOUTRACK_TOKEN"
  }
}
```

### 2025.3 미만 버전이면

MCP 서버가 없으므로 `mode: "rest"`로 REST API를 직접 쓴다 (아래 참고). 버전은 YouTrack
하단이나 **Administration → Global Settings**에서 확인할 수 있다.

---

## 사용 — 무엇을 가져오는가

| 스펙 섹션 | YouTrack에서 가져올 것 |
|---|---|
| `problem` | 이슈 Description의 배경 |
| `users` | 이슈 Reporter, 언급된 사용 맥락 |
| `scope` | 상위 이슈(Epic)의 하위 목록, `Won't fix`로 닫힌 이슈 |
| `changelog` | 커밋 메시지의 이슈 ID → 이슈 요약 |
| `sources` | 참조한 이슈 ID |

### MCP 모드에서 쓰는 도구

YouTrack MCP 서버는 이런 도구를 제공한다. 이 스킬은 **읽기 도구만** 쓴다.

- `search_issues` — 검색 쿼리로 이슈 목록 (`project: PAY updated: -30d .. Today`)
- `get_issue` — 이슈 ID로 상세 조회
- `find_projects` / `get_project` — 프로젝트 확인 (검증용)
- `search_articles` / `get_article` — YouTrack Knowledge Base 문서 조회

`create_issue`, `update_issue`, `add_issue_comment`, `log_work` 같은 쓰기 도구는
**호출하지 않는다.** 스펙 문서를 만드는 데 이슈를 만들 이유가 없다.

### REST 모드

```bash
# 이슈 1건
curl -s -H "Authorization: Bearer $YOUTRACK_TOKEN" \
  "$BASE_URL/api/issues/PAY-142?fields=idReadable,summary,description,customFields(name,value(name))"

# 최근 30일 이슈 검색
curl -s -H "Authorization: Bearer $YOUTRACK_TOKEN" \
  --get --data-urlencode 'query=project: PAY updated: -30d .. Today' \
  --data-urlencode 'fields=idReadable,summary' \
  "$BASE_URL/api/issues"
```

YouTrack REST는 **`fields` 파라미터를 안 주면 id만 돌려준다.** 필요한 필드를 항상 명시한다.

### 커밋 메시지에서 이슈 ID 뽑기

```bash
git log --oneline <from>..<to> | grep -oE '[A-Z][A-Z0-9]*-[0-9]+' | sort -u
```

---

## 검증

```bash
curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $YOUTRACK_TOKEN" \
  "$BASE_URL/api/admin/projects?fields=shortName&query=PAY"
```

`200`이면 성공. `401`은 토큰 만료·오타, `404`는 baseUrl 경로 문제다.

## 자주 겪는 문제

| 증상 | 원인과 해결 |
|---|---|
| `/mcp`가 404 | YouTrack 2025.3 미만이거나 경로 접두어가 다르다. 버전 확인 후 `mode: "rest"` |
| 응답에 id만 있고 내용이 없다 | REST `fields` 파라미터 누락. 필요한 필드를 명시한다 |
| 토큰은 맞는데 401 | `Bearer ` 접두어를 빠뜨렸거나 토큰이 `perm:`으로 시작하는지 확인 |
| 자체 호스팅이 사내망 전용 | VPN 확인. 이 스킬은 네트워크를 우회하지 않는다 |
