export function flipCard(dataValue) {

    const cards =[... document.querySelectorAll('.achieve-card')];
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });
}