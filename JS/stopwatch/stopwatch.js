import {saveTime} from './stopwatch-record.js'; // 기록 로컬 스토리지 저장 함수


// 스톱워치 함수
export function stopwatch() {

// DOM 가져오기
    const [$startBtn, $pauseBtn, $resetBtn]
        = [...document.querySelector('.stopwatch-buttons').children];

    const $stopWatchDisplay = document.querySelector('.stopwatch-display');

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

    // 스톱워치 스타드
    function startStopwatch(e) {

        // 버튼 활성화 상태
        changeState(true);

        timerIntervalId = setInterval(() => {
            // 시간을 계속 기록
            elapsedTime += 10;
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

        $stopWatchDisplay.textContent = '00:00:00';
        $pauseBtn.textContent = '일시정지';

        changeState(false);



    }


    $startBtn.addEventListener('click', startStopwatch);

    $pauseBtn.addEventListener('click', pauseStopwatch);

    $resetBtn.addEventListener('click', resetStopwatch);


    formatElapsedTime();

}
