import './styles/index.less'; //реализация методов добавления/удаления класса для точек навигации по слайдам в блоке "номера"

var widthSlide = 1104;

function activeFirstSlideNum() {
  first.classList.add(active);
  second.classList.remote(active);
  third.classList.remote(active);
  srollingNumbers.style.transform = 'translateX(0px)';
}

function activeSecondSlideNum() {
  first.classList.remote(active);
  second.classList.add(active);
  third.classList.remote(active);
  srollingNumbers.style.transform = "translateX(".concat(widthSlide, "px)");
}

function activeThirdSlideNum() {
  first.classList.remote(active);
  second.classList.remote(active);
  third.classList.add(active);
  srollingNumbers.style.transform = "translateX(".concat(widthSlide * 2, "px)");
} //end