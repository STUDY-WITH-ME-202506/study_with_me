
import {saveTime} from './stopwatch-record.js'; // 기록 로컬 스토리지 저장 함수


// 스톱워치 함수
export function stopwatch() {

// DOM 가져오기
    const [$startBtn, $pauseBtn, $resetBtn]
        = [...document.querySelector('.stopwatch-buttons').children];

    const $stopWatchDisplay = document.querySelector('.stopwatch-display');

    // 쉬는시간 모달 DOM
    const $breakModal = document.querySelector('#break-modal')
    const $closeBreakModalBtn = document.querySelector('.break-modal-btn')

    // 경과누적 시간 저장하기
    let elapsedTime = 0;
    // 스톱 워치 실행 여부
    let isRunning = false;
    //  인터벌 아이디
    let timerIntervalId = null;


// 이벤트 핸들러 정의 //
    function formatElapsedTime() {
        // 경과시간을 00시 00분 00초 형태로 변환
        const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');

        // 지속적인 경과시간을 화면에 렌더링
        $stopWatchDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    }

    // 버튼 비활성화 상태 처리
    function changeState(isStart) {
        $startBtn.disabled = isStart;
        $pauseBtn.disabled = !isStart;
        isRunning = isStart;
    }

    let hasShownBreak = false; // 모달이 한 번이라도 떴는지 확인 여부
    let breakTargetTime = null; // 재개 후 목표 시간 재설정

    // 스톱워치 스타드
    function startStopwatch(e) {

        // 버튼 활성화 상태
        changeState(true);

        const isTestMode = false; // true로 바꾸면 5초 뒤 모달 열림 (테스트 용)
        const breakTime = isTestMode ? 5000 : 3000000; // 5초 : 50분

        breakTargetTime = elapsedTime + breakTime; // 재개 할 떄마다 50분 목표 시간 설정

        timerIntervalId = setInterval(() => {

            // 시간을 계속 기록
            elapsedTime += 10;

            if(!hasShownBreak && elapsedTime >= breakTargetTime){
                clearInterval(timerIntervalId); //  타이머 멈춤
                timerIntervalId = null;
                isRunning = false; // 상태 반영
                showBreakModal();
                hasShownBreak = true; // 중복 방지
                $pauseBtn.textContent = '재개'; // 버튼 상태도 반영
            }

            // 화면에 렌더링
            formatElapsedTime();
        }, 10);

    }

    function pauseStopwatch(e) {

        // 현재 스톱워치가 일시정지 중인지 돌고있는 중인지를 알 수 있는 방법이 필요
        if (isRunning) {

            // 스톱워치를 중단 (인터벌 클리어)
            clearInterval(timerIntervalId);
            timerIntervalId = null;
            isRunning = false; // 실행 상태 변경

            // 텍스트 변경
            $pauseBtn.textContent = '재개';

        } else { // 멈춰있는 중
            startStopwatch();
            // 텍스트 변경
            $pauseBtn.textContent = '일시정지';
        }
    }

    function resetStopwatch(e) {

        clearInterval(timerIntervalId);
        timerIntervalId = null;

        saveTime(elapsedTime) // 기록 로컬 스토리지 저장 함수

        elapsedTime = 0;

        hasShownBreak = false;
        breakTargetTime = null;
        $stopWatchDisplay.textContent = '00:00:00';
        $pauseBtn.textContent = '일시정지';

        changeState(false);



    }

    // 쉬는 시간 모달 열림
function showBreakModal(){
        $breakModal.style.display = 'flex';
    }

    // 쉬는 시간 모달 닫기 및 타이머 재설정 함수
    function closeBreakModal() {
        $breakModal.style.display = 'none';

        // 쉬는 시간 종료 후 새 타이머를 설정하는 로직
        const isTestMode = true;
        const breakTime = isTestMode ? 5000 : 3000000;

        hasShownBreak = false; // 다음 알림을 위한 초기화
        breakTargetTime = elapsedTime + breakTime; // 다음 목표 시간 재설정
    }

    //  쉬는 시간 모달 닫기 버튼 이벤트
    $closeBreakModalBtn.addEventListener('click', closeBreakModal);

    //  ESC 키로 모달 닫기 이벤트
    document.addEventListener('keydown', (e) => {
        // 쉬는 시간 모달이 열려 있고, ESC 키를 눌렀을 때
        if ($breakModal.style.display === 'flex' && e.key === 'Escape') {
            closeBreakModal();
        }
    });



 // 스톱워치 버튼 이벤트
    $startBtn.addEventListener('click', startStopwatch);

    $pauseBtn.addEventListener('click', pauseStopwatch);

    $resetBtn.addEventListener('click', resetStopwatch);


    formatElapsedTime();

}


