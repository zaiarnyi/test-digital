function slider() {
	const wrapperSlider = document.querySelector('.home__slider'),
		slidesParent = wrapperSlider.querySelector('.slider-home'),
		slides = wrapperSlider.querySelectorAll('.slider-home__slide'),
		prevBtn = document.querySelector('.info-home__pagination_prev'),
		nextBtn = document.querySelector('.info-home__pagination_next'),
		currentSlide = document.querySelector('.info-home__current'),
		allSlides = document.querySelector('.info-home__all'),
		widthWrapper = wrapperSlider.clientWidth;

	let slideIndex = 1,
		offset = 0;

	if (slides.length < 10) {
		allSlides.textContent = `0${slides.length}`;
		currentSlide.textContent = `0${slideIndex}`;
	} else {
		allSlides.textContent = `${slides.length}`;
		currentSlide.textContent = `${slideIndex}`;
	}

	slidesParent.style.width = 100 * slides.length + '%';

	slides.forEach((item) => {
		item.style.width = widthWrapper + 'px';
	});

	nextBtn.addEventListener('click', () => {
		if (offset == widthWrapper * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += widthWrapper;
		}
		slidesParent.style.transform = `translateX(-${offset}px)`;
		slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;
		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = `${slideIndex}`;
		}
	});

	prevBtn.addEventListener('click', () => {
		if (offset == 0) {
			offset = widthWrapper * (slides.length - 1);
		} else {
			offset -= widthWrapper;
		}
		slidesParent.style.transform = `translateX(-${offset}px)`;
		slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;
		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = `${slideIndex}`;
		}
	});
}
window.addEventListener('resize', slider);
slider();

var ua = window.navigator.userAgent;
var msie = ua.indexOf('MSIE ');
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	},
};
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src =
		'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

let unlock = true;

//=================
//Menu
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener('click', function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		}
	});
}
function menu_close() {
	let iconMenu = document.querySelector('.icon-menu');
	let menuBody = document.querySelector('.menu__body');
	iconMenu.classList.remove('_active');
	menuBody.classList.remove('_active');
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector('body');
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector('body');
	if (unlock) {
		let lock_padding = document.querySelectorAll('._lp');
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove('_lock');
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector('body');
	if (unlock) {
		let lock_padding = document.querySelectorAll('._lp');
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight =
				window.innerWidth -
				document.querySelector('.wrapper').offsetWidth +
				'px';
		}
		body.style.paddingRight =
			window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add('_lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
