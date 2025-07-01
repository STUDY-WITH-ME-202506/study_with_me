

// 완료된 항목 삭제 시 누적 개수를 로컬스토리지에 저장하는 함수
export function saveDeletedCount (count) {

    // 기존에 저장된 삭제 개수를 문자열로 가져오고, 숫자로 변환, 없으면 기본값으로 0을 사용
    const prevCount = Number(localStorage.getItem('completedDeleteCount')) || 0;

    // 새로 삭제한 개수를 기존 개수에 더해서 누적 합계 계산
    const newTotal = prevCount + count;

    // 누적된 개수를 다시 문자열로 변환해 로컬스토리지에 저장
    localStorage.setItem('completedDeleteCount', newTotal);
}

