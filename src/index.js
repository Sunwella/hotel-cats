import './styles/index.less'

document.addEventListener('DOMContentLoaded', function() {
	const $sliders = document.querySelectorAll('.js-slider');

	//реализация методов сдвига слайдов, добавления/удаления класса для точек навигации
	$sliders.forEach($slider => {
		const $slides = $slider.querySelectorAll('.js-slide');
		const $containersSlides = $slider.querySelectorAll('.js-slides');
		const $dots = $slider.querySelectorAll('.js-slider-dot');
		const $btnPrev = $slider.querySelector('.js-nav-prev');
		const $btnNext = $slider.querySelector('.js-nav-next');

		let $currentActiveDot = $slider.querySelector('.js-slider-dot.active');
		let $newActiveDot;
		let slideWidth;


		const sliderTransform = $activeDot => {
			$containersSlides.forEach($containerSlides => {
				let indexActiveDot = Number($activeDot.dataset.index);
				if (indexActiveDot !== 1) {
					if (Number($containerSlides.dataset.fluid) === 1) {
						let changeSlide = $containerSlides.clientWidth * (indexActiveDot - 1);
						$containerSlides.style.transform = `translateX(-${changeSlide}px)`;
					} else {
						let containerCoordinates = $containerSlides.getBoundingClientRect();
						let containerLeftCoordinate = containerCoordinates.x;
						let nextSlideCoordinates = $slides[indexActiveDot - 1].getBoundingClientRect();
						let nextSlideLeftCoordinate = nextSlideCoordinates.x;
						$containerSlides.style.transform = `translateX(-${nextSlideLeftCoordinate - containerLeftCoordinate}px)`;
					}
				} else {
					$containerSlides.style.transform = 'translateX(0px)';
				}
			})
		}

		const setActiveDot = $dot => {
			$dots.forEach($dot => {
				$dot.classList.remove('active');
			});
			$dot.classList.add('active');
			$currentActiveDot = $dot;
			sliderTransform($currentActiveDot);
		}

		const setActiveDotByIndex = index => {
			$newActiveDot = $slider.querySelector(`.js-slider-dot[data-index="${index}"]`);

			setActiveDot($newActiveDot);
		}

		const getActiveDotIndex = () => {
			return Number($currentActiveDot.dataset.index);
		}

		$btnPrev.onclick = () => {
			let currentActiveDotIndex = getActiveDotIndex();

			if (currentActiveDotIndex === 1) {
				currentActiveDotIndex = $dots.length;
			} else {
				currentActiveDotIndex -= 1;
			} 

			setActiveDotByIndex(currentActiveDotIndex);
		};

		$btnNext.onclick = () => {
			let currentActiveDotIndex = getActiveDotIndex();

			if (currentActiveDotIndex === $dots.length) {
				currentActiveDotIndex = 1;
			} else {
				currentActiveDotIndex += 1;
			}

			setActiveDotByIndex(currentActiveDotIndex);
		};

		$dots.forEach($dot => {
			$dot.onclick = () => {
				setActiveDot($dot);
			};
		});
	});

	//страница номеров 
	//кнопка сортировки и выпадающий список
	const $btnSort = document.querySelector('.js-sort-button');
	const $btnDirectetionImg = $btnSort.querySelector('.sort');
	const $btnTitle = $btnSort.querySelector('.js-btnTitle');
	const $dropdownMenu = document.querySelector('.js-dropdown-menu');
	const $dropdownOptions = document.querySelectorAll('.js-dropdown-option');

	const toggleDropdown = function () {
		$btnSort.classList.toggle('hidden');
		$dropdownMenu.classList.toggle('hidden');
	}

	$btnSort.onclick = toggleDropdown;

	$dropdownOptions.forEach($option => {
		$option.onclick = () => {
			let optionDirection = $option.querySelector('.sort').src;
			let optionTitle = $option.querySelector('.js-optionTitle').innerHTML;

			$btnDirectetionImg.src = optionDirection;
			$btnTitle.innerHTML = optionTitle;
			
			toggleDropdown();
		}
	});


	//всплывающая подсказка
	const $tooltips = document.querySelectorAll('.js-tooltip');
	let shownTooltip;
	$tooltips.forEach($tooltip => {
		$tooltip.onmouseover = () => {
			shownTooltip = createTooltip($tooltip);
		}
		$tooltip.onmouseout = () => {
			if (shownTooltip) {
				shownTooltip.remove();
				shownTooltip = null;
			}
		}
	});
	const createTooltip = $tooltip => {
		let tooltipElem = document.createElement('div');
		tooltipElem.className = 'tooltip';
		if ($tooltip.dataset.index === '1') {
			tooltipElem.className = 'tooltip-right';
		}
		tooltipElem.innerHTML = $tooltip.dataset.tooltip;
		$tooltip.after(tooltipElem);
		let coords = $tooltip.getBoundingClientRect();
		let top = coords.top + pageYOffset - tooltipElem.offsetHeight - 20;
		let left = coords.left - tooltipElem.offsetWidth / 2 + 20;
		if ($tooltip.dataset.index === '1') {
			left = coords.left - tooltipElem.offsetWidth / 2 - 20;
		}
		tooltipElem.style.left = left + 'px';
		tooltipElem.style.top = top + 'px';
		return tooltipElem;
	};
});
//end




