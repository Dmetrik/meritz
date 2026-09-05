---
spec_id: XXX-000
title: 제품 이름
owner: 미지정
status: draft
spec_version: 1.0.0
last_synced_commit: 
last_synced_at: 
repo: 
tracker_ref: 
wiki_url: 
---

<!--
  이 문서는 product-spec 스킬이 코드에서 자동 생성·갱신합니다.

  - "spec:human" 주석으로 열고 닫은 구간은 사람의 영역입니다.
    자동 갱신이 절대 건드리지 않으니 마음 놓고 쓰셔도 됩니다.
  - 그 밖의 영역은 갱신할 때마다 코드 기준으로 다시 쓰입니다.
  - frontmatter의 last_synced_commit 은 갱신의 기준점입니다. 지우지 마세요.
  - 갱신: /product-spec:update   |   점검: /product-spec:check
-->

# 제품 이름

<!-- spec:section id=summary -->
## 한 줄 요약

_누구의 어떤 불편을, 어떻게 덜어주는 제품인지 세 줄 안에._

|  |  |
|---|---|
| 상태 | 개발 중 / 운영 중 / 중단 |
| 담당 | |
| 최종 갱신 | YYYY-MM-DD |
<!-- /spec:section -->

<!-- spec:section id=problem -->
## 1. 왜 만드나

<!-- spec:human -->
> ❓ 확인 필요: 이 제품을 만들게 된 계기가 무엇인가요? 어떤 불편이 있었나요?
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=users -->
## 2. 누가 쓰나

<!-- spec:human -->
> ❓ 확인 필요: 주 사용자는 누구이고, 어떤 상황에서 이걸 꺼내 쓰나요?
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=flows -->
## 3. 어떻게 쓰나

_대표 사용 흐름 1~3개. 사용자가 하는 일과 화면에서 보이는 결과로 씁니다._

### 흐름 1 — _제목_

1. 사용자가 …
2. 화면에 …가 보인다
3. …하면 …된다

**잘 안 될 때** — _어떤 경우에 막히고, 그때 사용자에게 무엇이 보이는지_

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=screens -->
## 4. 화면

| 화면 | 무엇을 하는 곳 | 누가 들어오나 | 여기서 할 수 있는 것 |
|---|---|---|---|
| | | | |

**빈 상태·오류 상태** — _목록이 비었을 때, 권한이 없을 때 무엇이 보이는지_

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=features -->
## 5. 무엇을 할 수 있나

_기능 하나를 한 줄로. 구현 방식이 아니라 사용자가 얻는 결과로 씁니다._

| 기능 | 설명 | 쓰는 사람 |
|---|---|---|
| | | |

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=scope -->
## 6. 안 하는 것

_지금 범위 밖인 것. 여기가 비어 있으면 나중에 반드시 분쟁이 납니다._

| 안 하는 것 | 이유 |
|---|---|
| | |

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=metrics -->
## 7. 무엇이 좋아지면 성공인가

<!-- spec:human -->
> ❓ 확인 필요: 어떤 숫자가 얼마나 달라지면 이 제품이 제 몫을 한 건가요?
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=open-questions -->
## 8. 확인이 필요한 것

_코드만 봐서는 알 수 없어 사람이 답해야 하는 것들입니다. 답이 정해지면 해당 섹션에 옮겨 적고
여기서 지웁니다. 이 목록은 갱신할 때마다 자동으로 다시 만들어집니다._

| | 섹션 | 확인할 내용 | 답해줄 사람 |
|---|---|---|---|
| ☐ | | | |
<!-- /spec:section -->

<!-- spec:section id=changelog -->
## 9. 변경 이력

_최신이 위. 코드가 아니라 **사용자에게 무엇이 달라졌는가**를 적습니다._

| 날짜 | 문서 버전 | 변경 요약 | 관련 이슈 |
|---|---|---|---|
| YYYY-MM-DD | 1.0.0 | 최초 문서화 | |
<!-- /spec:section -->

---

# 개발 참고

_여기서부터는 만드는 사람을 위한 내용입니다. 기획·디자인 검토에는 필요하지 않습니다._

<!-- spec:section id=data-api -->
## A. 데이터와 API

### 다루는 데이터

| 이름 | 담는 내용 | 비고 |
|---|---|---|
| | | |

### API

| 메서드 | 경로 | 용도 | 인증 | 정의 위치 |
|---|---|---|---|---|
| | | | | |

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=permissions -->
## B. 권한과 보안

| 역할 | 할 수 있는 것 | 근거 |
|---|---|---|
| | | |

- **인증 방식**: 
- **민감정보 취급**: 

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=dependencies -->
## C. 연동과 의존성

### 외부 서비스

| 서비스 | 용도 | 없으면 어떻게 되나 |
|---|---|---|
| | | |

### 환경변수

> 이름만 적습니다. **값은 절대 문서에 넣지 않습니다.**

| 이름 | 용도 | 없을 때 |
|---|---|---|
| | | |

### 주요 라이브러리

| 패키지 | 버전 | 용도 |
|---|---|---|
| | | |

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=ops -->
## D. 배포와 운영

- **배포 방식**: 
- **실행 환경**: 
- **롤백 방법**: 
- **모니터링**: 

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=tech-notes -->
## E. 기술적 제약과 알려진 이슈

_사용자에게 영향이 가는 것은 여기 두지 말고 **6. 안 하는 것**이나
**3. 어떻게 쓰나**의 "잘 안 될 때"에 사람 말로 적습니다._

| 항목 | 내용 | 영향 | 근거 |
|---|---|---|---|
| | | | |

<!-- spec:human -->
<!-- /spec:human -->
<!-- /spec:section -->

<!-- spec:section id=sources -->
## F. 근거

이 문서가 참조한 자료입니다. 본문의 서술이 어디서 나왔는지 확인할 때 보세요.

| 섹션 | 근거 |
|---|---|
| | |

- **이슈**: 
- **논의**: 
<!-- /spec:section -->
