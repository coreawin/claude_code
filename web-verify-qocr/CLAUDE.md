# web-verify-qocr 프로젝트

이 폴더는 OCR Dashboard 웹 검증 자동화 프로젝트입니다.
**이 폴더에서는 cn-web-verify 스킬을 기본으로 사용합니다.**

## 프로젝트 구조
```
web-verify-qocr/
├── CLAUDE.md                    ← 이 파일
├── web-verfity-qocr.md          ← 접속 정보 (URL, ID, PW)
├── web-verfity-qocr-spec.md     ← 메뉴별 검증 스펙 (사용자 작성)
├── playwright-test.js           ← Playwright 동작 확인 smoke test
├── scripts/
│   ├── verify.js                ← 메인 검증 스크립트 (Playwright)
│   ├── report.js                ← HTML 리포트 생성
│   ├── inspect.js               ← 로그인 후 DOM 구조 탐색
│   └── diagnose.js              ← 셀렉터 진단 스크립트
└── web-verify-report/
    ├── results.json             ← 검증 결과 원시 데이터
    ├── report.html              ← HTML 리포트
    └── screenshots/             ← 메뉴별 스크린샷

```

## 검증 실행 방법

```bash
cd "D:/Claude Code/web-verify-qocr"

# 검증 실행
VERIFY_URL="http://121.126.210.2:8000/ko/login" \
VERIFY_ID="dqsolution" \
VERIFY_PW='customer3@$#' \
VERIFY_OUT="./web-verify-report" \
NTFY_CH="coreawin-claude-code" \
node scripts/verify.js

# HTML 리포트 생성
node scripts/report.js ./web-verify-report/results.json
```

## 워크플로우

1. `web-verfity-qocr-spec.md` 에서 검증할 메뉴에 `[x]` 체크, \[ \] 체크 되지 않은건 작업에 포함시키지 않는다.
2. 각 메뉴의 확인 항목 및 기대 결과 작성하면 이를 토대로 어떤 항목을 검증할 것인지를 재차 확인한다.
3. 확인이 완료되면 각 메뉴별로 검증을 시작한다. `@web-verfity-qocr-spec.md 검증 시작해줘` 전달
4. 각 메뉴에 대한 검증이 완료되면 요청한 기능에 대한 실패/성공 여부를 안내해준다.
4. 검증 완료 후 `web-verify-report/report.html` 확인할 수 있도록 링크를 제공하고 ntfy 를 통한 알림을 통해 전체 작업이 완료되었다고 알려준다.

## UI 캐시 활용 (재작업 시간 단축)

새 검증 항목 작성 전 `ui-cache.md` 를 먼저 확인합니다.
- 이미 파악된 셀렉터/다이얼로그 구조가 있으면 inspect 스크립트 실행 생략 가능
- 새로운 페이지/다이얼로그 탐색 후 반드시 `ui-cache.md` 에 추가

## 관련 스킬 및 참고 문서

- 스킬: `C:\Users\corea\.claude\skills\cn-web-verify\SKILL.md`
- 트러블슈팅: `C:\Users\corea\.claude\skills\cn-web-verify\TROUBLESHOOTING.md`
- ntfy 채널: `coreawin-claude-code`
