// 명언 랜덤 API
export async function loadQuote() {
    // #quoteModal 안의 요소들만 선택하도록 수정
    const nameEl = document.querySelector('#quoteModal .quote-name');
    const profileEl = document.querySelector('#quoteModal .quote-profile');
    const textEl = document.querySelector('#quoteModal .quote-text');

    try {

        const res = await fetch('https://korean-advice-open-api.vercel.app/api/advice');
        if (!res.ok) throw new Error('API 요청 실패');
        const data = await res.json();
        nameEl.textContent = data.author || '작자 미상';
        profileEl.textContent = data.authorProfile || '';
        textEl.textContent = data.message || '좋은 하루 보내세요!';
    } catch (err) {
        console.error(err);
        nameEl.textContent = '';
        profileEl.textContent = '';
        textEl.textContent = '명언을 불러오지 못했어요 🧐';
    }
}

