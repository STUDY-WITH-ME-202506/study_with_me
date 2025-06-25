export function playTime() {

// ================= 변수 선언부 ================//

    const $openModal = document.getElementById('modal-btn');
    const $userCard = document.getElementById('user-card');
    const $cardOverlay = document.getElementById('card-overlay');
    const $closeCard = document.getElementById('close-card-btn');
    const $fillGauge = document.getElementById('fill-gauge');
    const $gaugeMessage = document.querySelector('.gauge-message.bottom');


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
        function textOfPercent(percent,timeout) {
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




// 모달 오픈시 가동 openModal 함수 안에서 작동함
    function isModalOpen() {
        totalTime = JSON.parse(localStorage.getItem('totalTime'));
        // 총 시간을 분으로 환산
        // totalTime.hours = 1; // 테스트위해 2시간 추가해둠
        const newTime = (totalTime.hours * 60) + totalTime.minutes;
        const percentOfTime = Math.floor((newTime / goalTime) * 100)

        // 오늘 공부게이지 퍼센트 텍스트 반영
        textOfPercent(percentOfTime,10);
        // 게이지 차는 애니메이션
        setTimeout(() => $fillGauge.style.width = `${percentOfTime}%`,300);

        if(totalTime.hours > 0) {
            $gaugeMessage.textContent = `${totalTime.hours}시간 ${totalTime.minutes}분 공부했어요!`;
        }else{
            $gaugeMessage.textContent = `${totalTime.minutes}분 공부했어요!`;
        }

    }


    openModal();
    closeModal();


}