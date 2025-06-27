//========문자열을 가독성 좋게 해주는 함수 모음집======//

/**
 * 받은 JSON을 가독성 좋게 만드는 함수
 * @param jsonString 받은 JSON 문자열
 * @return {string} 리턴할 문자열
 */
export function stringSplit(jsonString) {
  // 1. 백틱 제거
  jsonString = backtickRemove(jsonString);

  // 2. 문자열 → 객체
  const obj = JSON.parse(jsonString);

  // 3. $ 기호 제거
  notDollar(obj);

  // 4. 두 덩어리로 나누기 (⚠️ 배열 구조 분해)
  const [part1, part2] = splitData(obj);

  // 5. 문자열로 변환
  const problemExplain = keyValue(part1);
  const problemSolving = keyValue(part2);

  // 6. 하나로 합쳐서 반환
  const resultText = problemExplain; //+ text2;

  console.log('🧾 전체 문자열 결과:', resultText);
  return {problemExplain, problemSolving};
}


//========백틱 제거======//
/**
 * 앞뒤 백틱을 제거하는 함수
 * @param jsonString 제거할 JSON 문자열
 * @return {string} 리턴할 문자열
 */
function backtickRemove(jsonString){
  // "```" 백틱 3개 제거하는 과정
  if (jsonString.startsWith('```')) {
    console.log('마크다운 형식 감지! JSON 추출을 시작합니다.');
    // 첫 번째 '{' 와 마지막 '}' 사이의 문자열만 잘라냅니다.
    const startIndex = jsonString.indexOf('{');
    const endIndex = jsonString.lastIndexOf('}');
    jsonString = jsonString.substring(startIndex, endIndex + 1);
  }
  return jsonString;
}

//======달러표시 지우기===///
/**
 * 문자열 중간에 있는 $를 제거하는 함수
 * @param data 받은 문자열
 * @return {*} 리턴값 받지 않음.
 */
function notDollar(data) {
  function removeDollarSigns(text) {
    // 백슬래시로 이스케이프된 $도 함께 제거하기 위해 \\$ 패턴도 고려
    return text.replace(/\\?\$/g, '');
  }

  // 객체 내의 모든 문자열 값에서 $ 기호 제거
  function processObject(data) {
    for (const key in data) {
      if (typeof data[key] === 'string') {
        data[key] = removeDollarSigns(data[key]);
      } else if (Array.isArray(data[key])) {
        data[key] = data[key].map(item => {
          if (typeof item === 'string') {
            return removeDollarSigns(item);
          }
          return item;
        });
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        processObject(data[key]); // 중첩된 객체 처리 (현재 JSON 구조에서는 필요 없지만, 일반적인 처리 방식)
      }
    }
    return data; // 변경된 객체를 반환하지만, 호출하는 쪽에서 이 반환값을 직접 사용하지 않아도 됩니다.
  }

  return processObject(data); // data를 전달
  // 수정된 객체를 다시 JSON 문자열로 변환 (필요하다면)
  // const cleanedJsonString = JSON.stringify(processedObj, null, 2);
}

function splitData(data) {
  const part1Keys = ['problemType', 'problemLevel', 'problem', 'problemOneLine'];
  const part2Keys = ['solvingOrder', 'answer', 'tip'];

  const part1 = {};
  const part2 = {};

  Object.entries(data).forEach(([key, value]) => {
    if (part1Keys.includes(key)) part1[key] = value;
    else if (part2Keys.includes(key)) part2[key] = value;
  });

  return [part1, part2];
}



//=======key : value======///
/**
 * 문자열을 Key : value 형식으로 바꾸고 줄바꿈하는 함수
 * @param data 가공할 문자열
 * @return {string} 리턴 문자열
 */
function keyValue(data){
  let result = '';
  const labelMap = {
    problemType: '문제 유형',
    problemLevel: '문제 레벨',
    problem: '문제',
    problemOneLine: '문제 한줄 설명',
    answer: '문제의 답',
    tip: '비슷한 유형에서의 풀이법'
  };

  Object.entries(data).forEach(([key, value]) => {
    const label = labelMap[key] || key;

    if (Array.isArray(value)) {
      result += arrayPlace(key, value); // 배열일 경우 따로 처리
    } else {
      result += `${label}: ${value}\n\n`;
    }
  });

  return result;
}

function arrayPlace(key, array) {
  const labelMap = {
    solvingOrder: '문제 풀이'
  };

  const label = labelMap[key] || key;
  return `${label}:\n${array.map(v => ` - ${v}`).join('\n\n')}\n\n`;
}

