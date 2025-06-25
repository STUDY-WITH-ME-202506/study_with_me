import {aiGet} from './aiQuestion/aiCall.js';
import {quoteModal} from './stopwatch/quoteModal.js'; // 모달 JS
import {stopwatch} from './stopwatch/stopwatch.js'; // 스톱워치 JS


// 확인 버튼 누르면 aiGet() 호출하기
document.getElementById('pushAi').addEventListener('click',e=>{
  console.log('button');
  aiGet();
})

// 스톱워치
stopwatch()

// 명언 모달 열고 닫기
quoteModal();


