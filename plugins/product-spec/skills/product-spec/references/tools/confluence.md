# Confluence 어댑터 (`wiki`)

**리포의 Markdown이 원본이고 Confluence는 복사본이다.** 이 방향을 뒤집지 않는다.
Confluence에서 수정한 내용은 다음 발행 때 덮어써진다 — 그래서 페이지 상단에 그 사실을
반드시 적어 둔다.

Jira와 마찬가지로 Cloud와 온프레미스의 연결 방법이 다르다.

---

## 연결 — Cloud (`mode: "mcp"`)

Atlassian Rovo MCP 서버 하나로 Jira와 Confluence를 함께 쓴다. Jira를 이미 연결했다면
**추가 작업이 없다.**

```bash
claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp
```

`/mcp` → `atlassian` → 브라우저 OAuth 승인.

```json
{
  "wiki": {
    "type": "confluence",
    "mode": "mcp",
    "site": "acme.atlassian.net",
    "spaceKey": "PROD",
    "parentPageId": "123456789"
  }
}
```

`parentPageId`는 스펙 문서들을 모아 둘 부모 페이지다. 브라우저에서 그 페이지를 열면
주소의 `/pages/<숫자>/` 부분이 ID다.

## 연결 — 온프레미스 Data Center / Server (`mode: "rest"`)

1. Confluence 프로필 → **Settings → Personal Access Tokens → Create token**
2. 환경변수로 넣는다. 설정 파일이나 채팅에 붙여넣지 않는다.
   ```bash
   echo 'export CONFLUENCE_TOKEN="발급받은_토큰"' >> ~/.zshrc && source ~/.zshrc
   ```

```json
{
  "wiki": {
    "type": "confluence",
    "mode": "rest",
    "baseUrl": "https://wiki.acme.co.kr",
    "spaceKey": "PROD",
    "parentPageId": "123456789",
    "tokenEnv": "CONFLUENCE_TOKEN"
  }
}
```

---

## 사용 — 발행

`/product-spec:publish`에서만 동작한다. 신규 작성·갱신은 Confluence를 건드리지 않는다.

### 1. 기존 페이지 확인

frontmatter에 `wiki_url`이 있으면 그 페이지를 갱신한다. 없으면 제목으로 검색하고,
그래도 없으면 새로 만든다. **제목이 같은 페이지를 중복 생성하지 않는다.**

### 2. 상단 안내 문구 (필수)

페이지 맨 위에 이 안내를 넣는다. 없으면 누군가 위키에서 직접 고치고 다음 발행에 날린다.

```
ℹ️ 이 문서는 acme/payment-widget 리포의 docs/specs/DM-001-payment-widget.md 에서
   자동 생성됩니다. 이 페이지에서 수정한 내용은 다음 갱신 때 사라집니다.
   수정이 필요하면 리포의 원본 파일을 고쳐 주세요. (최종 동기화: 2026-09-05)
```

### 3. 본문 변환

Markdown을 Confluence 저장 형식으로 옮길 때 주의할 점:

- `<!-- spec:section -->` 같은 **HTML 주석은 제거한다.** 위키에선 의미가 없고 노이즈다
- 표는 Confluence 표로 변환한다
- 코드 블록은 `code` 매크로로 감싸고 언어를 지정한다
- 리포 내 상대 경로 링크는 Git 호스트의 절대 URL로 바꾼다. 안 그러면 위키에서 깨진다
- `> ❓ 확인 필요:` 항목은 그대로 둔다. 오히려 비개발 직군이 답할 수 있는 부분이다

### 4. REST 모드 호출

```bash
# 페이지 검색 (DC/Server: v1 API)
curl -s -H "Authorization: Bearer $CONFLUENCE_TOKEN" \
  --get --data-urlencode 'cql=space="PROD" AND title="결제 위젯 스펙"' \
  "$BASE_URL/rest/api/content/search"

# 신규 생성
curl -s -X POST -H "Authorization: Bearer $CONFLUENCE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"page","title":"...","space":{"key":"PROD"},
       "ancestors":[{"id":"123456789"}],
       "body":{"storage":{"value":"<p>...</p>","representation":"storage"}}}' \
  "$BASE_URL/rest/api/content"

# 갱신 — version.number를 반드시 현재값 + 1로 올려야 한다
curl -s -X PUT -H "Authorization: Bearer $CONFLUENCE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":"999","type":"page","title":"...","version":{"number":4},
       "body":{"storage":{"value":"<p>...</p>","representation":"storage"}}}' \
  "$BASE_URL/rest/api/content/999"
```

Cloud를 REST로 쓸 때는 이메일 + API 토큰 basic 인증이고, 경로에 `/wiki` 접두어가 붙는다
(`$BASE_URL/wiki/rest/api/content`).

### 5. 발행 후

만든 페이지 URL을 스펙 문서 frontmatter의 `wiki_url`에 기록한다. 다음 발행이 같은 페이지를
찾을 수 있게 하는 유일한 단서다.

---

## 발행 전 확인

Confluence 발행은 **팀 전체가 보는 곳에 문서를 올리는 동작이다.** 실행 전에 보여주고
확인받는다.

```
Confluence PROD 스페이스에 발행할까요?
  대상: 새 페이지 "결제 위젯 스펙" (부모: 제품 스펙 모음)
  내용: 15개 섹션, 확인 필요 항목 2건 포함
```

## 자주 겪는 문제

| 증상 | 원인과 해결 |
|---|---|
| 온프레미스인데 MCP가 안 붙는다 | 공식 MCP는 Cloud 기준이다. `mode: "rest"`로 전환 |
| 갱신 시 409 Conflict | `version.number`가 현재값 + 1이 아니다. 현재 버전을 먼저 조회 |
| 표가 깨져 보인다 | Markdown 표를 storage 형식으로 변환하지 않았다 |
| 링크가 전부 깨진다 | 상대 경로를 Git 호스트 절대 URL로 바꾸지 않았다 |
| 페이지가 중복 생성된다 | `wiki_url` 기록이 빠졌다. 중복 페이지를 지우고 다시 발행 |
