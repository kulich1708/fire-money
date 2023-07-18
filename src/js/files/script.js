// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { modules } from "./modules.js";

window.mainPath = '/fire-money/'

let windowWidth = document.documentElement.clientWidth
window.addEventListener('resize', () => {
	windowWidth = document.documentElement.clientWidth
	if (windowWidth >= 768) {
		document.documentElement.classList.remove('menu-open');
	}
});

window.allMonth = 'января, февраля, марта, апреля, мая, июня, июля, августа, сентября, октября, ноября, декабря'.split(', ')
const itemsSuggestions = document.querySelectorAll('.item-suggestions');
let suggestionsData = [
	{ term: 7, period: 'day', precent: 0.4, sum: 15000 },
	{ term: 1, period: 'month', precent: 5, sum: 25000 },
	{ term: 1, period: 'year', precent: 15, sum: 45000 },
]
for (let i = 0; i < itemsSuggestions.length; i++) {
	let date = new Date();
	switch (suggestionsData[i].period) {
		case 'day':
			date.setDate(date.getDate() + suggestionsData[i].term);
			break;
		case 'week':
			date.setDate(date.getDate() + suggestionsData[i].term * 7);
			break;
		case 'month':
			date.setMonth(date.getMonth() + suggestionsData[i].term);
			break;
		case 'year':
			date.setFullYear(date.getFullYear() + suggestionsData[i].term);
			break;
		default:
			continue;
	}
	let dateReturn = date.getDate() + ' ' + allMonth[date.getMonth()] + ' ' + date.getFullYear();
	itemsSuggestions[i].querySelector('.item-suggestions__row_date-return .item-suggestions__value').innerHTML = dateReturn;
	let sumReturn = moneyFormat.to(suggestionsData[i].sum * ((1 + suggestionsData[i].precent / 100) ** suggestionsData[i].term))

	itemsSuggestions[i].querySelector('.item-suggestions__row_return .item-suggestions__value').innerHTML = sumReturn;

};
const inputMaxLength = document.querySelectorAll('*[maxlength]');
inputMaxLength.forEach(e => {
	let oneKeyUpFunc = e.hasAttribute('onkeyup') ? e.hasAttribute('onkeyup') + ';testJump(this);' : 'testJump(this)';
	e.setAttribute('onkeyup', oneKeyUpFunc)
})
window.addEventListener('resize', e => {
	setAttributeShowmore()
})
setAttributeShowmore()
function setAttributeShowmore() {
	const showmoreContent = document.querySelector('.content-approval__items');
	if (showmoreContent) {
		let scrollWidth = document.documentElement.scrollWidth
		if (scrollWidth >= 320) showmoreContent.setAttribute('data-showmore-content', 8)
		if (scrollWidth >= 768) showmoreContent.setAttribute('data-showmore-content', 4)
		if (scrollWidth >= 992) showmoreContent.setAttribute('data-showmore-content', 3)
		if (scrollWidth >= 1116) showmoreContent.setAttribute('data-showmore-content', 2)

	}
}

function hiddenTimeout() {
	const hiddenBlocksTimeout = document.querySelectorAll('[data-timeout]');
	for (const hiddenBlockTimeout of hiddenBlocksTimeout) {
		hiddenBlockTimeout.style.display = 'none'
		hiddenBlockTimeout.hidden = true
		function cancelHidden() {
			setTimeout(() => {
				hiddenBlockTimeout.style.removeProperty('display')
				hiddenBlockTimeout.hidden = false

			}, hiddenBlockTimeout.getAttribute('data-timeout'));
		}
		if (hiddenBlockTimeout.hasAttribute('data-from-slider')) {
			applicationSlider.on('transitionEnd', function () {
				if (hiddenBlockTimeout.closest('.swiper-slide-active')) cancelHidden();
			})
		} else {
			cancelHidden()
		}
	}

}
window.addEventListener('load', hiddenTimeout)
function dataFilling(e = false) {
	const dataUser = JSON.parse(localStorage.getItem('fire-money'))
	for (let i = 0; i < Object.keys(dataUser).length; i++) {
		let keys = Object.keys(dataUser)
		let values = Object.values(dataUser)
		let elementsForm = document.querySelectorAll(`[name="${keys[i]}"]`)
		if (!e) {
			if (elementsForm) {
				elementsForm.forEach(e => {
					if (!e.hasAttribute('data-dont-remember')) {
						e.value = values[i]
					}
				})
			}
		}
		let elementsBlock = document.querySelectorAll(`.user-${keys[i]}`)
		if (elementsBlock.length) {
			elementsBlock.forEach(e => {
				e.innerHTML = values[i]
			})
		}
	}
	let headerActionsBlock = document.querySelector('.header__actions')

	if (headerActionsBlock) {
		if (dataUser.login == 'true') headerActionsBlock.classList.add('header__actions_register')
		else headerActionsBlock.classList.remove('header__actions_register')
	}
	if (dataUser.login != 'true' && (location.href.split('/').includes('cabinet.html') || location.href.split('/').includes('approval.html'))) location.pathname = mainPath + 'index.html'

	localStorage.setItem('fire-money', JSON.stringify(dataUser))
}
dataFilling()
const allFormsPage = document.forms;
for (const form of allFormsPage) {
	form.addEventListener('submit', e => {
		setTimeout(() => {
			dataFilling(e)
		}, 100);
	})
}
const cabinetOut = document.querySelector('.cabinet-header__icon');
if (cabinetOut) {
	cabinetOut.addEventListener('click', e => {
		e.preventDefault()
		const dataUser = JSON.parse(localStorage.getItem('fire-money'))
		dataUser.login = 'false'
		localStorage.setItem('fire-money', JSON.stringify(dataUser))
		dataFilling()
	})
}