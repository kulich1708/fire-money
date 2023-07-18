
function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	if (clock) {
		var daysSpan = clock.querySelector('.days');
		var hoursSpan = clock.querySelector('.hours');
		var minutesSpan = clock.querySelector('.minutes');
		var secondsSpan = clock.querySelector('.seconds');
		const countdownNum = document.querySelector('.countdown-number');
		if (daysSpan && daysSpan.hasAttribute('data-span')) daysSpan = daysSpan.querySelectorAll('span')
		if (hoursSpan && hoursSpan.hasAttribute('data-span')) { hoursSpan = hoursSpan.querySelectorAll('span'); console.log(hoursSpan) }
		if (minutesSpan && minutesSpan.hasAttribute('data-span')) minutesSpan = minutesSpan.querySelectorAll('span')
		if (secondsSpan && secondsSpan.hasAttribute('data-span')) secondsSpan = secondsSpan.querySelectorAll('span')
		if (countdownNum) {
			countdownNum.classList.add('_active')
			const clockLink = clock.querySelector('a');
			if (clockLink) {
				clockLink.classList.remove('_active')
			}

		}
	}

	function updateClock() {
		var t = getTimeRemaining(endtime);

		if (daysSpan) {
			if (daysSpan.constructor.name == 'NodeList') {
				daysSpan.forEach((element, item) => {
					element.innerHTML = t.days.split('')[item]
				});
			} else {
				daysSpan.innerHTML = t.days;
			}
		}
		if (hoursSpan) {
			if (hoursSpan.constructor.name == 'NodeList') {
				hoursSpan.forEach((element, item) => {
					element.innerHTML = ('0' + t.hours).slice(-2).split('')[item]
				});
			} else {
				hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			}
		}
		if (minutesSpan) {
			if (minutesSpan.constructor.name == 'NodeList') {
				minutesSpan.forEach((element, item) => {
					element.innerHTML = ('0' + t.minutes).slice(-2).split('')[item]
				});
			} else {
				minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			}
		}
		if (secondsSpan) {
			if (secondsSpan.constructor.name == 'NodeList') {
				secondsSpan.forEach((element, item) => {
					element.innerHTML = ('0' + t.seconds).slice(-2).split('')[item]
				});
			} else {
				secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
			}
		}

		if (t.total <= 0) {
			clearInterval(timeinterval);
			clock.querySelector('.countdown-number').classList.remove('_active')
			clock.querySelector('a').classList.add('_active')
			clock.querySelector('a').addEventListener('click', e => {
				let deadline = new Date(Date.parse(new Date()) + 59 * 1000);
				initializeClock('countdown', deadline);
				e.preventDefault()
			})
		}
	}

	updateClock();
	let timeinterval = setInterval(updateClock, 1000);
}
window.addEventListener('load', e => {
	document.documentElement.addEventListener('click', e => {
		if (typeof applicationSlider !== 'undefined') {
			applicationSlider.on('transitionEnd', () => {
				let deadline = new Date(Date.parse(new Date()) + 59 * 1000); // for endless timer
				if (document.querySelector('.swiper-slide-active #countdown')) initializeClock('countdown', deadline);
			})
		}
	})
})
let deadlineMain = new Date(Date.parse(new Date()) + 3 * 60 * 60 * 1000)
initializeClock('countdown-main', deadlineMain)