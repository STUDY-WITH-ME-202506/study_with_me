import {talkRendering,clearText} from './aiRendering.js';
import {stringSplit} from './cleanString.js';
import {questionCount} from "./questionCount.js";


//======== 변수 정의 ========//
// 제미나이 key와 주소
const API_KEY = '';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
// 프롬프트관련 변수
const textInput = document.getElementById('problemText');//질문 입력창 주소
let userInfo = '{나이: 만 15세, 수준: 보통}';// 질문자 정보
let inputQuestion = '';// 질문 내용

//=========함수 정의=========//

/**
 * 직접 ai 에게 질문하고 답변받는 함수
 * @param inputQuestion 질문할 내용
 * @return {Promise<any>} 반활할 JSON
 */
async function aiQuestion(inputQuestion) {
  const prompt = generatePrompt(userInfo, inputQuestion);//유저정보와 질문내용을 템플릿에 담은 프롬프트
  const gemini = {contents: [{parts: [{text: prompt}]}]};// 제미나이에게 질문하기

  clearText(textInput); //입력창 초기화

  // 제미나이에게 문자 질문하는 형식
  const res = await fetch(url, {
    method: 'POST', // 보낸다.
    headers: {'Content-Type': 'application/json'}, // 제이슨 타입
    body: JSON.stringify(gemini) //JSON의 string 타입으로 변환
  });

  // res가 괜찮지 않다면 res의 상태를 내보내기
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

  // ai 질문횟수를 로컬스토리지에 저장
  questionCount();
  // 이곳에서 응답 본문을 JSON 객체로 파싱
  return await res.json();
}

/**
 * 제미나이에게 프롬프트의 질문을 보내서 답변을 리턴하는 함수
 * @return {Promise<void>}
 */
// async가 함수 앞에 있어야 await을 쓸 수 있음
// await은 리턴 값이 오기 전까지 기다림
async function aiCall() {
  inputQuestion = textInput.value;// 사용자가 입력한 질문 내용 = textInput.value;
  talkRendering('user', inputQuestion);// 사용자가 입력한 질문 렌더링

  const res = await aiQuestion(inputQuestion);// 질분답변을 JSON 객체로 파싱해서 받음
  const problemJsonString = res.candidates[0].content.parts[0].text;// text 부분 추출

  const {problemExplain, problemSolving} =stringSplit(problemJsonString)
  console.log('problem', problemExplain);
  talkRendering('aiEx', problemExplain);// 답변 렌더링하기
  talkRendering('aiSol',problemSolving)
}


//===========프롬프트========//
/**
 * @description Gemini API 에게 보낼 프롬프트를 생성합니다.
 * @param userInfo - 사용자 정보
 * @param inputQuestion - 인풋 받은 문제
 * @returns {string} - 완성된 프롬프트 문자열
 */
function generatePrompt(userInfo, inputQuestion) {
  // AI가 더 좋은 답변을 생성하도록, 역할을 부여하고 명확하게 지시합니다.
  return `
당신은 현재 대한민국의 1타 강사입니다. 아래의 질문자 정보를 고려해서 질문 의도에 따라 
원하는 문제를 하나 만들어주거나, 문제를 만들지않고 질문의 답변만 해주세요.
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
    "3단계: [세 번째 풀이 단계]",
    // ... 필요한 만큼 단계 추가
  ],
  "answer": "문제의 답",
  "tip": "비슷한 유형에서의 풀이법"
}
`;
}


//========변수 값 리턴==========//
export function aiGet() {
  // 확인 버튼 누르면 aiGet() 호출하기
  document.getElementById('pushAi').addEventListener('click',e=>{
    console.log('button');
    aiCall(); //ai 호출 함수
  })

  // 입력창에서 enter 누르면 aiGet() 호출하기
  document.getElementById('problemText').addEventListener("keydown", e=>{
    if (e.key === "Enter") {
      console.log('enter');
      aiCall(); //ai 호출 함수
    }
  })
}

// 질문 카운트 만들기