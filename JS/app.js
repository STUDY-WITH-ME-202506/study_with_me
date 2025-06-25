import {aiGet} from './aiQuestion/aiCall.js';

// 확인 버튼 누르면 aiGet() 호출하기
document.getElementById('pushAi').addEventListener('click',e=>{
  console.log('button');
  aiGet();
})
