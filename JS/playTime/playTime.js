export function playTime() {

// ================= 변수 선언부 ================//

    const $openModal = document.getElementById('modal-btn');
    const $userCard = document.getElementById('user-card');
    const $cardOverlay = document.getElementById('card-overlay');
    const $closeCard = document.getElementById('close-card-btn');
    const $fillGauge = document.getElementById('fill-gauge');
    const $gaugeMessage = document.querySelector('.gauge-message.bottom');
    const [$question, $planner, $studyTime] = [...document.querySelectorAll('.achieve-stat')];
    const [$questionAc, $plannerAc, $studyTimeAc] = [...document.querySelectorAll('.grade')];
    const [$circle1, $circle2, $circle3] = [...document.querySelectorAll('.achieve-circle')];


    // 유저의 목표시간 추후에 데이터 받아서 수정가능
    const goalTime = 180;

    // 스톱워치 시간 데이터
    let totalTime = JSON.parse(localStorage.getItem('totalTime'));
    let modalTimeout = null; //인터벌 변수

// ==================  함수 선언부 ================== //
// == 투두리스트 버튼 클릭 시 모달 open
    function openModal() {
        $openModal.addEventListener('click', e => {
            $userCard.classList.remove('hide');
            $cardOverlay.classList.remove('hide');
            $userCard.classList.add('show');
            $cardOverlay.classList.add('show');
            isModalOpen();
        })
    }

    function closeModal() {
        $closeCard.addEventListener('click', e => {
            $userCard.classList.remove('show');
            $cardOverlay.classList.remove('show');
            $userCard.classList.add('hide');
            $cardOverlay.classList.add('hide');
            $fillGauge.style.width = `0%`
        })
    }

    //퍼센트글씨가 바뀌는 애니메이션
    function textOfPercent(percent, timeout) {
        let countPercent = 0;
        const interval = setInterval(() => {
            const $timePer = [...document.querySelectorAll('.time-per')];
            if (countPercent <= percent) {
                $timePer.forEach(time => {
                    time.textContent = `${countPercent}%`;
                    countPercent++;
                })
            } else {
                clearInterval(interval);
            }
        }, timeout)
    }

    // 업적상황에 따라 GRADE 반영 하는 함수
    function gradeMaker(value, ac) {
        if (value >= 0 && value < 20) {
            ac.textContent = "C";
        } else if (value >= 20 && value < 40) {
            ac.textContent = "B";
        } else if (value >= 40 && value < 60) {
            ac.textContent = "A";
        } else if (value >= 60) {
            ac.textContent = "S";
        }
    }

    // 업적 현황을 업적텍스트에 반영하는 함수
    function gradeStat(kindOfAchieve, achieve, circle) {
        let circleDegree = 0;
        if (!kindOfAchieve) kindOfAchieve = 0;
        if (kindOfAchieve >= 0 && kindOfAchieve < 20) {
            achieve.textContent = `${kindOfAchieve}/20`;
            circleDegree = (kindOfAchieve / 20) * 360;
        } else if (kindOfAchieve >= 20 && kindOfAchieve < 40) {
            achieve.textContent = `${kindOfAchieve - 20}/20`;
            circleDegree = ((kindOfAchieve - 20) / 20) * 360
        } else if (kindOfAchieve >= 40 && kindOfAchieve < 60) {
            achieve.textContent = `${kindOfAchieve - 40}/20`;
            circleDegree = ((kindOfAchieve - 40) / 20) * 360
        } else if (kindOfAchieve >= 60) {
            achieve.textContent = `${kindOfAchieve}`;
            circleDegree = 360;
        }
        let intervalLimit = 0;
        let hslHandle;
        let hue=160;
        const intervalHandle = setInterval(() => {
            if (intervalLimit <= circleDegree) {// hue 조절부 240부터 시작
                hslHandle = hslHandle < 2 ? 1 : hue - (intervalLimit / 2);

                circle.style.background = `conic-gradient(
  hsl(${hslHandle}, 100%, 62%) 0deg ${intervalLimit}deg,
  transparent ${intervalLimit}deg 360deg
)`
                intervalLimit += 5;
            } else {
                clearInterval(intervalLimit);
            }
        }, 20)

    }// 함수 끝부분


// 모달 오픈시 가동 openModal 함수 안에서 작동함
    function isModalOpen() {
        totalTime = JSON.parse(localStorage.getItem('totalTime'));
        let completedCount = JSON.parse(localStorage.getItem('completedDeleteCount'));
        let questionCount = JSON.parse(localStorage.getItem('questionCount'));

        console.log(questionCount);
        // 총 시간을 분으로 환산
        totalTime.hours = 2; // 테스트위해 2시간 추가해둠
        const newTime = (totalTime.hours * 60) + totalTime.minutes;
        let percentOfTime = (newTime / goalTime) * 100;

        percentOfTime = percentOfTime > 100 ? percentOfTime = 100 : Math.floor(percentOfTime);

        // 오늘 공부게이지 퍼센트 텍스트 반영
        textOfPercent(percentOfTime, 10);
        // 게이지 차는 애니메이션
        setTimeout(() => $fillGauge.style.width = `${percentOfTime}%`, 300);

        if (totalTime.hours > 0) {
            $gaugeMessage.textContent = `${totalTime.hours}시간 ${totalTime.minutes}분 공부했어요!`;
        } else {
            $gaugeMessage.textContent = `${totalTime.minutes}분 공부했어요!`;
        }

        // 업적 데이터 반영
        //circle1
        gradeMaker(questionCount, $questionAc);
        gradeStat(questionCount, $question, $circle1);

        //circle2
        gradeMaker(completedCount, $plannerAc);
        gradeStat(completedCount, $planner, $circle2);

        //circle3
        gradeMaker(totalTime.hours, $studyTimeAc);
        gradeStat(totalTime.hours, $studyTime, $circle3);

        //단계설정
        //  0개  20개 40개 60개이상
        //  C     B     A     S
        //    0/20  n/20  n/40  n/60


    }

    openModal();
    closeModal();
}