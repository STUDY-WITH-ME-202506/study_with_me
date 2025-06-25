import {talkRendering, stringSplit} from './aiRendering.js';

const API_KEY = 'AIzaSyAnx5WFFsMBgfx8dmdEruWmT5888F5TJCI';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


//======== 변수 정의 ========//
// 질문자 정보
let userInfo = '{나이: 만 15세, 수준: 보통}';
// 질문 내용
let inputQuestion = '기말고사를 대비하기 위해 중학교 3학년 수학 2차 방정식을 내 수준에 맞춰서 하나 내줘';
// async가 함수 앞에 있어야 await을 쓸 수 있음
// await은 리턴 값이 오기 전까지 기다림


//=========함수 정의=========//
/**
 * 제미나이에게 프롬프트의 질문을 보내서 답변을 리턴하는 함수
 * @return {Promise<void>}
 */
async function aiCall() {
  const textInput = document.getElementById('problemText');
  inputQuestion = textInput.value;
  textInput.value = '';
  const prompt = generatePrompt(userInfo, inputQuestion);
  const gemini = {contents: [{parts: [{text: prompt}]}]};
  talkRendering('user', inputQuestion);
  // 제미나이에게 문자 질문하는 형식
  const res = await fetch(url, {
    method: 'POST', // 보낸다.
    headers: {'Content-Type': 'application/json'}, // 제이슨 타입
    body: JSON.stringify(gemini) //JSON의 string 타입으로 변환
  });
  // res가 괜찮지 않다면
  if (!res.ok) {
    //res의 상태를 내보내기
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  // 질문의 답변을 json 으로 변환하기
  const result = await res.json();
  // 답변에서 필요한 문자열만 따로 빼내기
  let problemJsonString = result.candidates[0].content.parts[0].text;
  if (problemJsonString.startsWith('```')) {
    console.log('마크다운 형식 감지! JSON 추출을 시작합니다.');
    // 첫 번째 '{' 와 마지막 '}' 사이의 문자열만 잘라냅니다.
    const startIndex = problemJsonString.indexOf('{');
    const endIndex = problemJsonString.lastIndexOf('}');
    problemJsonString = problemJsonString.substring(startIndex, endIndex + 1);
  }
  talkRendering('ai', stringSplit(problemJsonString));
}

//===========프롬프트========//

/**
 * @description Gemini API 에게 보낼 프롬프트를 생성합니다.
 * @param userInfo - 질문자 정보
 * @param inputQuestion - 인풋 받은 문제
 * @returns {string} - 완성된 프롬프트 문자열
 */
function generatePrompt(userInfo, inputQuestion) {
  // AI가 더 좋은 답변을 생성하도록, 역할을 부여하고 명확하게 지시합니다.
  const prompt = `
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
  return prompt;
}


//========변수 값 리턴==========//
export function aiGet() {
  aiCall(); // 호출만 하고 결과는 console에 출력됨
}

// 질문 카운트 만들기