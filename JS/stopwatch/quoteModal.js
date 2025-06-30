import {loadQuote} from './quoteAPI.js'; // 명언 API 연결

// 모달 열고 닫는 함수
export function quoteModal () {

    // 모달 DOM 가져오기
    const openBtn = document.getElementById('openQuoteModal');
    const closeBtn = document.getElementById('closeQuoteModal');
    const modal = document.getElementById('quoteModal');


// 모달 열기 버튼
    openBtn.addEventListener('click', () => {

        modal.style.display = 'flex';

        loadQuote() // API 연결 함수
    });
// 모달 닫기 버튼
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

// 바깥 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        // 모달이 열려있고(flex), 눌린 키가 'Escape'일 경우
        if (modal.style.display === 'flex' && e.key === 'Escape') {
            modal.style.display = 'none'; // 모달을 닫습니다.
        }
    });
}