export function flipCard(dataValue) {
    const cards = [...document.querySelectorAll('.achieve-card')];
    const backsideCards = [...document.querySelectorAll('.backside')];
    const backsideTexts = [...document.querySelectorAll('.backside-text')];
    const infoBoxes = [...document.querySelectorAll('.achieve-infobox')];
    const $achieveImgs = [...document.querySelectorAll('.achieve-img')];
    const $achieveValues = [...document.querySelectorAll('.achieve-value')];
    let timeout = null;
    let flip = false;
    cards.forEach((card, index) => {
        card.dataset.flipped = 'false';
        card.dataset.animating = 'false';
        card.addEventListener('click', e => {
            // 트랜지션 중이면 클릭 무시
            if (card.dataset.animating === 'true') return;

            // 트랜지션 시작
            card.classList.add('active');
            card.dataset.animating = 'true';
            if (card.dataset.flipped === 'false') {

                backsideCards[index].style.color = 'var(--usercard-bg)';
                backsideCards[index].style.fontSize = '2rem';
                timeout = setTimeout(() => {
                infoBoxes[index].classList.add('hide');
                $achieveValues[index].classList.add('hide');
                $achieveImgs[index].classList.add('hide');
                    backsideCards[index].classList.remove('hide');
                    card.dataset.flipped = 'true';
                    timeout = setTimeout(() => {
                        card.classList.remove('active');
                        card.dataset.animating = 'false';
                        clearTimeout(timeout);
                    }, 250)
                }, 120);
            } else {


                backsideCards[index].style.color = 'transparent';
                backsideCards[index].style.fontSize = '0.5rem';

                timeout = setTimeout(() => {
                backsideCards[index].classList.add('hide');
                $achieveValues[index].classList.remove('hide');
                infoBoxes[index].classList.remove('hide');
                $achieveImgs[index].classList.remove('hide');
                    card.dataset.flipped = 'false';
                    timeout = setTimeout(() => {
                        card.classList.remove('active');
                        card.dataset.animating = 'false';
                        clearTimeout(timeout);
                    }, 250)
                }, 250);

            }
        })


    })

}