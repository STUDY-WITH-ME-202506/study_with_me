//=========렌더링===========//]
/**
 * 누구에게 메세지를 렌더링 할지 정하는 함수
 * @param who 누구에게 하는지, 항상 문자열로 반환할 것
 * @param message 무슨 메세지를 전달할 건지
 */
export function talkRendering(who, message){
  // 사용자 말풍선에 렌더링
  if (who === "user"){
    document.querySelector('.prev-question').textContent = message;
  }
  // ai 말풍선에 렌더링
  else if (who === "ai"){
    document.querySelector('.answer-box').textContent = message;
  }
  // 둘다 아닐시 오류원인 로그로 출력
  else{
    console.log("정확하게 누구인지 알려주세요");
  }
}


export function stringSplit(jsonString) {
  const obj = JSON.parse(jsonString);// 문자열 → 객체
  // notDollar 함수를 호출하여 obj 객체 자체를 수정하도록 합니다.
  // 이 함수의 반환 값은 사용하지 않습니다.
  notDollar(obj); // <-- 수정된 부분
  let resultText = '';// 빈 문자열로 초기화

  // ":"를 기준으로 알아서 key와 value로 나눠줌
  Object.entries(obj).forEach(([key, value]) => {
    const label = {
      problemType: '문제 유형',
      problemLevel: '문제 레벨',
      problem: '문제',
      problemOneLine: '문제 한줄 설명',
      solvingOrder: ['문제 풀이'],
      answer: '문제의 답',
      tip: '비슷한 유형에서의 풀이법'
    }[key] || key;

    // value가 배열일 경우 예쁘게 줄바꿈 처리
    if (Array.isArray(value)) {
      resultText += `${label}:\n${value.map(v => ` - ${v}`).join('\n\n')}\n\n`;
    } else {
      resultText += `${label}: ${value}\n\n`;
    }
  });

  console.log('str', resultText);
  return resultText;
}

//======달러표시 지우기===///
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
