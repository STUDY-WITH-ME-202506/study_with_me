# ✨ 팀 프로젝트 - Study With Me

---

- **프로젝트 이름**: Study With Me
- **팀 이름**:  **SYNC UP**
- **프로젝트 목표**:  학습 및 일정 관리를 효율적으로 지원하는 학습플레너 개발 \
                    **스톱워치, 할 일 목록, AI 기반 로그 분석 기능, 개인별 학습 업적 로그 생성**을 통합하여 자바 스크립트 역량 강화
--- 

## 🚀 사용 안내 ( 배포 대신 Clone 방식으로 공유 )

본 프로젝트 **Study With Me**는 Google의 **Gemini API**를 활용한 AI 기능이 포함되어 있으며, 해당 기능을 사용하기 위해서는 **API 키 등록이 필요**합니다.

보안상의 이유로 별도 배포 링크는 제공하지 않으며, 아래 안내에 따라 개인적으로 프로젝트를 클론해서 사용하실 수 있습니다.

### 📅 사용 방법

1. 이 저장소를 클론합니다.

   ```bash
   git clone https://github.com/STUDY-WITH-ME-202506/study_with_me.git
   ```

2. 다음 경로에 위치한 파일을 열어주세요:

   ```
   /JS/aiQuestion/aiCall.js
   ```

3. `7번 줄`에 있는 API 키 입력 부분을 찾습니다:

   ```javascript
   const API_KEY = ''; // 여기에 본인의 Gemini API 키를 넣어주세요
   ```

4. 본인의 [Gemini API](https://ai.google.dev/) 키를 발급받아 위 부분에 입력하면 AI 기능이 정상 작동합니다.

### ⚠️ 주의 사항

* `API_KEY`는 개인 키이며 **절대 외부에 공유하지 마세요.**
* 본 프로젝트는 오픈소스로 제공되며, **AI 응답 기능을 제외한 나머지 기능은 키 없이도 작동**합니다.
* 실제 API 요청에는 요금이 발생할 수 있으므로, **Google Cloud 사용 요금 정책**을 사전에 확인해주세요.


## ⚙ 사용 기술

- **Frontend**
  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/>

- **협업 & 형상관리**

  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="40" height="40"/>
  <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord" width="40" height="40"/>
---

| 역할   | 이름 | 담당 | 회고록 링크                                                                                                                                                                                       |
|--------|------|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 팀장   | [고동현](https://github.com/rhehdgus8831) | 스톱워치 기능,명언 API 연동, GitHub 관리 및 PR 관리, README 작성,기본 | [고동현 회고록](https://github.com/rhehdgus8831/Project-SYNC-UP-retrospective-)|
| 팀원   | [김경민](https://github.com/minee0505) | 할 일 추가 및 완료 상태를 관리하는 간단한 일정 관리 TodoList 기능 개발 | [김경민 회고록](https://velog.io/@mineee0505/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0%EB%A1%9D-Study-With-Me) |
| 팀원   | [백승현](https://github.com/Sirosho) | 로컬 스토리지에 저장된 데이터 기반으로 개인별 학습 업적 로그 생성  | [백승현 회고록](https://github.com/Sirosho/study-with-me)                                                                                                                                                                          |
| 팀원   | [송민재](https://github.com/songkey06) | Gemini API를 연동하여 사용자의 질문에 AI가 답변해주는 학습 보조 기능 개발, 프로젝트 발표 | [송민재 회고록](https://github.com/songkey06/github-25050513/blob/main/FuntionDescription)                                                                                                                         |



---

## ✅ 주요 기능 요약

| 우선순위         | 기능명                               | 담당자 | 주요 기능 설명                                                               |
| ------------ | --------------------------------- | --- | ---------------------------------------------------------------------- |
| Must Have    | **스톱워치**,**명언 모달**                          | 고동현 | 공부 시간 측정을 위한 스톱워치 기능 구현<br>누적 시간 저장(localStorage)<br>학습 동기를 위한 명언 API 연동<br>랜덤 명언 출력 기능    |
| Must Have    | **할 일 목록 (TodoList)**             | 김경민 | 할 일 추가/완료<br>오늘·주간·완료 탭 구성<br>체크박스 상태 관리<br>완료된 할일 갯수 저장(localStorage) |
| Must Have    | **학습 업적 로그**                      | 백승현 | 공부 시간·할일·AI 질문 수 통합<br>로컬 스토리지 기반 학습 업적 기록 생성<br>(업적 배지 시스템 구현)        |
| Must Have    | **AI 학습 보조**                      | 송민재 | Gemini API 연동을 통한 AI 질문/답변 기능<br>질문 로그 저장<br>질문 수량 갯수 저장(localStorage) |
| Nice to Have | **스톱워치 50분 후 휴식 모달**              | 고동현 | 스톱워치 시작·재개 버튼 클릭 시<br>50분 뒤 쉬는 시간 모달 창 랜더링                             |
| Nice to Have | **AI 정답 드롭다운 UX 개선**              | 송민재 | AI 문제풀이 결과 중 정답을 드롭다운 토글 UI로 숨김 처리<br>사용자가 원할 때만 확인 가능                 |
| Nice to Have | **업적 세부사항 및 설명 UX 개선**            | 백승현 | 업적 클릭 시 상세 설명 및<br>획득 조건 등의 정보를 시각적으로 표시<br>사용자 피드백 강화                 |
| Nice to Have | **ToDoList 할일 목록 드래그 앤 드롭 UX 개선** | 김경민 | 할일 목록을 드래그하여 순서를 변경할 수 있도록 개선<br>직관적인 UI 제공<br>사용자 맞춤 우선순위 설정 가능       |



---

## 🗓️ 개발 일정

| 날짜 | 요일  | 내용                     |
| --- | --- | ---------------------- |
| 250623 | 월요일 | 주제 선정, Git & HTML,CSS 구조 세팅 |
| 250624 | 화요일 | 본격적인 기능 개발 시작        |
| 250625 | 수요일 | 기능 개발 계속               |
| 250626 | 목요일 | 모듈화, develop 브랜치 1차 병합, 1차 버그 픽스  |
| 250627 | 금요일 | develop 브랜치 2차 병합, 2차 버그 픽스      |
| 250628 | 토요일 | 기능 개발 계속     |
| 250629 | 일요일 | nice to have 기능 개발발           |
| 250630 | 월요일 | 전체 버그 픽스 및 develop 3차 병합, PPT 제작     |
| 250701 | 화요일 | main 브랜치 최종 병합, PPT 마무리 , 개인 회고록 작성      |
| 250702 | 수요일 | 최종 발표(송민재 발표)                  |

---

## 🛠️ Git 브랜치 전략


```

| * AiQuestion
| * playTime
| * toDoList
| * stopwatch
|/
* develop
|
* main
    
```

---

## 🧹 폴더 구조

```

HTML ─ index.html      # HTML 구조

/CSS
├── main.css         # 전체 스타일 설정 @import tag 용도
├── root.css         # 공용 컬러 디자인 분리
├── reset.css        # css 초기화 분리
├── stopwatch.css    # 스톱워치 디자인 스타일 분리
├── aiQuestion.css   # AI 디자인 스타일 분리
├── playTime.css     # 업적 기록 디자인 스타일 분리
└── list.css         # todolist 디자인 스타일 분리

/JS
  ├── app.js           # 최상위 진입점
  ├── stopwatch/       # 고동현 기능 모듈
  ├── todo/            # 김경민 기능 모듈
  ├── calendar/        # 백승현 기능 모듈
  └── ai/              # 송민재 기능 모듈

/docx
  └── aiQuestion.docx  # AI 관련 함수 다이어그램
/img
  └── images/          # 아이콘 및 이미지 등
```

---

## 📋 스크럼 및 협업 방식

* 매일 오후 개발 시작 전 **스크럼 회의**
* 주요 진행 상황 및 **이슈 GitHub에 등록**
* ```main``` → ```develop``` → ```feature``` 브랜치 전략 유지
* 각자 담당 기능을 모듈화해서 반영
* 팀 전체 CSS 통일 (공통 ```main.css``` + 개념 CSS)

---

## ✏️ 커밋 메시지 규칙More actions

| 태그       | 의미                 |
|------------|---------------------|
| `feat`     | 기능 추가            |
| `fix`      | 버그 수정            |
| `style`    | 스타일/CSS 수정      |
| `refactor` | 리팩토링             |
| `docs`     | 문서/주석 수정       |
| `chore`    | 설정/빌드 기타 작업  |
| `test`     | 테스트 코드 추가/수정 |More actions

---

## 📅 진행 로그

### 🗓 2025년 6월 23일 회의

| 항목            | 내용 |
|-----------------|------|
| 기능 개발 주제 | ToDoList  |
| 선정 이유         | 기존에 학습했던 JS 기술 기반을 다양하게 사용할 수 있어 선정함 |
| 오늘의 To Do      | 아래 참고 |

**To Do**
- HTML 및 CSS 구조 작업
- 브랜치 전략 및 파일 구조 통일

---

### 🗓 2025년 6월 24일 회의

| 항목            | 내용 |
|-----------------|------|
| 주요 논의 | 작업 시작 전 이슈 등록 및 JS 개발 작업  |
| 오늘의 To Do      | 아래 참고 |

**To Do**


- **고동현**: ```README``` 작성, 스톱워치 구현
- **김경민**: JS ToDoList 기능 구현
- **백승현**: 유저 업적 기록 그래프 랜더링 CSS
- **송민재**: ```Gemini API``` 로 호출해서 로그 받기

---
### 🗓 2025년 6월 25일 회의

| 항목            | 내용 |
|-----------------|------|
| 주요 논의 | 24일 작업 내용 브리핑 및 1차 병합하면서 충돌해결 후 코드리뷰 진행  |
| 오늘의 To Do      | 아래 참고 |

**To Do**
- ```app.js``` 내 JS 모듈을 ```import``` 방식으로 정리
- 금일 작업 내용 이슈 등록

- **고동현**: ```README``` 작성, 오늘의 명언 API 연동 및 랜더링
- **김경민**: ToDoList 기능에 ```Drag & Drop``` 기능 구현
- **백승현**: 유저 업적 기록 시각화를 위한 그래프 스타일 및 ```CSS``` 작업 
- **송민재**:  ```Gemini API```에서 받은 ```JSON``` 응답 문자열을 각 항목별로 구분하여 렌더링할 수 있도록 구현 \
줄바꿈 처리 및 ```Key/Value``` 형식이 시각적으로 잘 보이도록 개선 예정

---
### 🗓 2025년 6월 26일 회의

| 항목            | 내용 |
|-----------------|------|
| 주요 논의 |   25일 작업 내용 브리핑 및 모달 Z-INDEX 순위 조정 후 병합 |
| 오늘의 To Do      | 아래 참고 |

**To Do**


- **고동현**: 스톱워치 쉬는시간 모달 생성 및 버튼 ```hover``` 효과,스톱워치 및 오늘의 명언 로고 변경
- **김경민**: ToDoList 버튼 로고 변경 및 완료된 일정 카운트하여 로컬스토리지에 저장
- **백승현**: 로컬스토리지에서 데이터 불러와 랜더링 처리 ( 대상: 스톱워치 / ToDoList 일정 / AI 질문 )  
- **송민재**: JS 모듈화 및 AI 기능 관련 함수 구조 다이어그램 작성
---

### 🗓 2025년 6월 27일 회의

| 항목            | 내용 |
|-----------------|------|
| 주요 논의 | 26일 작업 내용 브리핑 및 2차 병합하며 코드리뷰 진행   |
| 오늘의 To Do      | 아래 참고 |

**To Do**


- **고동현**: ```README``` 작성 및 Git Hub PR 관리
- **김경민**: 버튼 이벤트 및 CSS 버그 픽스, PPT 초안 작성
- **백승현**: AI 질문 카운트 로컬 스토리지에서 데어터 불러와 랜더링 ( AI 질문 )
- **송민재**: AI 영역 무한 스크롤 및 답변 영역 해설과 정답 분리하는 드롭다운 개발
---

### 🗓 2025년 6월 30일 회의

| 항목            | 내용 |
|-----------------|------|
| 주요 논의 | 주말 작업 내용 브리핑 및 3차 병합, 병합 후 버그 확인 |
| 오늘의 To Do      | 아래 참고 |

**To Do**


- **고동현**: ```README``` 작성 및 3차 병합 브랜치 전체 버그 확인
- **김경민**: 발표 PPT 제작
- **백승현**: 업적 모달에 ```animation``` 추가하여 업적 상세 설명 UX 개발
- **송민재**: AI 영역 무한 스크롤 구현 
---

### 🗓 2025년 7월 1일 회의

| 항목            | 내용 |
|-----------------|------|
| 주요 논의 |  개발 마무리 후 main 브랜츠 전체 병합, PPT 제작 및 회고록 작성 |
| 오늘의 To Do      | 아래 참고 |

**To Do**


- **고동현**: 개인회고록 작성, 전체 병합 후 버그 확인
- **김경민**: PPT 제작, 개인회고록 작성
- **백승현**: 개인회고록 작성, 전체 병합 후 버그 확인
- **송민재**: AI 영역 질문 창 마무리, 개인 회고록 작성, 발표 준비

---
## ⚠️ Trouble Shooting

### 1. 모달 ```z-index``` 충돌 문제

- **문제**: 여러 기능(스톱워치·오늘의 명언 / ToDoList / 업적 로그)에서 모달이 각각 존재함에도 불구하고, \
```z-index``` 우선순위가 명확히 설정되지 않아 모달이 겹치거나 안 보이는 현상 발생

- **원인**: 각 기능 영역에서 모달을 따로 구현하면서 ```z-index``` 값을 전역적으로 조정하지 않고 중첩 사용함 \
 브라우저에서 어떤 모달이 위에 떠야 할지 판단하지 못하고 일부 모달이 가려지는 현상 발생

- **해결**: 기능별로 모달 우선순위 기준을 명확히 설정하여 ```z-index``` 값을 조정함 \
  이를 통해 모든 모달이 기능에 맞게 순차적으로 제대로 표시되도록 수정 완료
  
- **협업 포인트**: 새로운 모달이 추가될 경우 반드시 ```z-index``` 기준에 따라 등록 \
팀원 간 UI 겹침 테스트 시, 겹칠 수 있는 화면 조합을 미리 확인하는 절차 필요

---

### 2. GitHub 머지 시 잦은 충돌 발생

* **문제**:
  GitHub에서 PR 병합 시 **HTML 파일 간 충돌이 반복적으로 발생**함.\
  초기 구조가 정리되지 않은 상태에서 바로 병합하면서 발생한 문제.

* **원인**:
  초반에 HTML 뼈대를 제대로 설계하고 공유하지 않고, 빠르게 ```develop``` 브랜치에 병합한 상태에서 협업을 시작함.\
   이로 인해 팀원들이 CSS, JS 작업을 진행하며 구조가 자주 변경됨, 그 결과 잦은 충돌을 유발함.

* **해결**:
  PR을 생성할 때, **충돌 가능성이 있는 구간 및 변경 내용에 대한 안내 메시지를 상세히 작성**함.\
   예: "`index.html` 구조 일부 수정했습니다. 충돌 시 `stopwatch-branch` 영역 기준으로 맞춰주세요."\
  이를 통해 충돌이 발생해도 팀원들이 **어디서 충돌이 나는지 빠르게 파악하고 수동 해결 가능**하게 만듦.

* **협업 포인트**:

  * 개발 초기에는 공통 구조(HTML/CSS/디렉터리 구조 등)를 사전에 명확히 정의하고 브랜치 병합은 신중히 진행
  * PR 생성 시 변경 범위 및 충돌 예상 지점을 메시지로 필수 공유
  * 팀원들과 PR을 통해 충분한 **코드 리뷰**와 소통으로 충돌을 빠르게 해결할 수 있었음.

---

## 저작권

- 명언 API  
  ⤷ 출처: [korean-advice-open-api](https://github.com/gwongibeom/korean-advice-open-api)

- AI 응답 기능  
  ⤷ 본 프로젝트는 Google에서 제공하는 [Gemini API](https://ai.google.dev/)를 기반으로 AI 응답을 제공합니다.

