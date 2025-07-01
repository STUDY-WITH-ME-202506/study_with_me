
import { talkRendering, clearText } from './aiRendering.js';
import { stringSplit } from './cleanString.js';
import { questionCount } from "./questionCount.js";

//======== 변수 정의 ========//
const API_KEY = '';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const textInput = document.getElementById('problemText'); // 질문 입력창
let userInfo = '{나이: 만 15세, 수준: 보통}';
let inputQuestion = ''; // 질문 내용

//========= AI 요청 함수 =========//
async function aiQuestion(inputQuestion) {
  const prompt = generatePrompt(userInfo, inputQuestion);
  const gemini = { contents: [{ parts: [{ text: prompt }] }] };

  clearText(textInput); // 입력창 초기화

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gemini)
  });

  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

  questionCount(); // 질문 수 기록
  return await res.json();
}

//========= AI 호출 및 렌더링 함수 =========//
async function aiCall() {
  inputQuestion = textInput.value.trim();
  talkRendering('user', inputQuestion);

  try {
    const res = await aiQuestion(inputQuestion);
    const problemJsonString = res.candidates[0].content.parts[0].text;

    const { problemExplain, problemSolving } = stringSplit(problemJsonString);

    console.log('problem', problemExplain);
    talkRendering('aiEx', problemExplain);
    talkRendering('aiSol', problemSolving);
  } catch (e) {
    console.error('❌ AI 호출 중 에러 발생:', e);
    talkRendering('aiEx', '[에러] AI 응답을 처리할 수 없습니다.');
  }
}

//========= 프롬프트 생성 함수 =========//
function generatePrompt(userInfo, inputQuestion) {
  return `
당신은 현재 대한민국의 1타 강사입니다. 아래의 질문자 정보를 고려해서 질문 의도에 따라 
원하는 문제를 하나 만들어주거나, 문제를 만들지 않고 질문의 답변만 해주세요.
그리고 만든 문제를 풀이할 때 논리적인 과정을 통해서 답을 도출하는 과정을 설명해주세요.
응답은 반드시 아래에 명시된 JSON 형식에 맞춰서, 다른 부가 설명 없이 JSON 데이터만 반환해야 합니다.

[질문자 정보]
${userInfo}

[원하는 문제]
${inputQuestion}

[출력 JSON 형식]
{
  "problemType": "문제 유형",
  "problemLevel": "문제 레벨",
  "problem": "문제",
  "problemOneLine": "문제 한줄 설명",
  "solvingOrder": [
    "1단계: [문제 정의 또는 첫 번째 풀이 단계]",
    "2단계: [두 번째 풀이 단계]",
    "3단계: [세 번째 풀이 단계]"
  ],
  "answer": "문제의 답",
  "tip": "비슷한 유형에서의 풀이법"
}
  `;
}

//========= 이벤트 연결 함수 =========//
export function aiGet() {
  const $pushAi = document.getElementById('pushAi');
  const $input = document.getElementById('problemText');
  const $solBtn = document.querySelector('.sol-btn');

  if ($pushAi) {
    $pushAi.addEventListener('click', () => {
      console.log('button');
      aiCall();
    });
  }

  if ($input) {
    $input.addEventListener('keydown', (e) => {
      if (e.key === "Enter") {
        console.log('enter');
        aiCall();
      }
    });
  }

  if ($solBtn) {
    $solBtn.addEventListener('click', () => {
      console.log('sol-btn');
      $solBtn.classList.toggle('show');
    });
  }
}

