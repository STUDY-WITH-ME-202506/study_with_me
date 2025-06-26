// 명언 랜덤 API
export async function loadQuote() {

    const nameEl = document.querySelector('.quote-name');
    const profileEl = document.querySelector('.quote-profile');
    const textEl = document.querySelector('.quote-text');

    try {
        const res = await fetch('https://korean-advice-open-api.vercel.app/api/advice');
        const data = await res.json();

        nameEl.textContent = data.author || '작자 미상';
        profileEl.textContent = data.authorProfile || '';
        textEl.textContent = data.message || '좋은 하루 보내세요!';
    } catch (err) {
        nameEl.textContent = '에러 발생';
        profileEl.textContent = '';
        textEl.textContent = '명언을 불러오지 못했어요 🧐';
    }
}
