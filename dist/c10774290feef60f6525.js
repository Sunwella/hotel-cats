import './styles/index.less'; //реализация методов сдвига слайдов, добавления/удаления класса для точек навигации

document.addEventListener('DOMContentLoaded', function () {
  var sliders = document.querySelectorAll('.js-slider');
  sliders.forEach(function (slider) {
    var slides = slider.querySelectorAll('.js-slide');
    var dots = slider.querySelectorAll('.js-dot');
    var btnPrev = slider.querySelector('.js-nav-prev');
    var btnNext = slider.querySelector('.js-nav-next');

    var _loop = function _loop(i) {
      dots[i].click = function () {
        console.log(dots[i]);
      };
    };

    for (var i = 0; i < dots.length; i++) {
      _loop(i);
    }
  });
}); //end