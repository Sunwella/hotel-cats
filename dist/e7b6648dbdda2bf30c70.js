import './styles/index.less'; //реализация методов сдвига слайдов, добавления/удаления класса для точек навигации

document.addEventListener('DOMContentLoaded', function () {
  var $sliders = document.querySelectorAll('.js-slider');
  $sliders.forEach(function ($slider) {
    var $slides = $slider.querySelectorAll('.js-slide');
    var $containersSlides = $slider.querySelectorAll('.js-slides');
    var $dots = $slider.querySelectorAll('.js-slider-dot');
    var $btnPrev = $slider.querySelector('.js-nav-prev');
    var $btnNext = $slider.querySelector('.js-nav-next');
    var $currentActiveDot = $slider.querySelector('.js-slider-dot.active');
    var $newActiveDot;
    var slideWidth;

    var sliderTransform = function sliderTransform($activeDot) {
      $containersSlides.forEach(function ($containerSlides) {
        var indexActiveDot = Number($activeDot.dataset.index);

        if (indexActiveDot !== 1) {
          if (Number($containerSlides.dataset.fluid) === 1) {
            var changeSlide = $containerSlides.clientWidth * (indexActiveDot - 1);
            $containerSlides.style.transform = "translateX(-".concat(changeSlide, "px)");
          } else {
            var containerCoordinates = $containerSlides.getBoundingClientRect();
            var containerLeftCoordinate = containerCoordinates.x;
            var nextSlideCoordinates = $slides[indexActiveDot - 1].getBoundingClientRect();
            var nextSlideLeftCoordinate = nextSlideCoordinates.x;
            $containerSlides.style.transform = "translateX(-".concat(nextSlideLeftCoordinate - containerLeftCoordinate, "px)");
          }
        } else {
          $containerSlides.style.transform = 'translateX(0px)';
        }
      });
    };

    var setActiveDot = function setActiveDot($dot) {
      $dots.forEach(function ($dot) {
        $dot.classList.remove('active');
      });
      $dot.classList.add('active');
      $currentActiveDot = $dot;
      sliderTransform($currentActiveDot);
    };

    var setActiveDotByIndex = function setActiveDotByIndex(index) {
      $newActiveDot = $slider.querySelector(".js-slider-dot[data-index=\"".concat(index, "\"]"));
      setActiveDot($newActiveDot);
    };

    var getActiveDotIndex = function getActiveDotIndex() {
      return Number($currentActiveDot.dataset.index);
    };

    $btnPrev.onclick = function () {
      var currentActiveDotIndex = getActiveDotIndex();

      if (currentActiveDotIndex === 1) {
        currentActiveDotIndex = $dots.length;
      } else {
        currentActiveDotIndex -= 1;
      }

      setActiveDotByIndex(currentActiveDotIndex);
    };

    $btnNext.onclick = function () {
      var currentActiveDotIndex = getActiveDotIndex();

      if (currentActiveDotIndex === $dots.length) {
        currentActiveDotIndex = 1;
      } else {
        currentActiveDotIndex += 1;
      }

      setActiveDotByIndex(currentActiveDotIndex);
    };

    $dots.forEach(function ($dot) {
      $dot.onclick = function () {
        setActiveDot($dot);
      };
    });
  });
}); //end