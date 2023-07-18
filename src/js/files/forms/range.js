// Подключение из node_modules
//import { date } from 'gulp-util';
import * as noUiSlider from 'nouislider';
//import { create } from 'vinyl-ftp';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	window.moneyFormat = wNumb({
		mark: '.',
		thousand: ' ',
		suffix: ' ₽',
		decimals: 0,
	});
	window.addEventListener('load', e => {
		function positioningTooltips(slider) {
			const sliderTooltips = slider.noUiSlider.getTooltips()
			sliderTooltips.forEach(sliderTooltip => {
				const basePositionLeft = slider.noUiSlider.getOrigins()[0].closest('.noUi-base').getBoundingClientRect().left
				const basePositionRight = slider.noUiSlider.getOrigins()[0].closest('.noUi-base').getBoundingClientRect().right

				const tooltipStyleLeft = sliderTooltip.style.left.split(/ . /)

				if (sliderTooltip.getBoundingClientRect().left - basePositionLeft < sliderTooltip.offsetWidth / 2) {
					const newValue = parseFloat(tooltipStyleLeft[1]) + (basePositionLeft - sliderTooltip.getBoundingClientRect().left)

					if (newValue >= 0) sliderTooltip.style.left = [tooltipStyleLeft[0], tooltipStyleLeft[1].replace(parseFloat(tooltipStyleLeft[1]), newValue)].join(' + ')
					else sliderTooltip.style.left = [tooltipStyleLeft[0], -tooltipStyleLeft[1].replace(parseFloat(tooltipStyleLeft[1]), newValue)].join(' - ')
				} else if (-(sliderTooltip.getBoundingClientRect().right - basePositionRight) < sliderTooltip.offsetWidth / 2) {
					const newValue = parseFloat(tooltipStyleLeft[1]) - (basePositionRight - sliderTooltip.getBoundingClientRect().right)

					if (newValue >= 0) sliderTooltip.style.left = [tooltipStyleLeft[0], tooltipStyleLeft[1].replace(parseFloat(tooltipStyleLeft[1]), newValue)].join(' - ')
					else sliderTooltip.style.left = [tooltipStyleLeft[0], -tooltipStyleLeft[1].replace(parseFloat(tooltipStyleLeft[1]), newValue)].join(' + ')
				}
				else {
					sliderTooltip.style.left = "calc(50% + 0px)"
				}
			});
		}
		const sumSlider = document.querySelector('#sum');
		if (sumSlider) {
			let textFrom = sumSlider.getAttribute('data-from');
			let textTo = sumSlider.getAttribute('data-to');
			noUiSlider.create(sumSlider, {
				start: 20000, // [0,200000]
				// connect: [true, false],
				tooltips: [moneyFormat],
				connect: 'lower',
				range: {
					'min': [1000],
					'max': [100000]
				},
				pips: {
					mode: 'count', values: 16, density: 1.25,
					format: moneyFormat,
				},
				behaviour: "drag",
			});
			const tooltips = sumSlider.noUiSlider.getTooltips()
			tooltips.forEach(tooltip => {
				tooltip.style.left = `calc(50% + 0px)`
			});
			sumSlider.noUiSlider.on('update', () => {
				let sumSliderValue = sumSlider.noUiSlider.get()
				document.querySelector('.info-credit__item_sum .info-credit__value').innerHTML = moneyFormat.to(parseInt(sumSliderValue));
				document.querySelector('.info-credit__item_return .info-credit__value').innerHTML = moneyFormat.to(parseInt(sumSliderValue) + 5650);
				positioningTooltips(sumSlider)
			})
			/*
			const priceStart = document.getElementById('price-start');
			const priceEnd = document.getElementById('price-end');
			priceStart.addEventListener('change', setPriceValues);
			priceEnd.addEventListener('change', setPriceValues);
			*/
			function setPriceValues() {
				let priceStartValue;
				let priceEndValue;
				if (priceStart.value != '') {
					priceStartValue = priceStart.value;
				}
				if (priceEnd.value != '') {
					priceEndValue = priceEnd.value;
				}
				priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
			}
		}
		const termSlider = document.querySelector('#term');
		if (termSlider) {
			let textFrom = termSlider.getAttribute('data-from');
			let textTo = termSlider.getAttribute('data-to'); var valuesSlider = document.getElementById('values-slider');



			noUiSlider.create(termSlider, {
				start: 30, // [0,200000]
				// connect: [true, false],
				tooltips: [wNumb({ decimals: 0, suffix: ' дней' })],
				connect: 'lower',
				range: {
					'min': [3],
					'max': [30]
				},
				pips: { mode: 'count', values: 16, density: 1.25 },
				behaviour: "drag",
			});
			const tooltips = termSlider.noUiSlider.getTooltips()
			tooltips.forEach(tooltip => {
				tooltip.style.left = `calc(50% + 0px)`
			});
			termSlider.noUiSlider.on('update', () => {
				let termSliderValue = parseInt(termSlider.noUiSlider.get())
				let dateNow = new Date();
				dateNow.setDate(dateNow.getDate() + termSliderValue)
				let dateReturn = dateNow.getDate() + ' ' + allMonth[dateNow.getMonth()] + ' ' + dateNow.getFullYear()
				document.querySelector('.info-credit__item_date-return .info-credit__value').innerHTML = dateReturn;
				positioningTooltips(termSlider)
			})
			/*
			const priceStart = document.getElementById('price-start');
			const priceEnd = document.getElementById('price-end');
			priceStart.addEventListener('change', setPriceValues);
			priceEnd.addEventListener('change', setPriceValues);
			*/
			function setPriceValues() {
				let priceStartValue;
				let priceEndValue;
				if (priceStart.value != '') {
					priceStartValue = priceStart.value;
				}
				if (priceEnd.value != '') {
					priceEndValue = priceEnd.value;
				}
				priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
			}
		}
		// Получаем количество шагов заявки
		let quantSlide = document.querySelectorAll('.page__slide.swiper-slide').length;
		function setProgressSlider(sliderName) {

			// Получаем элементы для вставки шагов
			const steps = document.querySelectorAll('.swiper-slide-active .progress-form__text span');
			// Получаем номер текущего шага
			window.currentSlideIndex = document.querySelectorAll('.swiper-slide')
			currentSlideIndex.forEach((e, i) => { if (e.classList.contains('swiper-slide-active')) currentSlideIndex = i });
			if (currentSlideIndex !== 0) {
				document.querySelector('.header').classList.add('header_min');
			}
			if (steps) {
				// Устанавливаем текущий шаг заявки
				steps[0].innerHTML = currentSlideIndex + 1
				// Устанавливаем количество шагов заявки
				steps[1].innerHTML = quantSlide

			}

			// Подсчёт прогресса для каждого шага заявки
			let progress = 100 / quantSlide * currentSlideIndex
			// Вставляем значение
			const progressBottom = document.querySelector('.swiper-slide-active .slider-progress__bottom span')
			if (progressBottom) {
				progressBottom.innerHTML = Math.round(100 / quantSlide);
			}
			// Вставляем значение
			const progressSubtitle = document.querySelector('.swiper-slide-active .top-content__subtitle span')
			if (progressSubtitle) {
				progressSubtitle.innerHTML = Math.round(100 / quantSlide * (currentSlideIndex + 1)) + '%';
			}

			// Переменная прогресса текущего шага
			let progressPage = 0

			// Все элементы форм в заявки
			let form = document.querySelector('.swiper-slide-active form')
			let formElements = form ? Array.from(form.elements) : null
			if (formElements) {
				// Фильтр элементов форм
				formElements = formElements.filter(e => {
					// Вырезаем элементы button
					if (e.tagName == 'BUTTON');
					// Вырезаем необязательные Input
					else if (e.tagName == 'INPUT' && !e.hasAttribute('data-required'));
					else return e
				})
				let spollers = document.querySelectorAll('form .spollers__item');
				for (let i = 0; i < spollers.length; i++) {
					const spoller = spollers[i];
					let formElementsSpoller = formElements.filter(e => spoller.contains(e))
					const spollerProgress = spoller.querySelector('.title-spollers__progress')
					if (spollerProgress) {
						spollerProgress.innerHTML = Math.round(100 / quantSlide / formElements.length * formElementsSpoller.length) + '%'
					}

				}
				// Проверка заполнения полей для прогресса
				formElements.forEach((e, i) => {
					if (e.tagName == 'INPUT' && e.type != 'checkbox' && e.value != '' ||
						e.tagName == 'INPUT' && e.type == 'checkbox' && e.checked ||
						e.tagName == 'SELECT' && e.hasAttribute('multiple') && e.querySelector('[selected="selected"]') ||
						e.tagName == 'SELECT' && !e.hasAttribute('multiple') && e.closest('.select').querySelector('.select__title')) {
						progressPage += 100 / quantSlide / formElements.length
					}
				})
				// Устанавливаем слайдер на нужное значение
				sliderName.noUiSlider.set(progress + progressPage)

			} else sliderName.noUiSlider.set(progress)

		}
		const progressSliders = document.querySelectorAll('.slider-progress__content');
		if (progressSliders.length) {
			for (let i = 0; i < progressSliders.length; i++) {
				let progressSlider = progressSliders[i]
				noUiSlider.create(progressSlider, {
					start: 0,
					connect: 'lower',
					range: {
						'min': [0],
						'max': [100]
					},
					behaviour: "drag",
					pips: {
						mode: 'count',
						density: 1.4,
						values: quantSlide + 1,
					}
				});
				setProgressSlider(progressSlider);
				document.documentElement.addEventListener('click', e => {
					if (e.target.closest('.select')) {
						setTimeout(() => { setProgressSlider(progressSlider) }, 100);
					}
				})
				applicationSlider.on('transitionEnd', function () {
					setProgressSlider(progressSlider)
				});
				let forms = document.forms
				for (let i = 0; i < forms.length; i++) {
					const formElements = forms[i].elements;
					for (let i = 0; i < formElements.length; i++) {
						const formElement = formElements[i];
						formElement.addEventListener('change', e => { setProgressSlider(progressSlider) })
					}
				}

			}
		}
		const progressSlidersLigth = document.querySelectorAll('.top-content__slider');
		if (progressSlidersLigth.length) {
			for (let i = 0; i < progressSlidersLigth.length; i++) {
				let progressSliderLigth = progressSlidersLigth[i]
				noUiSlider.create(progressSliderLigth, {
					start: 0,
					connect: 'lower',
					range: {
						'min': [0],
						'max': [100]
					},
					behaviour: "drag",
				});
				setProgressSlider(progressSliderLigth)
				document.documentElement.addEventListener('click', e => {
					if (e.target.closest('.select')) {
						setTimeout(() => { setProgressSlider(progressSliderLigth) }, 100);
					}
				})
				applicationSlider.on('transitionEnd', function () {
					setProgressSlider(progressSliderLigth)
				});
				let forms = document.forms
				for (let i = 0; i < forms.length; i++) {
					const formElements = forms[i].elements;
					for (let i = 0; i < formElements.length; i++) {
						const formElement = formElements[i];
						formElement.addEventListener('change', e => { setProgressSlider(progressSliderLigth) })
					}
				}
			}
		}
		const smsSwitch = document.querySelector('#sms-switch');
		if (smsSwitch) {
			noUiSlider.create(smsSwitch, {
				start: 0,
				range: {
					'min': [0, 1],
					'max': 1
				},
				format: wNumb({
					decimals: 0
				}),
				behaviour: "drag",
			});
			function setSwitch(pos) {
			}
			smsSwitch.addEventListener('click', e => {
				let pos = smsSwitch.noUiSlider.get()
				smsSwitch.noUiSlider.set(pos == 0 ? 1 : 0)
				pos == 0 ? smsSwitch.classList.add('switch-on') : smsSwitch.classList.remove('switch-on')
			})
		}
		//positioningTooltips(termSlider)

	})


}
rangeInit();
