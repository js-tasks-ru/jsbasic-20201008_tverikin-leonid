export default class StepSlider {
  constructor({ steps, value = 0 }) {
   
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    let initialSliderPosition = 100 / (steps - 1) * (value + 1); 
    this.elem.innerHTML = `
    <div class="slider__thumb" style="left: ${initialSliderPosition}%;">
      <span class="slider__value">${value + 1}</span>
       </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: ${initialSliderPosition}%;"></div>
        <!--Шаги слайдера-->
        <div class="slider__steps">
        </div>
    </div>`;
    
    let sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      let span = document.createElement('span');
      sliderSteps.append(span);
    }
    sliderSteps.children[value].classList.add('slider__step-active');

    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');

    this.elem.addEventListener('click', (event) => {

      let pointerPosition = event.clientX - this.elem.getBoundingClientRect().left;
      let pointerOverPosition = pointerPosition / this.elem.offsetWidth;
      let closestPosition = pointerOverPosition * (steps - 1);
      let sliderPosition = Math.round(closestPosition);
      let sliderPositionPerc = sliderPosition / (steps - 1) * 100;
  
      let sliderValue = this.elem.querySelector('.slider__value');
      sliderValue.innerHTML = sliderPosition;
      
      let activeStep = sliderSteps.querySelector('.slider__step-active');
      if (activeStep) {
        activeStep.classList.remove('slider__step-active');
        sliderSteps.children[sliderPosition].classList.add('slider__step-active');
      } else {sliderSteps.children[sliderPosition].classList.add('slider__step-active');}

      
      sliderThumb.style.left = `${sliderPositionPerc}%`; 
      sliderProgress.style.width = `${sliderPositionPerc}%`;

      let sliderChange = new CustomEvent ('slider-change', {  
        detail: sliderPosition, 
        bubbles: true 
      });

      this.elem.dispatchEvent(sliderChange);
    }); 
    
    sliderThumb.onpointerdown = (event) => { 
      
      event.preventDefault();
      this.elem.classList.add('slider_dragging'); 

      let onpoinetrmove = (event) => {
        let pointerPosition = event.clientX - this.elem.getBoundingClientRect().left;
        let pointerOverPosition = pointerPosition / this.elem.offsetWidth;

        if (pointerOverPosition < 0) {
          pointerOverPosition = 0;
        } 
      
        if (pointerOverPosition > 1) {
          pointerOverPosition = 1;
        }

        let sliderPositionPerc = pointerOverPosition * 100;

        let closestPosition = pointerOverPosition * (steps - 1);
        let sliderPosition = Math.round(closestPosition);
      
        let sliderValue = this.elem.querySelector('.slider__value');
        sliderValue.innerHTML = sliderPosition;

        sliderThumb.style.left = `${sliderPositionPerc}%`; 
        sliderProgress.style.width = `${sliderPositionPerc}%`;
      };

      let onpointerup = (event) => {
        document.removeEventListener('pointerup', onpointerup);
        document.removeEventListener('pointermove', onpoinetrmove);
        this.elem.classList.remove('slider_dragging'); 

        let pointerPosition = event.clientX - this.elem.getBoundingClientRect().left;
        let pointerOverPosition = pointerPosition / this.elem.offsetWidth;

        if (pointerOverPosition < 0) {
          pointerOverPosition = 0;
        } 
      
        if (pointerOverPosition > 1) {
          pointerOverPosition = 1;
        }

        let closestPosition = pointerOverPosition * (steps - 1);
        let sliderPosition = Math.round(closestPosition);

        let sliderChange = new CustomEvent ('slider-change', {  
          detail: sliderPosition, 
          bubbles: true 
        });
  
        this.elem.dispatchEvent(sliderChange);
      };

      document.addEventListener('pointermove', onpoinetrmove);
      document.addEventListener('pointerup', onpointerup);

      
    }; 

  }
}
