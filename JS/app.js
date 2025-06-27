import {aiGet} from './aiQuestion/aiCall.js';
import {quoteModal} from './stopwatch/quoteModal.js'; // 모달 JS
import {stopwatch} from './stopwatch/stopwatch.js'; // 스톱워치 JS

import {todolist} from './todolist/todolist.js'; // 투두리스트 JS
import {playTime} from './playTime/playTime.js';


// ai 대화창
aiGet();

// 스톱워치
stopwatch()

// 명언 모달 열고 닫기
quoteModal();

// 투두리스트
todolist();

playTime();


