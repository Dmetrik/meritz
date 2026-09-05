# Jira 어댑터 (`tracker`)

**Cloud와 온프레미스(Data Center/Server)의 연결 방법이 완전히 다르다.** 먼저 어느 쪽인지
확인한다. 주소가 `*.atlassian.net`이면 Cloud, 사내 도메인(`jira.회사.co.kr`)이면 온프레미스다.

---

## 연결 — Cloud (`mode: "mcp"`)

Atlassian 공식 Rovo MCP 서버를 쓴다. Jira와 Confluence가 한 서버에 같이 들어 있어서
한 번만 연결하면 둘 다 된다.

```bash
claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp
```

그다음 Claude Code에서 `/mcp` → `atlassian` 선택 → 브라우저에서 OAuth 승인.
**승인은 사용자가 직접 해야 한다.** 권한은 로그인한 계정의 기존 권한을 그대로 따르므로,
원래 못 보던 이슈는 여기서도 안 보인다.

설정:

```json
{
  "tracker": {
    "type": "jira",
    "mode": "mcp",
    "site": "acme.atlassian.net",
    "projectKey": "PAY"
  }
}
```

> 참고: `/v1/sse` 엔드포인트는 2026년 6월 이후 폐지된다. 위의 `/v1/mcp`를 쓴다.

## 연결 — 온프레미스 Data Center / Server (`mode: "rest"`)

**공식 Rovo MCP 서버는 Jira Cloud 전용이라 Data Center를 지원하지 않는다.** 국내 기업은
온프레미스가 많으므로 이 경로를 기본으로 생각하는 편이 낫다. REST API를 직접 호출한다.

1. Jira 우상단 프로필 → **Profile → Personal Access Tokens → Create token**
   (관리자가 PAT 기능을 꺼둔 경우 관리자에게 요청해야 한다)
2. 발급받은 토큰을 셸 환경변수로 넣는다. **설정 파일이나 채팅에 붙여넣지 않는다.**
   ```bash
   echo 'export JIRA_TOKEN="발급받은_토큰"' >> ~/.zshrc && source ~/.zshrc
   ```

설정:

```json
{
  "tracker": {
    "type": "jira",
    "mode": "rest",
    "baseUrl": "https://jira.acme.co.kr",
    "projectKey": "PAY",
    "tokenEnv": "JIRA_TOKEN"
  }
}
```

---

## 사용 — 무엇을 가져오는가

스펙 문서에서 **코드로는 알 수 없는 부분**의 재료를 여기서 얻는다.

| 스펙 섹션 | Jira에서 가져올 것 |
|---|---|
| `problem` | 이슈 설명(Description)의 배경, 문제 서술 |
| `users` | 이슈에 언급된 요청자·사용 맥락 |
| `scope` | Epic 하위 이슈 목록, "제외" 라벨이 붙은 이슈 |
| `changelog` | 커밋 메시지의 이슈 키 → 이슈 제목 |
| `sources` | 참조한 이슈 키 |

### MCP 모드

연결된 Atlassian MCP 도구로 조회한다. 주로 쓰는 것:

- 이슈 검색 (JQL) — `project = PAY AND updated >= -30d ORDER BY updated DESC`
- 이슈 상세 조회 — 커밋 메시지에서 뽑은 키(`PAY-142`)로 제목·설명·상태 확인

**이슈를 만들거나 수정하지 않는다.** 이 스킬은 읽기만 한다.

### REST 모드

```bash
# 이슈 1건 조회 (DC는 api/2, Cloud는 api/3)
curl -s -H "Authorization: Bearer $JIRA_TOKEN" \
  "$BASE_URL/rest/api/2/issue/PAY-142?fields=summary,description,status,issuetype,parent"

# JQL 검색
curl -s -H "Authorization: Bearer $JIRA_TOKEN" \
  --get --data-urlencode 'jql=project = PAY AND updated >= -30d' \
  --data-urlencode 'fields=key,summary,status' \
  "$BASE_URL/rest/api/2/search"
```

Cloud를 REST로 쓸 때는 PAT이 아니라 이메일 + API 토큰 basic 인증이다.

```bash
curl -s -u "$JIRA_EMAIL:$JIRA_API_TOKEN" "$BASE_URL/rest/api/3/issue/PAY-142"
```

### 커밋 메시지에서 이슈 키 뽑기

```bash
git log --oneline <from>..<to> | grep -oE '[A-Z][A-Z0-9]+-[0-9]+' | sort -u
```

`projectKey`와 접두어가 같은 것만 쓴다. 다른 프로젝트 키가 섞여 나오면 무시한다.

---

## 검증

온보딩 5단계에서 이 호출 하나로 확인한다.

```bash
# REST
curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $JIRA_TOKEN" \
  "$BASE_URL/rest/api/2/project/PAY"
```

`200`이면 성공. `401`은 토큰 문제, `403`은 권한 문제, `404`는 프로젝트 키 오타다.
MCP 모드면 프로젝트 조회 도구를 한 번 호출해 본다.

## 자주 겪는 문제

| 증상 | 원인과 해결 |
|---|---|
| MCP 연결은 됐는데 이슈가 안 보인다 | 계정 권한 문제. Jira 웹에서 직접 그 이슈가 보이는지 확인 |
| 온프레미스인데 `mcp.atlassian.com`이 안 붙는다 | 정상이다. Cloud 전용이므로 `mode: "rest"`로 바꾼다 |
| PAT 발급 메뉴가 없다 | 관리자가 기능을 껐다. 관리자 문의 또는 `mode: "off"`로 두고 진행 |
| 사내망에서만 접속된다 | VPN 연결 상태를 먼저 확인. 이 스킬은 네트워크를 우회하지 않는다 |
