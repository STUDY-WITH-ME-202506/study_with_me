//===== 전역 변수 ====//
const aiSection = document.querySelector('.ai-section');
const qaBlock = document.querySelector('.qa-block');
//=========렌더링===========//
/**
 * 누구에게 메세지를 렌더링 할지 정하는 함수
 * 이 함수는 기존의 `.prev-question`이나 `.answer-box`를 업데이트하는 대신,
 * 항상 새로운 대화 블록을 만들고 거기에 메시지를 렌더링하도록 변경했습니다.
 * @param {string} who - 누구에게 하는지 ("user", "aiEx", "aiSol")
 * @param {string} message - 전달할 메시지
 */
export function talkRendering(who, message) {
  // 현재 활성화된 QA 블록을 찾거나 새로 만듭니다.
  // .qa-block 내의 마지막 .qa-unit을 찾아서 사용하거나, 없으면 새로 만듭니다.
  // 여기서는 메시지 유형에 따라 새로운 QA 유닛을 생성하는 방식으로 변경합니다.

  // 새로운 대화 단위(질문 + 답변)를 생성하는 함수 (여기서는 이 함수를 직접 호출하지 않고,
  // talkRendering 내부에서 적절히 요소를 만들도록 변경합니다.)
  if (who === "user") {
    const newQaUnit = createNewQaUnit(); // 새로운 질문/답변 묶음 생성
    const userQuestionDiv = newQaUnit.querySelector('.user-question'); // 사용자 질문이 들어갈 div
    userQuestionDiv.textContent = message;
    qaBlock.appendChild(newQaUnit); // qaBlock에 새로운 대화 단위 추가

  }
  // AI 문제 설명 풍선에 렌더링 (새로 생성된 .answer-box에 메시지 추가)
  else if (who === "aiEx") {
    // 가장 최근에 추가된 .qa-unit을 찾아서 그 안의 .answer-box에 메시지를 넣습니다.
    const lastQaUnit = qaBlock.lastElementChild;
    if (lastQaUnit && lastQaUnit.querySelector('.answer-box')) {
      lastQaUnit.querySelector('.answer-box').textContent = message;
    } else {
      console.error("aiEx: 적절한 .answer-box 요소를 찾을 수 없습니다.");
    }
  }
  // AI 문제 풀이 풍선에 렌더링 (새로 생성된 .sol-box에 메시지 추가)
  else if (who === "aiSol") {
    // 가장 최근에 추가된 .qa-unit을 찾아서 그 안의 .sol-box에 메시지를 넣습니다.
    const lastQaUnit = qaBlock.lastElementChild;
    if (lastQaUnit && lastQaUnit.querySelector('.sol-box')) {
      lastQaUnit.querySelector('.sol-box').textContent = message;
    } else {
      console.error("aiSol: 적절한 .sol-box 요소를 찾을 수 없습니다.");
    }
  }
  // 오류 원인 로그로 출력
  else {
    console.error("정확하게 누구인지 알려주세요: " + who);
  }
  scrollToBottom(); // 스크롤 이동
}

/**
 * 새로운 질문/답변 묶음(div.qa-unit)을 생성하고 반환합니다.
 */
function createNewQaUnit() {
  const qaUnit = document.createElement('div');
  qaUnit.className = 'qa-unit'; // 새로운 클래스 이름을 부여하여 기존 qa-block과의 혼동 방지
  qaUnit.innerHTML = `
       
        <div class="answer-area">
            <div class="user-question"></div>
            <div class="answer-box"></div>
            <details class="sol-btn">
                <summary>답변 보기</summary>
            </details>
            <div class="sol-box"></div>
        </div>
    `;

  // 답변 보기 버튼 토글 이벤트 추가
  const details = qaUnit.querySelector('.sol-btn');
  const solBox = qaUnit.querySelector('.sol-box');
  if (details && solBox) { // 요소가 존재하는지 확인
    details.addEventListener("toggle", () => {
      solBox.classList.toggle('show');
    });
  }
  return qaUnit;
}


/**
 * 주소의 내용을 초기화 시키는 함수
 * @param {HTMLInputElement} adress - 초기화할 input 요소
 */
export function clearText(adress) {
  adress.value = ''; // 주소의 내용 초기화
}

/**
 * qaBlock을 최신 항목으로 스크롤 이동
 */
function scrollToBottom() {
  const aiSection = document.querySelector('.ai-section');
  if (aiSection) {
    aiSection.scrollTop = aiSection.scrollHeight;
  }
}

