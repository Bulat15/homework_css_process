const wordElement = document.querySelector('#word-form');
const searchElement = document.querySelector('#search-form');
const cardsElement = document.querySelector('#cards');

let cardValues = [];

function render(list) {
	cardsElement.innerHTML = '';

	for (let elem of list) {
		let card = document.createElement('div');
		let close = document.createElement('div');
		let p = document.createElement('p');

		// close.addEventListener('click', function () {
		// 	cardValues.splice(cardValues.findIndex((e) => e.word === elem.word), 1);
		// 	card.remove();
		// });
		close.addEventListener('click', () => 
			card.remove());

		p.classList.add('text');
		card.classList.add('card');
		close.classList.add('close');
		card.append(p, close);

		p.innerText = elem.word;
		card.style.backgroundColor = elem.color;
		close.innerText = 'Х';

		card.addEventListener('dblclick', () => {
			if (p.innerText === wordElement.word.value) {
				p.innerText = elem.translation;
			} else {
				p.innerText = wordElement.word.value;
			}
		});

		cardsElement.append(card);
	}
}

wordElement.addEventListener('submit', function (event) {
	event.preventDefault();
	if (cardValues.findIndex((elem) => elem.word === this.word.value) >= 0) {
		alert('Слово уже существует');
		return;
	}
	cardValues.push({
		word: this.word.value,
		translation: this.translation.value,
		color: this.color.value
	});
	render(cardValues);
});

searchElement.addEventListener('submit', function (event) {
	event.preventDefault();
	render(cardValues.filter((elem) => this.search.value === '' || elem.word === this.search.value));
});