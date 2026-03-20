# Skill Creator 가이드

## 개요

`skill-creator`는 Claude Code에서 새로운 커스텀 슬래시 명령어(Skill)를 만들고, 개선하고, 평가하는 데 도움을 주는 내장 스킬입니다.

**호출 방법:** `/skill-creator` 또는 "스킬 만들어줘", "skill 개선해줘" 등으로 자동 호출됩니다.

---

## 설치 확인

`skill-creator`는 Claude Code 번들 스킬로, 별도 설치 없이 기본 제공됩니다.

```bash
# 설치 경로 확인
ls ~/.claude/skills/skills/skill-creator/
```

출력 예시:
```
LICENSE.txt  SKILL.md  agents/  assets/  eval-viewer/  references/  scripts/
```

---

## Skill 디렉토리 구조

```
~/.claude/skills/          # 번들 스킬 루트
├── skills/                # 번들 스킬 모음
│   ├── skill-creator/     # 스킬 생성 도우미
│   ├── claude-api/        # Claude API 참조
│   ├── pdf/               # PDF 처리
│   └── ...
└── template/              # 스킬 템플릿

~/.claude/skills/          # 개인 커스텀 스킬 위치
<my-skill>/
└── SKILL.md

.claude/skills/            # 프로젝트 전용 스킬 위치
<my-skill>/
└── SKILL.md
```

**우선순위:** Enterprise > 개인(`~/.claude/skills/`) > 프로젝트(`.claude/skills/`)

---

## 새 Skill 만들기

### 방법 1: skill-creator 사용 (권장)

Claude Code 대화창에서:
```
/skill-creator
```
또는
```
"코드 리뷰 자동화 스킬을 만들어줘"
```

skill-creator가 인터뷰를 통해 자동으로 SKILL.md를 작성해 줍니다.

### 방법 2: 직접 생성

**1. 디렉토리 생성**
```bash
mkdir -p ~/.claude/skills/my-skill
```

**2. SKILL.md 작성**
```yaml
---
name: my-skill
description: 이 스킬이 언제, 어떤 상황에서 사용되는지 설명. 구체적인 예시 포함.
argument-hint: [인자 설명]          # 선택사항
---

# My Skill

여기에 Claude에게 줄 지시사항을 작성합니다.

## 동작 방식

1. 첫 번째 단계
2. 두 번째 단계
3. 세 번째 단계
```

---

## SKILL.md 프론트매터 옵션

| 옵션 | 설명 | 예시 |
|---|---|---|
| `name` | 슬래시 명령어 이름 (소문자, 하이픈) | `my-skill` |
| `description` | 자동 호출 트리거 기준 (필수) | `"코드 분석 시 사용..."` |
| `argument-hint` | 자동완성 힌트 | `[파일명]` |
| `disable-model-invocation` | Claude 자동 호출 비활성화 | `true` |
| `user-invocable` | 메뉴 표시 여부 | `false` (숨김) |
| `allowed-tools` | 허용 도구 제한 | `Read, Grep, Glob` |
| `context` | 서브에이전트 격리 실행 | `fork` |
| `agent` | 서브에이전트 타입 | `Explore`, `Plan` |
| `model` | 사용할 모델 지정 | `claude-opus-4-6` |

---

## skill-creator 워크플로우

skill-creator는 다음 단계로 진행합니다:

```
1. 의도 파악
   ↓ 어떤 스킬인지, 언제 사용하는지, 출력 형식은?

2. 인터뷰 & 리서치
   ↓ 엣지 케이스, 입출력 예시, 의존성 확인

3. SKILL.md 초안 작성
   ↓ name, description, 지시사항 작성

4. 테스트 실행 (2-3개 실제 사용 예시)
   ↓ with-skill vs without-skill 비교 실행

5. 결과 평가 (eval-viewer로 브라우저 뷰어 열기)
   ↓ 정성적 + 정량적 평가

6. 스킬 개선
   ↓ 피드백 반영

7. 반복 (만족할 때까지)
   ↓

8. Description 최적화 (트리거 정확도 향상)
   ↓

9. 스킬 패키징 (.skill 파일)
```

---

## 고급 기능

### 1. 인자(Arguments) 사용

```markdown
# SKILL.md 내용
$0 컴포넌트를 $1에서 $2로 마이그레이션하세요.
# 또는
$ARGUMENTS 로 전체 인자 받기
```

호출:
```
/migrate-component SearchBar React Vue
```

### 2. 동적 컨텍스트 주입 (셸 명령어)

```yaml
---
name: pr-summary
allowed-tools: Bash(gh *)
---

## PR 정보
- 변경사항: !`gh pr diff`
- 댓글: !`gh pr view --comments`

위 내용을 요약해 주세요.
```

`` !`command` `` 구문은 Claude가 프롬프트를 받기 전에 실행됩니다.

### 3. 서브에이전트 격리 실행

```yaml
---
name: deep-research
context: fork
agent: Explore
---

$ARGUMENTS 주제를 깊이 리서치하세요.
```

### 4. 도구 접근 제한

```yaml
---
name: safe-reader
allowed-tools: Read, Grep, Glob
---

파일을 읽기만 하고 수정은 하지 않습니다.
```

### 5. 서브디렉토리로 스킬 구성

```
my-skill/
├── SKILL.md              # 필수, 500줄 이하 권장
├── references/
│   ├── api-docs.md       # 상세 API 문서
│   └── examples.md       # 사용 예시
└── scripts/
    └── process.py        # 재사용 스크립트
```

---

## Description 작성 팁

description은 Claude가 자동 호출 여부를 판단하는 핵심입니다.

**나쁜 예:**
```yaml
description: 데이터를 처리합니다.
```

**좋은 예:**
```yaml
description: Excel/CSV 데이터를 분석하고 시각화합니다.
  사용자가 스프레드시트, 데이터 분석, 차트 생성,
  매출 데이터, 통계 처리를 언급할 때 반드시 사용하세요.
  데이터 시각화나 보고서 작성 요청에도 적용됩니다.
```

> **핵심:** Claude는 undertrigger(과소 호출) 경향이 있으므로, description을 약간 "적극적"으로 작성하세요.

---

## 기본 제공 번들 스킬

| 스킬 | 설명 |
|---|---|
| `/skill-creator` | 새 스킬 생성 및 개선 도우미 |
| `/simplify` | 변경된 코드 품질 검토 |
| `/claude-api` | Claude API 참조 |
| `/loop [간격] <명령>` | 반복 실행 (예: `/loop 5m /simplify`) |
| `/pdf` | PDF 처리 |
| `/mcp-builder` | MCP 서버 구축 |
| `/webapp-testing` | 웹앱 테스트 |

---

## 문제 해결

| 증상 | 해결 방법 |
|---|---|
| 스킬이 자동 호출되지 않음 | description에 구체적인 키워드 추가 |
| 스킬이 너무 자주 호출됨 | `disable-model-invocation: true` 설정 |
| 스킬이 목록에 안 보임 | 파일 경로 및 SKILL.md 문법 확인 |
| 인자가 전달 안 됨 | `$ARGUMENTS` 또는 `$0`, `$1` 사용 확인 |

---

## 참고 경로

```
번들 스킬:    ~/.claude/skills/skills/
개인 스킬:    ~/.claude/skills/<skill-name>/SKILL.md
프로젝트 스킬: .claude/skills/<skill-name>/SKILL.md
스킬 템플릿:  ~/.claude/skills/template/SKILL.md
```
