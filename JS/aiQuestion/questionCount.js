

// ai에게 질문한 횟수를 저장하는 함수
export function questionCount() {
    // 기존 질문 갯수를 가져오고 기존 질문이 없으면 기본값으로 0을 사용
    const questionCount = Number(localStorage.getItem('questionCount')) || 0;

    // 새로운 질문 갯수를 기존 개수에 더하기
    const totalCount = questionCount + 1;

    // 누적된 개수를 로컬스토리지에 저장
    localStorage.setItem('questionCount', totalCount);


}