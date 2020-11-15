import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.elem.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
      </div>`;

    let carouselInner = this.elem.querySelector('.carousel__inner');
    
    for (let i = 0; i < slides.length; i++) {
      let slide = document.createElement('div');
      slide.classList.add('carousel__slide');
      slide.dataset.id = slides[i].id;
      slide.innerHTML = `<img src="/assets/images/carousel/${slides[i].image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slides[i].price.toFixed(2)}</span>
        <div class="carousel__title">${slides[i].name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>`;
      carouselInner.append(slide);
    }

    let rightButton = this.elem.querySelector('.carousel__arrow_right');
    let leftButton = this.elem.querySelector('.carousel__arrow_left');
    let position = 0;
    let slidesQuanity = slides.length - 1;
    
    leftButton.style.display = 'none';
    
    rightButton.addEventListener('click', function() {
      let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
      position += slideWidth;
      carouselInner.style.transform = `translateX(-${position}px)`;
      if (position >= (slideWidth * slidesQuanity)) {rightButton.style.display = 'none';} 
      if (position > 0) {leftButton.style.display = '';}
    });
    
    leftButton.addEventListener('click', function() {
      let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
      position -= slideWidth;
      carouselInner.style.transform = `translateX(-${position}px)`;
        
      if (position <= (slideWidth * slidesQuanity - 1)) {rightButton.style.display = '';}
      if (position == 0) {leftButton.style.display = 'none';}
    });

    let button = this.elem.querySelector('.carousel__button');
    button.addEventListener('click', this.onClick);
  }
  
  onClick = () => {
    let slide = document.querySelector('.carousel__slide');
    let customEvent = new CustomEvent('product-add', { detail: slide.dataset.id, bubbles: true});
    this.elem.dispatchEvent(customEvent);
  }
}
