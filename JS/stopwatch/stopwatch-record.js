export function saveTime(elapsedSaveTime){ // 스톱워치 로컬 저장 함수

    //  ms 시 분 초로 변환
    const addedHours = Math.floor(elapsedSaveTime / 3600000);
    const addedMinutes = Math.floor((elapsedSaveTime % 3600000) / 60000);
    const addedSeconds = Math.floor((elapsedSaveTime % 60000) / 1000);

    // 기존 누적 시간 가져오기
    const saved = JSON.parse(localStorage.getItem('totalTime')) || {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    // 시, 분, 초 합산
    let totalSeconds = saved.seconds + addedSeconds;
    let totalMinutes = saved.minutes + addedMinutes + Math.floor(totalSeconds / 60);
    let totalHours = saved.hours + addedHours + Math.floor(totalMinutes / 60);

    // 자리 올림
    totalSeconds = totalSeconds % 60;
    totalMinutes = totalMinutes % 60;

    const updated = {
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds
    };

    // 로컬스토리지에 저장
    localStorage.setItem('totalTime', JSON.stringify(updated));

}
