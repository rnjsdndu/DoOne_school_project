# DO1 Service Blueprint

## 1. 서비스 구조

### 서비스 목적
- DO1은 사용자가 하루에 단 하나의 자기계발 미션에 집중하도록 돕는 1일 1기록 루틴 서비스다.
- 핵심 행동은 `오늘의 미션 확인 -> 성공/실패 기록 -> 최근 30일 회고`로 단순화한다.

### 주요 도메인
- User: 회원가입, 로그인, 프로필, 30일 세션 상태 보유
- Mission: 날짜별로 사용자에게 할당되는 하루 1개 미션
- Record: 성공/실패 결과와 실패 사유 저장
- Report: 최근 30일 기준 성과 요약, 달력, 연속 성공 계산
- System: 00시 미션 배정, 기기 동기화, 세션 만료 관리

### 사용자 흐름
1. 사용자는 회원가입 또는 로그인한다.
2. 홈 화면에서 오늘의 미션과 가이드 메시지를 확인한다.
3. `했음` 또는 `안했음`으로 하루 기록을 단 1회 저장한다.
4. 실패일 경우 감정과 실패 이유를 입력해야 저장할 수 있다.
5. 저장 후 기록은 수정할 수 없다.
6. 사용자는 기록 목록과 30일 리포트를 확인한다.
7. 시스템은 매일 00시에 새 미션을 자동 배정한다.

## 2. 기능 정의서

### 2.1 인증/회원
- 회원가입
  - 이메일, 비밀번호, 닉네임 입력
  - 이메일 중복 불가
- 로그인
  - JWT 또는 세션 토큰 발급
- 프로필 조회/수정
  - 닉네임, 목표 문구, 기본 미션 카테고리 수정 가능
- 로그아웃
  - 클라이언트 토큰 삭제

### 2.2 미션
- 오늘의 미션 조회
  - 사용자별 오늘 날짜 기준 1건 반환
- 미션 자동 배정
  - 매일 00시 배치 작업 수행
  - 당일 미션이 없는 사용자만 생성

### 2.3 기록
- 성공 기록 저장
  - 하루 1회만 허용
  - 저장 후 수정/삭제 불가
- 실패 기록 저장
  - 감정 선택 필수
  - 실패 사유 텍스트 입력 필수
- 기록 목록 조회
  - 전체 / 성공 / 실패 필터 지원
  - 최신순 정렬

### 2.4 리포트
- 30일 달력 뷰
  - 날짜별 성공/실패/미기록 상태 표시
- 누적 성과 요약
  - 성공 횟수, 실패 횟수, 성공률, 총 기록 수
- 연속 성공 기록
  - 현재 streak, 최고 streak 계산

### 2.5 시스템 정책
- 하루 기록은 1회만 가능
- 실패 기록에는 감정과 사유가 반드시 필요
- 저장 후 수정 불가
- 날짜 기준은 서버 로컬 타임존 정책에 따라 00:00:00에 갱신
- 30일 세션 단위로 최근 루틴 상태를 관리
- 로그인된 기기 변경 시 서버 데이터로 동기화

## 3. API 명세서

### 공통
- Base URL: `/api`
- Auth: `Authorization: Bearer <token>`
- 응답 형식
```json
{
  "success": true,
  "data": {},
  "message": "OK"
}
```

### 3.1 Users

#### POST `/api/users/signup`
- description: 회원가입
- request
```json
{
  "email": "user@example.com",
  "password": "password1234",
  "nickname": "doer"
}
```

#### POST `/api/users/login`
- description: 로그인
- request
```json
{
  "email": "user@example.com",
  "password": "password1234"
}
```

#### GET `/api/users/profile`
- description: 내 프로필 조회

#### PUT `/api/users/profile`
- description: 내 프로필 수정
- request
```json
{
  "nickname": "new-doer",
  "goalMessage": "하루 10분 루틴 만들기",
  "preferredMissionCategory": "health"
}
```

### 3.2 Missions

#### GET `/api/missions/todayMission`
- description: 오늘의 미션 조회

#### POST `/api/missions/success`
- description: 오늘 미션 성공 저장
- request
```json
{
  "missionId": "uuid"
}
```

#### POST `/api/missions/fail`
- description: 오늘 미션 실패 저장
- request
```json
{
  "missionId": "uuid",
  "emotion": "tired",
  "reason": "야근으로 시간이 부족했어요."
}
```

### 3.3 Records

#### GET `/api/records/allRecord`
- description: 전체 기록 조회

#### GET `/api/records/success`
- description: 성공 기록 조회

#### GET `/api/records/fail`
- description: 실패 기록 조회

### 3.4 Reports

#### GET `/api/reports/calendar`
- description: 최근 30일 달력 데이터 조회

#### GET `/api/reports/summary`
- description: 최근 30일 요약 조회

#### GET `/api/reports/streak`
- description: 현재/최대 streak 조회

### 3.5 System

#### POST `/api/system/assign-mission`
- description: 미션 배정 배치 수동 실행

#### POST `/api/system/sync`
- description: 클라이언트 상태와 서버 데이터 동기화

## 4. ERD / DB 설계

### 테이블

#### users
- id UUID PK
- email VARCHAR(255) UNIQUE NOT NULL
- password_hash TEXT NOT NULL
- nickname VARCHAR(50) NOT NULL
- goal_message VARCHAR(255)
- preferred_mission_category VARCHAR(50)
- timezone VARCHAR(50) DEFAULT `Asia/Seoul`
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL

#### sessions
- id UUID PK
- user_id UUID FK -> users.id
- refresh_token TEXT NOT NULL
- device_name VARCHAR(100)
- expires_at TIMESTAMP NOT NULL
- created_at TIMESTAMP NOT NULL

#### mission_templates
- id UUID PK
- category VARCHAR(50) NOT NULL
- title VARCHAR(120) NOT NULL
- description TEXT
- difficulty VARCHAR(20) DEFAULT `easy`
- is_active BOOLEAN DEFAULT true

#### user_missions
- id UUID PK
- user_id UUID FK -> users.id
- mission_template_id UUID FK -> mission_templates.id
- assigned_date DATE NOT NULL
- status VARCHAR(20) DEFAULT `pending`
- created_at TIMESTAMP NOT NULL
- UNIQUE (user_id, assigned_date)

#### mission_records
- id UUID PK
- user_mission_id UUID FK -> user_missions.id
- user_id UUID FK -> users.id
- result VARCHAR(20) NOT NULL
- emotion VARCHAR(30)
- fail_reason TEXT
- recorded_at TIMESTAMP NOT NULL
- UNIQUE (user_id, user_mission_id)

### 관계 요약
- users 1:N sessions
- users 1:N user_missions
- mission_templates 1:N user_missions
- user_missions 1:1 mission_records
- users 1:N mission_records

## 5. React 프로젝트 구조

```text
my-app/
  src/
    app/
      providers.jsx
      router.jsx
    components/
      common/
      home/
      layout/
      record/
      report/
    features/
      auth/
      mission/
      records/
      reports/
    hooks/
    pages/
      AuthPage.jsx
      HomePage.jsx
      RecordsPage.jsx
      ReportsPage.jsx
      ProfilePage.jsx
    services/
      apiClient.js
      mockData.js
    store/
      authStore.js
      uiStore.js
    styles/
      tokens.css
    App.jsx
    main.jsx
    index.css
```

## 6. Node.js 프로젝트 구조

```text
backend/
  src/
    config/
      db.js
      env.js
    controllers/
    middlewares/
    repositories/
    routes/
    services/
    utils/
    validators/
    app.js
    server.js
  db/
    migrations/
      001_init.sql
  package.json
  .env.example
```

## 7. 화면별 상세 기획

### 홈
- 오늘의 미션 카드
- 가이드 캐릭터/문구
- 했음 / 안했음 CTA
- 실패 선택 시 모달 또는 인라인 입력 폼 노출
- 오늘 기록 완료 시 결과 잠금 상태 표시

### 기록 목록
- 전체 / 성공 / 실패 필터 탭
- 날짜, 미션명, 결과 배지 표시
- 실패 항목은 감정/사유 확인 가능

### 리포트
- 30일 달력 히트맵
- 성공/실패/성공률 카드
- 현재 streak / 최대 streak 카드

### 인증
- 로그인 / 회원가입 탭
- 간단한 서비스 소개 문구

### 프로필
- 닉네임
- 목표 문구
- 선호 카테고리
- 로그아웃 버튼

## 8. MVP 개발 우선순위

1. 인증
2. 오늘 미션 조회 및 기록 저장
3. 하루 1회 기록 제한 정책
4. 기록 목록 조회
5. 30일 요약 리포트
6. 00시 미션 자동 배정
7. 세션/동기화 고도화

## 9. 구현 메모
- 프론트는 현재 백엔드 연결 전에도 구조를 검증할 수 있도록 더미 데이터 기반 화면을 포함한다.
- 백엔드는 Express + PostgreSQL 계층 구조로 작성하고, 서비스 레이어에 정책 검증을 집중시킨다.
- 실제 운영 시 `cron`, JWT refresh token, 인덱스 최적화, 타임존 정책을 추가 점검해야 한다.
