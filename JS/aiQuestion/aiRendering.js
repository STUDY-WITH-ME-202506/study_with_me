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
  // ai 문제 설명 풍선에 렌더링
  else if (who === "aiEx"){
    document.querySelector('.answer-box').textContent = message;
  }
  // ai 문제 풀이 풍선에 렌더링
  else if (who === "aiSol"){
    document.querySelector('.solving-box').textContent = message;
  }

  // 둘다 아닐시 오류원인 로그로 출력
  else{
    console.log("정확하게 누구인지 알려주세요");
  }
}

/**
 * 주소의 내용을 초기화 시키는 함수
 * @param adress
 */
export function clearText(adress){
  adress.value = '';// 주소의 내용 초기화
}