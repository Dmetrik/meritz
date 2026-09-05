# Linear 어댑터 (`tracker`)

---

## 연결 (`mode: "mcp"`)

```bash
# 방법 1 — 공식 플러그인
/plugin marketplace add anthropics/claude-plugins-official
/plugin install linear@claude-plugins-official

# 방법 2 — MCP 서버 직접 등록
claude mcp add --transport http linear https://mcp.linear.app/mcp
```

`/mcp` → `linear` → 브라우저 OAuth 승인. 승인은 사용자가 직접 한다.

설정:

```json
{
  "tracker": {
    "type": "linear",
    "mode": "mcp",
    "teamKey": "PAY",
    "projectName": "Payment Widget"
  }
}
```

`teamKey`는 이슈 ID의 접두어다 (`PAY-142`의 `PAY`). Linear 설정의 팀 화면에서 확인한다.

---

## 사용 — 무엇을 가져오는가

| 스펙 섹션 | Linear에서 가져올 것 |
|---|---|
| `problem` | 이슈·프로젝트 설명(Description)의 배경 |
| `users` | 이슈에 언급된 요청자·고객 |
| `scope` | 프로젝트의 이슈 목록, `Canceled`로 닫힌 이슈(= 하지 않기로 한 것) |
| `changelog` | 커밋·브랜치 이름의 이슈 ID → 이슈 제목 |
| `sources` | 참조한 이슈 ID |

Linear는 **프로젝트(Project) 단위의 설명과 마일스톤**이 잘 정리돼 있는 편이라,
개별 이슈보다 프로젝트 문서를 먼저 보는 게 효율적이다.

### 쓰는 도구

읽기 도구만 쓴다. 이슈 검색, 이슈 상세 조회, 프로젝트 조회, 팀 조회.
이슈 생성·수정·상태 변경은 **하지 않는다.**

### 커밋·브랜치에서 이슈 ID 뽑기

Linear는 브랜치 이름에 이슈 ID를 넣는 관행이 강하다. 커밋 메시지보다 브랜치가 더 정확할 때가 많다.

```bash
git log --oneline <from>..<to> | grep -oiE '[a-z]+-[0-9]+' | sort -u
git log --merges --pretty=%s <from>..<to> | grep -oiE '[a-z]+-[0-9]+' | sort -u
```

`teamKey`와 접두어가 같은 것만 쓴다.

---

## 검증

팀 정보 조회를 한 번 한다. `teamKey`가 틀리면 여기서 걸린다.

## 자주 겪는 문제

| 증상 | 원인과 해결 |
|---|---|
| OAuth 후에도 이슈가 안 보인다 | 계정이 해당 팀에 속해 있는지 확인 |
| 이슈 ID를 못 찾는다 | 커밋 대신 브랜치 이름에서 뽑는다 (위 명령어) |
| 워크스페이스가 여러 개다 | OAuth 승인 시 선택한 워크스페이스만 접근된다. `/mcp`에서 재인증 |
